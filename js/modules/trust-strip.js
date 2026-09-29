/**
 * Keeps the decorative marquee out of the compositor when it cannot be seen.
 * This deliberately uses observers rather than a JavaScript animation loop.
 */
export function initTrustStrip() {
  const strip = document.querySelector('.trust-strip')
  if (!strip) return

  let isVisible = false
  const syncMotion = () => {
    strip.classList.toggle('is-motion-active', isVisible && !document.hidden)
  }

  const onVisibilityChange = () => syncMotion()
  document.addEventListener('visibilitychange', onVisibilityChange)

  if (!('IntersectionObserver' in window)) {
    isVisible = true
    syncMotion()
    return
  }

  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0]?.isIntersecting || false
    syncMotion()
  }, { threshold: 0.01 })
  observer.observe(strip)
}
