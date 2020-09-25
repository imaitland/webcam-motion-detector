import React, { VideoHTMLAttributes, useEffect, useRef, forwardRef } from 'react'
import { useVideo } from '../hooks/use-video';
import Canvas from '../canvas';

type PropsType = VideoHTMLAttributes<HTMLVideoElement> & {
  srcObject: MediaStream
}

// https://github.com/facebook/react/issues/11163#issuecomment-628379291

export const Video = ({ srcObject, ...props }: PropsType) => {

  const vid = useVideo(srcObject)

  return (
    <div>
      {vid}
    </div>
  )
}
