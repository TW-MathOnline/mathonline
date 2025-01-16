"use client";
import { useState } from "react";
import styles from "./fileUpload.module.css";

export function FileUpload(): JSX.Element {
  const [latexFile, setLatexFile] = useState<File | null>(null);
  const [Assets, setAssets] = useState<File[]>([]);

  const handleLatexFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    setLatexFile(file);
  };

  const handleAssetsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setAssets(files);
  };

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const latexfile = latexFile;
    const assets = Assets;
    const semester = formData.get("semester") as string;
    const verband = formData.get("verband") as string;
    const lehrveranstaltung = formData.get("lehrveranstaltung") as string;

    const x = {
      latexfile,
      assets,
      semester,
      verband,
      lehrveranstaltung,
    };

    console.log("Uploaded files and selections:", x);
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const file = droppedFiles[0];
      if (file && file.name.endsWith(".tex")) {
        setLatexFile(file);
      }

      const files = Array.from(droppedFiles).filter((file) =>
        file.name.match(/\.(pdf|jpg|jpeg|png|gif)$/i)
      );
      setAssets(files);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleUpload}>
      <h1 className={styles.h1}>Datei Upload</h1>

      {/* Dropdown container */}
      <div className={styles.dropdownContainer}>
        {/* Semester Dropdown */}
        <div className={styles.dropdown}>
          <label htmlFor="semester">Semester:</label>
          <select name="semester" id="semester">
            <option value="Sem1">Semester 1</option>
            <option value="Sem2">Semester 2</option>
            <option value="Sem3">Semester 3</option>
          </select>
        </div>

        {/* Verband Dropdown */}
        <div className={styles.dropdown}>
          <label htmlFor="verband">Verband:</label>
          <select name="verband" id="verband">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        {/* Lehrveranstaltung Dropdown */}
        <div className={styles.dropdown}>
          <label htmlFor="lehrveranstaltung">Lehrveranstaltung:</label>
          <select name="lehrveranstaltung" id="lehrveranstaltung">
            <option value="MACS1">MACS1</option>
            <option value="MACS2">MACS2</option>
            <option value="Andere">Andere</option>
          </select>
        </div>
      </div>

      {/* File Upload Container */}
      <div className={styles.uploadContainer}>
        {/* LaTeX file upload field */}
        <div
          className={styles.uploadField}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <label htmlFor="latex-upload">Upload a LaTeX file:</label>
          <input
            type="file"
            id="latex-upload"
            accept=".tex"
            onChange={handleLatexFileChange}
          />
          {latexFile && <p>Selected file: {latexFile.name}</p>}
        </div>

        {/* assets upload field */}
        <div
          className={styles.uploadField}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <label htmlFor="asset-upload">Upload PDF or Image files:</label>
          <input
            type="file"
            id="asset-upload"
            accept=".pdf, .jpg, .jpeg, .png, .gif"
            multiple
            onChange={handleAssetsChange}
          />
          {Assets.length > 0 && (
            <p>Selected files: {Assets.map((file) => file.name).join(", ")}</p>
          )}
        </div>
      </div>

      <br />
      <button type="submit" className={styles.button}>
        Upload
      </button>
    </form>
  );
}
