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
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    const interval = setInterval(() => {
      try {
        if (context && enableDiff) {
          context.globalCompositeOperation = 'difference';
        }
        if (context && video && mediaTrackSettings) {
          context.drawImage(video, 0, 0, width,
          height) 
        }
      } catch (error) {
        console.log('[ ERROR ]',error)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [video, height, mediaTrackSettings, width, enableDiff])

  if (!video) {
    return null
  }

  return <canvas className="farts" ref={refCanvas} />
}

