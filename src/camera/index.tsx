import React from "react";
import {TRequestedMedia, useUserMedia} from "../hooks/use-user-media";
import useVideo from '../hooks/use-video';
import useVideoCanvas from '../hooks/use-video-canvas';

export type TCameraProps = {}

const CAPTURE_OPTIONS : TRequestedMedia = {
  audio: false,
  video: { facingMode: "environment" }
};

export function Camera() {

  const mediaStream = useUserMedia(CAPTURE_OPTIONS)
  const vid = useVideo(mediaStream)
  const canv = useVideoCanvas(vid.ref.current)

  return (
    <div>
      <div>
        {vid.video}
        {canv}
      </div>
    </div>
  );
}


