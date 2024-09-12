'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const [fileName, setFileName] = useState('');
  const [location, setLocation] = useState(''); // State for location
  const [minSalary, setMinSalary] = useState(''); // State for minimum salary
  const router = useRouter(); // Initialize the router
  const [pdfText, setPdfText] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    
    if (file && file.type === 'application/pdf') {
      setFileName(file.name); // Set the filename
      const formData = new FormData();
      formData.append('pdf', file);
      try {
        const response = await fetch('/api/openai', {
          method: 'POST',
          body: formData,
        });

        console.log(response);
        if (response.ok) {
          const data = await response.json();
          setPdfText(data.text);
          toast.success("PDF uploaded and parsed successfully!");
        } else {
          console.error('Failed to upload and parse PDF');
          toast.error("Failed to upload and parse PDF.");
        }
      } catch (error) {
        console.error('Error during upload:', error);
        toast.error("Error during upload.");
      }
    } else {
      console.error('Please upload a valid PDF file.');
      toast.error("Please upload a valid PDF file.");
    }
  };
  
  const handleFileUpload = () => {    
    if (fileName.length !== 0) {
      // Here, you could save the location and minSalary to Firestore if needed
      toast.success("Resume uploaded successfully!");
      router.push('/job-listing'); // Redirect after successful upload
    } else {
      toast.error("Upload a resume before continuing");
    }
  };

  const handleBack = () => {
    router.push('/job-listing'); // Navigate back to job listing
  };

  return (
    <div className="flex flex-col h-screen items-center justify-start bg-gray-100 p-4">
      <div className="flex items-center p-4 cursor-pointer" onClick={handleBack}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l6-6m-6 6l6 6" />
        </svg>
        <span className="ml-2 text-lg text-gray-600">Back to Job Listing</span>
      </div>
      <h1 className="text-4xl font-bold mb-8">Welcome to Your Profile!</h1>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white w-full h-96 shadow-lg rounded-lg border-2 border-[#bbdddd] flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold mb-2 mt-2 text-center">Step 1: Upload Resume</h2>
          <label
            htmlFor="uploadResume"
            className="cursor-pointer bg-[#bbdddd] text-white font-bold py-2 px-10 w-full rounded mt-4"
          >
            Upload Your Resume
          </label>
          <input
            type="file"
            id="uploadResume"
            className="hidden"
            accept=".pdf" // Only accept PDF files
            onChange={handleFileChange} // Call the handler on file change
          />
          {fileName && <p className="mt-2">Selected File: {fileName}</p>}
        </div>
        <div className="bg-white w-full h-96 shadow-lg rounded-lg border-2 border-[#bbdddd] flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold mb-2 mt-2 text-center">Step 2: Details</h2>
          <div className="mt-4 w-full">
            <label className="block text-gray-600 font-semibold mb-1" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#67cec3]"
              placeholder="Enter your location"
              required
            />
          </div>
          <div className="mt-4 w-full">
            <label className="block text-gray-600 font-semibold mb-1" htmlFor="minSalary">
              Minimum Salary
            </label>
            <input
              type="number"
              id="minSalary"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#67cec3]"
              placeholder="Enter minimum salary"
              required
            />
          </div>
        </div>
        <div className="bg-white w-full h-96 shadow-lg rounded-lg border-2 border-[#bbdddd] flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold mb-2 mt-2 text-center">Step 3: Save</h2>
          <button 
            onClick={handleFileUpload} // Call the save handler
            className="mt-4 bg-[#bbdddd] text-white font-bold py-2 px-10 w-full rounded"
          >
            Save & Return To Your Jobs
          </button>
        </div>
      </div>
    </div>
  );
}
