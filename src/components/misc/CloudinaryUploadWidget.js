import { useEffect } from "react";

const CloudinaryUploadWidget = ({ onVideoUploaded, message }) => {
  useEffect(() => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          onVideoUploaded(result.info.secure_url);
        }
      }
    );

    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }, [onVideoUploaded]);

  return (
    <>
      <button id="upload_widget" className="cloudinary-button mt-4" type="button">
      {message}
      </button>
    </>
  );
};

export default CloudinaryUploadWidget;
