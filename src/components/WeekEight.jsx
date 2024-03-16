import React, { useEffect, useState, useRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs-backend-webgl";

function WeekEight() {
  const [uploadURL, setUploadURL] = useState("");
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState("");
  const [imageClassification, setImageClassification] = useState([]);

  const imageRef = useRef();
  const textInputRef = useRef();
  const fileInputRef = useRef();

  const loadModel = async () => {
    setIsModelLoading(false);
    try {
      const model = await mobilenet.load();
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.error("Loading model failed", error);
      setIsModelLoading(false);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  const uploadImage = (e) => {
    const { files } = e.target;
    console.log(files);
    /* console.log(e.target.files[0].name); */
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setUploadURL(url);
    } else {
      setUploadURL("");
    }
  };

  const identifyImage = async () => {
    textInputRef.current.value = "";
    const results = await model.classify(imageRef.current);
    setImageClassification(results);
    /* console.log(results); */
  };

  const handleOnChange = (e) => {
    setUploadURL(e.target.value);
    setImageClassification([]);
  };

  const triggerUpload = () => {
    fileInputRef.current.click();
    setUploadURL("");
  };

  if (isModelLoading) {
    return <h2>loading</h2>;
  }

  console.log(imageClassification);

  return (
    <div className="weekeight_outer_container">
      <h1>Easy Image Detector</h1>
      <div className="weekeight_inner_container">
        <div className="weekeight_upload_container">
          <input
            type="file"
            className="uploadInput"
            accept="image/*"
            capture="camera"
            onChange={uploadImage}
            ref={fileInputRef}
          />
          <button type="submit" onClick={triggerUpload}>
            Upload image
          </button>
          <span>OR</span>
          <input
            type="text"
            placeholder="Enter image URL"
            ref={textInputRef}
            onChange={handleOnChange}
          ></input>
        </div>
        <div className="weekeight_upload_preview">
          {uploadURL && (
            <img
              src={uploadURL}
              style={{ maxWidth: "400px", maxHeight: "400px" }}
              alt="Upload Preview"
              crossOrigin="anonymous"
              ref={imageRef}
            />
          )}
          {imageClassification.length > 0 && (
            <div className="identification_outer_container">
              {imageClassification.map((item, index) => (
                <div className="identification_inner_container" key={index}>
                  <h2>
                    Identification {index + 1}: {item.className}
                  </h2>
                  <p>Probability: {item.probability.toFixed(2) * 100} %</p>
                </div>
              ))}
            </div>
          )}
          {uploadURL && <button onClick={identifyImage}>Identify Image</button>}
        </div>
      </div>
    </div>
  );
}

export default WeekEight;
