import React, {useEffect, useState} from "react";
import {TRequestedMedia, useUserMedia} from "../hooks/use-user-media";
import { useVideo } from '../hooks/use-video';
import { Video } from "../video";

export type TCameraProps = {}

const CAPTURE_OPTIONS : TRequestedMedia = {
  audio: false,
  video: { facingMode: "environment" }
};

export function Camera() {

  const mediaStream = useUserMedia(CAPTURE_OPTIONS)
  const vid = useVideo(mediaStream)


  if (!mediaStream) {
    return null;
  }


  return (
    <div>
      <div>
        {vid}
      </div>
    </div>
  );
}


