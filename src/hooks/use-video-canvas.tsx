import React, { useEffect, useRef } from 'react'

type TArgs = {
  video: HTMLVideoElement | null,
  enableDiff: boolean,
  mediaTrackSettings : MediaTrackSettings | undefined
  width: number
}

export default function ({video, enableDiff, mediaTrackSettings, width} : TArgs) {
  const refCanvas = useRef<HTMLCanvasElement>(null)
  const height = mediaTrackSettings && mediaTrackSettings.aspectRatio ? width / mediaTrackSettings.aspectRatio :
  340

  useEffect(() => {
    const canvas = refCanvas.current
    if (!canvas) return
    const interval = setInterval(() => {
      try {
        canvas.width = width
        canvas.height = height
        const context = canvas.getContext('2d')
        if (context && video && mediaTrackSettings) {
          context.drawImage(video, 0, 0, width,
          height) 
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

  return <canvas className="farts" ref={refCanvas} />
}

