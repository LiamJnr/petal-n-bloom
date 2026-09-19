/**
 * Real-Time Delivery Cut-Off Countdown Engine
 * Calculates same-day vs. next-day delivery cut-offs and dispatches live tick updates.
 */

const DEFAULT_CUTOFF_HOUR = 14; // 2:00 PM local time
let subscribers = new Set();
let timerInterval = null;

/**
 * Get current delivery status and countdown metrics.
 * @param {number} cutoffHour - Daily cut-off hour in 24h format (default: 14 = 2 PM).
 * @param {Date} [now=new Date()] - Custom date for testing/evaluation.
 * @returns {Object} Delivery state object.
 */
export function getDeliveryCountdownState(cutoffHour = DEFAULT_CUTOFF_HOUR, now = new Date()) {
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentSeconds = now.getSeconds();

  const isSameDayAvailable = currentHour < cutoffHour;

  let hoursRemaining = 0;
  let minutesRemaining = 0;
  let secondsRemaining = 0;

  if (isSameDayAvailable) {
    const cutoffDate = new Date(now);
    cutoffDate.setHours(cutoffHour, 0, 0, 0);

    const diffMs = Math.max(0, cutoffDate.getTime() - now.getTime());
    const totalSeconds = Math.floor(diffMs / 1000);

    hoursRemaining = Math.floor(totalSeconds / 3600);
    minutesRemaining = Math.floor((totalSeconds % 3600) / 60);
    secondsRemaining = totalSeconds % 60;
  }

  // Format single/double digits
  const pad = (n) => String(n).padStart(2, "0");
  const formattedCountdown = isSameDayAvailable
    ? `${hoursRemaining}h ${pad(minutesRemaining)}m ${pad(secondsRemaining)}s`
    : "";

  // Earliest date available string (YYYY-MM-DD)
  const earliestDate = new Date(now);
  if (!isSameDayAvailable) {
    earliestDate.setDate(earliestDate.getDate() + 1);
  }
  const earliestDateStr = earliestDate.toISOString().split("T")[0];

  return {
    isSameDayAvailable,
    cutoffHour,
    hoursRemaining,
    minutesRemaining,
    secondsRemaining,
    formattedCountdown,
    earliestDateStr,
    headline: isSameDayAvailable
      ? "Guaranteed Same-Day Delivery"
      : "Guaranteed Next-Day Delivery",
    subtext: isSameDayAvailable
      ? `Order within <strong class="timer-digits">${formattedCountdown}</strong> for hand-delivery today.`
      : "Daily same-day cut-off passed (2:00 PM). Hand-crafted & delivered tomorrow morning.",
    badgeText: isSameDayAvailable ? "Same-Day Available" : "Next-Day Available",
  };
}

/**
 * Start global ticking timer if not already running.
 */
function ensureTimerRunning() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    const state = getDeliveryCountdownState();
    subscribers.forEach((callback) => {
      try {
        callback(state);
      } catch (err) {
        console.error("Error in delivery timer subscriber:", err);
      }
    });
  }, 1000);
}

/**
 * Subscribe a component callback to receive 1-second interval delivery state updates.
 * @param {Function} callback - Receives current delivery state.
 * @returns {Function} Unsubscribe function to stop listening.
 */
export function subscribeDeliveryTimer(callback) {
  if (typeof callback !== "function") return () => {};

  subscribers.add(callback);
  ensureTimerRunning();

  // Immediately invoke with initial state
  callback(getDeliveryCountdownState());

  return () => {
    subscribers.delete(callback);
    if (subscribers.size === 0 && timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  };
}
