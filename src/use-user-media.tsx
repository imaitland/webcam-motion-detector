import { useState, useEffect } from "react";


type TRequestedMedia = {
  audio: boolean,
  video: {facingMode: "environment"}
}

export function useUserMedia(requestedMedia: TRequestedMedia ) {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    async function enableVideoStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(
          requestedMedia
        );
        setMediaStream(stream);
      } catch (err) {
        // Handle the error
      }
    }

    if (!mediaStream) {
      enableVideoStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
      };
    }
  }, [mediaStream, requestedMedia]);

  return mediaStream;
}

