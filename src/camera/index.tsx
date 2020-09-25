import React from "react";
import {TRequestedMedia, useUserMedia} from "../hooks/use-user-media";
import useVideo from '../hooks/use-video';
import useVideoCanvas from '../hooks/use-video-canvas';
import useWindowDimensions from '../hooks/use-window-dimensions';

export type TCameraProps = {}

const CAPTURE_OPTIONS : TRequestedMedia = {
  audio: false,
  video: { facingMode: "environment" }
};

export function Camera() {

  const mediaStream = useUserMedia(CAPTURE_OPTIONS)
  const vid = useVideo(mediaStream)
  const {width} = useWindowDimensions()
  const mediaTrackSettings = mediaStream && mediaStream.getVideoTracks()[0].getSettings()
  const canv = useVideoCanvas({video: vid.ref.current, enableDiff: true,
  mediaTrackSettings: mediaTrackSettings, width: width})

  return (
    <div>
      <div>
        {vid.video}
        {canv}
      </div>
    </div>
  );
}


