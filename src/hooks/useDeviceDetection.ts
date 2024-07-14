import { useCallback, useEffect, useState } from 'react'

const eventListerOptions = { passive: true }

/**
 * Custom React hook for detecting the device based on window size.
 *
 * @return {Object} An object containing the following properties:
 *   - isMobile: A boolean indicating whether the window size is less than 800 pixels.
 *   - isDesktop: A boolean indicating whether the window size is not less than 800 pixels.
 */
export const useDeviceDetection = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  const setSize = useCallback(() => {
    setWindowSize({ width: window.innerWidth || 0, height: window.innerHeight || 0 })
  }, [])

  window.addEventListener('resize', setSize, eventListerOptions)
  window.addEventListener('orientationchange', setSize, eventListerOptions)
  useEffect(setSize, [setSize])

  const isMobile = windowSize.width < 800
  const isDesktop = !isMobile
  return  { isMobile, isDesktop }
}
