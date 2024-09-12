"use client"
import React, { useState, useEffect } from 'react';

export default function UploadPDF() {
  const [pdfText, setPdfText] = useState('');
  useEffect(() => {
    fetch('/api/openai')
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const formData = new FormData();
      formData.append('pdf', file);
  
      try {
        const response = await fetch('/api/openai', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
          setPdfText(data.text);
        } else {
          console.error('Failed to upload and parse PDF');
        }
      } catch (error) {
        console.error('Error during upload:', error);
      }
    } else {
      console.error('Please upload a valid PDF file.');
    }
  };

  return (
    <div>
      <h1>Upload a PDF file</h1>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />
      <div>
        <h2>Extracted Text:</h2>
        <pre>{pdfText}</pre>
      </div>
    </div>
  );
}