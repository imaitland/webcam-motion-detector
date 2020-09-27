import React, { useEffect, useRef } from 'react'

type TArgs = {
  video: HTMLVideoElement | null,
  enableDiff: boolean,
  mediaTrackSettings : MediaTrackSettings | undefined
  width: number
}
const motion_threshold = 500
const sample_size = 100

const sumRgb = (data: ImageData, w: number, h: number) => {
  const rgbData = data.data
  let sum = 0
  // loop through rows and columns
  for (var y = 0; y < h; y+= sample_size) {
    for (var x = 0; x < w; x+= sample_size) {
      // the data array is a continuous array of red, blue, green 
      // and alpha values, so each pixel takes up four values 
      // in the array
      var pos = (x + y * w) * 4;
      sum = sum+rgbData[pos]+rgbData[pos+1]+rgbData[pos+2]
    }
  }
  return sum
  }

export default function ({video, enableDiff, mediaTrackSettings, width} : TArgs) {
  const refCanvas = useRef<HTMLCanvasElement>(null)
  const height = mediaTrackSettings && mediaTrackSettings.aspectRatio ? width / mediaTrackSettings.aspectRatio :
  340

  useEffect(() => {
    const canvas = refCanvas.current
    let prevDiff = enableDiff
    let prevSum = 0

    if (!canvas) return

    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')

    if (context && video) {
      const interval = setInterval(() => {
          // draw the image in the current canvas context.
          context.drawImage(video, 0, 0, width,
          height) 
          if(enableDiff) {
            if (prevDiff === false) {
              // because prevDiff is false, we know the current draw is a
              // difference composition, we can therefore do motion detection
              // on it.
              const imageData = context.getImageData(0,0,width, height);
              const sum = sumRgb(imageData, width, height)
              const diff = sum - prevSum
              prevSum = sum
              if (Math.abs(diff) > motion_threshold){
                console.log('[ INFO ] zenomorph detected.')
              }
            }
            // Flip-flop the canvas composition to stop it from diffing on a
            // difference composition, which creates a diff echo chamber/
            // reverb.
            context.globalCompositeOperation = prevDiff ? 'difference' :
            'source-over';
            prevDiff = !prevDiff
          }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [video, height, mediaTrackSettings, width, enableDiff])

  if (!video) {
    return null
  }

  return <canvas className="farts" ref={refCanvas} />
}

