import React from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import html2canvas from "html2canvas";

function WeekFour() {
  const [file, setFile] = useState([]);
  const [headlineOne, setHeadlineOne] = useState("");
  const [headlineTwo, setHeadlineTwo] = useState("");
  const [fontSizeValue, setFontSizeValue] = useState("2rem");
  const [fontColorValue, setFontColorValue] = useState("white");

  //upload image & create URL
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(
        acceptedFiles.map((upFile) =>
          Object.assign(upFile, {
            preview: URL.createObjectURL(upFile),
          })
        )
      );
    },
  });
  /* console.log(file);
  console.log(getRootProps());
  console.log(headlineOne);
  console.log(fontSizeValue); */

  //part of UI: text can be manipulated by user: text/color/fontsize
  //part of UI: if image exists, show example head & subline text

  //download image + text in jpg || png || gif
  const downloadImage = (e) => {
    e.preventDefault();
    const element = document.getElementById("memeContainer"); // Stellen Sie sicher, dass der Container eine ID hat
    html2canvas(element, {
      useCORS: true,
      logging: true,
      letterRendering: 1,
      allowTaint: false,
    }).then((canvas) => {
      // create URL out of canvas
      const image = canvas.toDataURL("image/jpeg", 1.0);
      const link = document.createElement("a");
      link.href = image;
      link.download = "meme.jpg";
      link.click();
    });
  };

  return (
    <div className="weekfour_outer_container">
      <h1>Meme Generator</h1>
      <div className="weekfour_inner_container">
        <div className="weekfour_edit_container">
          <form className="weekfour_edit_form">
            <div className="weekfour_edit_element">
              <label>Headline 1</label>
              <input
                type="text"
                name="headlineOne"
                value={headlineOne}
                onChange={(e) => setHeadlineOne(e.target.value)}
              />
            </div>
            <div className="weekfour_edit_element">
              <label>Headline 2</label>
              <input
                type="text"
                name="headlineTwo"
                value={headlineTwo}
                onChange={(e) => setHeadlineTwo(e.target.value)}
              />
            </div>
            <div className="weekfour_edit_element">
              <label>
                Font Size:
                <input
                  type="radio"
                  name="fontSize"
                  value="3rem"
                  checked={fontSizeValue === "3rem"}
                  onChange={(e) => setFontSizeValue(e.target.value)}
                ></input>
                XL
              </label>
              <label>
                <input
                  type="radio"
                  name="fontSize"
                  value="4rem"
                  checked={fontSizeValue === "4rem"}
                  onChange={(e) => setFontSizeValue(e.target.value)}
                />
                XXL
              </label>
            </div>
            <div className="weekfour_edit_element">
              <label>
                Font Color:
                <input
                  type="radio"
                  name="fontColor"
                  value="red"
                  checked={fontColorValue === "red"}
                  onChange={(e) => setFontColorValue(e.target.value)}
                ></input>
                Red
              </label>
              <label>
                <input
                  type="radio"
                  name="fontColor"
                  value="blue"
                  checked={fontColorValue === "blue"}
                  onChange={(e) => setFontColorValue(e.target.value)}
                />
                Blue
              </label>
            </div>

            <button onClick={downloadImage}>Download JPG</button>
          </form>
        </div>
        <div {...getRootProps()} className="weekfour_upload_container_outer">
          <input {...getInputProps()} />
          <div>
            {file.map((upFile) => {
              return (
                <div
                  key={upFile.name}
                  id="memeContainer"
                  className="weekfour_upload_container"
                >
                  <img
                    src={upFile.preview}
                    style={{
                      /* width: "500px", */
                      maxWidth: "900px",
                      maxHeight: "500px",
                      border: "1px solid white",
                      borderRadius: "8px",
                    }}
                    alt="preview"
                  />
                  <div className="weekfour_upload_container_texttop">
                    {!!headlineOne && (
                      <h1
                        style={{
                          fontSize: fontSizeValue,
                          color: fontColorValue,
                        }}
                      >
                        {headlineOne}
                      </h1>
                    )}
                  </div>
                  <div className="weekfour_upload_container_textbottom">
                    {!!headlineTwo && (
                      <h1
                        style={{
                          fontSize: fontSizeValue,
                          color: fontColorValue,
                        }}
                      >
                        {headlineTwo}
                      </h1>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {isDragActive ? (
            <p>Drop the image here..</p>
          ) : (
            <p>Drag & drop image here || click to select image</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeekFour;
