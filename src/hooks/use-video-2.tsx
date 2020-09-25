import React, { VideoHTMLAttributes, useEffect, useRef} from 'react'


export const useVideo2 = (srcObject: MediaStream | undefined): HTMLVideoElement
| null => {
  
  const refVideo = useRef<HTMLVideoElement>(null)
  const vid = refVideo.current

  useEffect(() => {
    if (!vid) return
    try {
      if(srcObject) {
        vid.srcObject = srcObject
      }
    } catch (error) {
      console.log('[ ERROR ]',error)
      vid.src = window.URL.createObjectURL(srcObject);
    }
  }, [srcObject, vid])

  return refVideo.current
}
