import React, { useEffect, useState, useRef } from "react";

function WeekTen() {
  const [mosaicSize, setMosaicSize] = useState("1200x1200px");
  const [images, setImages] = useState([]);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (images.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const [canvasWidth, canvasHeight] = mosaicSize
        .split("x")
        .map((dim) => parseInt(dim, 10));
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Die Größe für einzelne Kacheln basierend auf der Gesamtanzahl der Bilder berechnen
      const tileWidth = canvasWidth / Math.ceil(Math.sqrt(images.length));
      const tileHeight =
        canvasHeight /
        Math.ceil(images.length / Math.ceil(Math.sqrt(images.length)));

      images.forEach((file, index) => {
        const img = new Image();
        img.onload = () => {
          // Berechnung, um das Bild proportional zu skalieren und es in der Kachel zu zentrieren
          const scale = Math.max(
            tileWidth / img.width,
            tileHeight / img.height
          );
          const scaledWidth = img.width * scale;
          const scaledHeight = img.height * scale;

          // Startpunkt des Bildausschnitts
          const sx =
            scaledWidth - tileWidth > 0
              ? (img.width - tileWidth / scale) / 2
              : 0;
          const sy =
            scaledHeight - tileHeight > 0
              ? (img.height - tileHeight / scale) / 2
              : 0;

          // Berechnung der x und y Position für die Kachel
          const x = (index % Math.ceil(Math.sqrt(images.length))) * tileWidth;
          const y =
            Math.floor(index / Math.ceil(Math.sqrt(images.length))) *
            tileHeight;

          // Zeichnen des Bildes im Canvas an der berechneten Position
          ctx.drawImage(
            img,
            sx,
            sy,
            tileWidth / scale,
            tileHeight / scale,
            x,
            y,
            tileWidth,
            tileHeight
          );
        };

        // Object URL erstellen und bereinigen
        img.src = URL.createObjectURL(file);
        img.addEventListener("load", () => {
          URL.revokeObjectURL(img.src); // Speicher freigeben
        });
      });
    }
  }, [images, mosaicSize]);

  //Logik um aus den ausgewählten Bildern ein Mosaik in der gewünschten Größe zu erstellen
  const downloadMosaic = (e) => {
    e.preventDefault();
    // Überprüfen Sie, ob der Canvas vorhanden ist
    if (canvasRef.current) {
      // Erstellen Sie eine Data URL für das Canvas
      const imageDataURL = canvasRef.current.toDataURL("image/jpeg", 1.0);

      // Erstellen Sie ein <a> Element für den Download
      const downloadLink = document.createElement("a");
      downloadLink.href = imageDataURL;
      downloadLink.download = "mosaic.jpg"; // Der Dateiname für das heruntergeladene Bild

      // Dieser Teil löst den Download aus
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="weekten_outer_container">
      <h1>Easy Mosaic Generator</h1>
      <div className="weekten_inner_container">
        <form className="weekten_input" type="submit">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(Array.from(e.target.files))}
            style={{ display: "none" }}
            ref={fileInputRef}
            /* bei onChange wird eine kurzfristige URL erstellt, die man benötigt um die hochgeladenen Bilder auch anzuzeigen */
            /* Datentyp: jpg/png/apple format, mehrere Bilder (min. 10) sollen ausgewählt werden od. ein ganzer Ordner */
          ></input>

          <button type="button" onClick={handleUploadClick}>
            Upload Images
          </button>
          <br />
          <label>
            Choose size
            <select
              className="choose_size"
              name="mosaicSize"
              id="mosaic_size"
              onChange={(e) => setMosaicSize(e.target.value)}
            >
              <option value="1200x1200px">Square 1200 x 1200 px</option>
              <option value="1080x1920px">Story 1080 x 1920 px</option>
            </select>
          </label>

          {/* bei Button click muss die Generierungslogik stattfinden,
            Wie können die Bilder angeordnet werden, damit sie ein Quadrat im Format 1200x1200px (Option 1) ergeben?
            1. Überprüfung der Bildgrößen und evtl. Verkleinerung
            2.  */}
          <button type="button" onClick={downloadMosaic}>
            Download Mosaic
          </button>
        </form>

        <div className="weekten_mosaic_container">
          <h1>Result</h1>
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  );
}

export default WeekTen;
