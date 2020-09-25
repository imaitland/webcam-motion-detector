import { useState, useEffect } from "react";

export type TRequestedMedia = {
  audio: boolean,
  video: {
    facingMode: "environment"
  }
}

export function useUserMedia(requestedMedia: TRequestedMedia){
  const [mediaStream, setMediaStream] = useState<MediaStream>();

  useEffect(() => {
    async function enableVideoStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(
          requestedMedia
        );
        setMediaStream(stream);
      } catch (err) {
        console.log('[ ERROR ]', err)
        return null
      }
    }

    if (!mediaStream) {
      enableVideoStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach((track: MediaStreamTrack)=> {
          track.stop();
        });
      };
    }
  }, [mediaStream, requestedMedia]);
  return mediaStream;
}

