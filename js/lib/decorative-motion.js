/**
 * One shared observer gates all nonessential CSS motion. It performs no frame
 * work; CSS remains responsible for the actual transform/opacity animation.
 */
const targets = new Set()
let observer = null

function getObserver() {
  if (observer || !('IntersectionObserver' in window)) return observer
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      entry.target.classList.toggle('is-motion-visible', entry.isIntersecting && !document.hidden)
    }
  }, { threshold: 0.01 })
  return observer
}

function pruneDetachedTargets() {
  for (const target of targets) {
    if (!document.contains(target)) {
      observer?.unobserve(target)
      targets.delete(target)
    }
  }
}

export function observeDecorativeMotion(target) {
  if (!target) return
  pruneDetachedTargets()
  targets.add(target)

  const sharedObserver = getObserver()
  if (!sharedObserver) {
    target.classList.add('is-motion-visible')
    return
  }
  sharedObserver.observe(target)
}

export function initDecorativeMotion() {
  document.querySelectorAll('[data-decorative-motion]').forEach(observeDecorativeMotion)
  document.addEventListener('visibilitychange', () => {
    for (const target of targets) {
      target.classList.toggle('is-motion-visible', !document.hidden && target.getBoundingClientRect().bottom > 0 && target.getBoundingClientRect().top < window.innerHeight)
    }
  })
}
