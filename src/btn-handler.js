import { useState, useRef } from "react";


export class Webcam {
  open = (videoRef) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "environment",
          },
        })
        .then((stream) => {
          videoRef.srcObject = stream;
        })
        .catch(() => {
          alert("Can't open Webcam!");
        });
    }
  };

  close = (videoRef) => {
    if (videoRef.srcObject) {
      videoRef.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
      videoRef.srcObject = null;
    } else {
      alert("Please open Webcam first!");
    }
  };
}

const ButtonHandler = ({ cameraRef }) => {
  const [streaming, setStreaming] = useState(null);
  const webcam = new Webcam();

  return (
    <div className="btn-container">
      <button
        onClick={() => {
          if (streaming === null) {
            webcam.open(cameraRef.current);
            cameraRef.current.style.display = "block";
            setStreaming("camera");
          } else if (streaming === "camera") {
            webcam.close(cameraRef.current);
            cameraRef.current.style.display = "none";
            setStreaming(null);
          } else {
            alert(`Can't handle more than 1 stream\nCurrently streaming : ${streaming}`);
          }
        }}
      >
        {streaming === "camera" ? "Close" : "Open"} Webcam
      </button>
    </div>
  );
};

export default ButtonHandler;
