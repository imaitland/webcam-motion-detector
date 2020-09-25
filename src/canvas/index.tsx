import React, { CanvasHTMLAttributes, useEffect, useRef } from 'react'

type PropsType = CanvasHTMLAttributes<HTMLCanvasElement> & {
  video: HTMLVideoElement | null
}

export default function ({video, ...props }: PropsType) {
  const refCanvas = useRef<HTMLCanvasElement>(null)
  const vid = 

  useEffect(() => {
    const canvas = refCanvas.current
    if (!canvas) return
    const interval = setInterval(() => {
      console.log('INTERVAL')
      try {
        const context = canvas.getContext('2d')
        console.log(video)
        if (context && video) {
          console.log('DRAWING')
          context.drawImage(video, 0, 0, 640, 480)
        }
      } catch (error) {
        console.log('[ ERROR ]',error)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [video])

  return <canvas ref={refCanvas} {...props} />
}
