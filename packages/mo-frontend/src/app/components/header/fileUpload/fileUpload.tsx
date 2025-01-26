"use client";
import { UPLOAD_TOPIC_FILE_MUTATION } from "@/app/client/mutation/upload/uploadTopicFile";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import styles from "./fileUpload.module.css";

export function FileUpload(): JSX.Element {
  const [latexFile, setLatexFile] = useState<File | null>(null);
  const [Assets, setAssets] = useState<File[]>([]);

  const [uploadTopicFile, { error: uploadError }] = useMutation(
    UPLOAD_TOPIC_FILE_MUTATION
  );

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
    const topic = formData.get("topic") as string;

    await uploadTopicFile({
      variables: {
        data: {
          course: topic,
          topic: "UNKNOWN_TOPIC",
          assets: Assets,
          topicFile: latexFile,
        },
      },
    });

    const x = {
      latexfile,
      assets,
      topic,
    };

    console.log("Uploaded files and topic:", x);
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
      <p>{uploadError?.message}</p>

      {/* Dropdown container */}
      <div className={styles.dropdownContainer}>
        {/* topic Dropdown */}
        <div className={styles.dropdown}>
          <label htmlFor="topic">Choose Topic</label>
          <select name="topic" id="topic">
            <option value="graphs">Graphen</option>
            <option value="matrices">Matrizen</option>
            <option value="statistics">Statistik</option>
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
