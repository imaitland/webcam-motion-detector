import React, { useEffect, useRef} from 'react'

export default function (srcObject: MediaStream | undefined) {
  
  const refVideo = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const vid = refVideo.current
    if (!vid) return
    try {
      if(srcObject) {
        vid.srcObject = srcObject
      }
    } catch (error) {
      console.log('[ ERROR ]',error)
      vid.src = window.URL.createObjectURL(srcObject);
    }
  }, [srcObject])

  return ( {
      video: <video width="100%" autoPlay ref={refVideo} />,
      ref: refVideo
    }
  )
}
