import React, { useEffect, useRef } from 'react'

export default function (video: HTMLVideoElement | null) {
  const refCanvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = refCanvas.current
    if (!canvas) return
    const interval = setInterval(() => {
      try {
        const context = canvas.getContext('2d')
        if (context && video) {
          // access video width and height...
          context.drawImage(video, 0, 0, 640, 480)
        }
      } catch (error) {
        console.log('[ ERROR ]',error)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [video])

  if (!video) {
    return null
  }

  return <canvas  ref={refCanvas} />
}

