"use client"; // Ensure the page is client-side
import React, { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

function Box({ Question, Answer, setAnswer }) {
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setAnswer(e.target.value);
  };

  // Auto-resize the textarea to fit content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height based on content
    }
  }, [Answer]);

  return (
    <div className="flex flex-col gap-2 items-center w-full max-w-3xl p-6 bg-white border-2 border-[#bbdddd] rounded-lg shadow-md">
      <p className="mb-4 text-xl font-bold">{Question}</p>
      <textarea
        ref={textareaRef}
        className="w-full p-3 border border-gray-300 rounded-md mb-2 text-lg resize-none"
        placeholder="Enter some text"
        value={Answer}
        onChange={handleInputChange}
        rows={1} // Minimum of 1 row
        style={{ overflow: 'hidden' }} // Hide scrollbars
      />
    </div>
  );
}

export default function ProfilePage() {
  const [location, setLocation] = useState("");
  const [workExperiences, setWorkExperiences] = useState([""]);
  const [salary, setSalary] = useState("");
  const [jobTitles, setJobTitles] = useState("");
  const [generated, setGenerated] = useState(false);

  const handleSave = async () => {
    
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experiences: workExperiences,
        }),
      });

      const data = await response.json();
      console.log('Response from OpenAI:', data.result);
      setGenerated(true);
      setJobTitles(data.result);

    } catch (error) {
      alert('Error: ', error);
      console.error('Error:', error);
    }
  };

  const addWorkExperience = () => {
    if (workExperiences.length < 3) {
      setWorkExperiences([...workExperiences, ""]);
    }
  };

  const updateWorkExperience = (index, value) => {
    const updatedExperiences = [...workExperiences];
    updatedExperiences[index] = value;
    setWorkExperiences(updatedExperiences);
  };

  const handleLinkClick = (event) => {
    if (!jobTitles || jobTitles.length === 0) {
      alert('Please add work experiences before proceeding.');
      event.preventDefault(); // Prevent navigation
      return; // Exit the function
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold p-8">
        Welcome to Your Profile Page!
      </h1>
      <div className="flex flex-col items-center w-full max-w-3xl p-6 bg-white border-2 border-[#bbdddd] rounded-lg shadow-md">
        <p className="mb-4 text-xl font-bold">Add summaries of up to 3 work experiences you've had</p>

        {workExperiences.map((experience, index) => (
          <Box
            key={index}
            Question={`Work Experience ${index + 1}`}
            Answer={experience}
            setAnswer={(value) => updateWorkExperience(index, value)}
          />
        ))}

        <div className='flex flex-row gap-10'>
        {workExperiences.length < 3 && (
          
            <button
              onClick={addWorkExperience}
              className="mt-2 p-2 bg-[#bbdddd] text-black rounded-md border-2 border-[#bbdddd]"
            >
              + Add Work Experience
            </button>)}

            <button
              onClick={handleSave}
              className="mt-2 p-2 bg-[#bbdddd] text-black rounded-md border-2 border-[#bbdddd]"
            >
              Save Experiences
            </button>
          </div>
      </div>

      <Box
        Question="What is your preferred location? (optional) "
        Answer={location}
        setAnswer={setLocation}
      />
      <Box
        Question="What is the minimum annual salary you would prefer? (optional) "
        Answer={salary}
        setAnswer={setSalary}
      />
      <Link
        href={{
          pathname: '/job-listing',
          query: { positions: jobTitles, loc: location, sal: salary },
        }}
        onClick={handleLinkClick} // Add the click handler here
        className="mt-2 p-2 bg-[#bbdddd] text-black rounded-md border-2 border-[#bbdddd] text-center inline-block"
      >
        Save & Return to Jobs
      </Link>
    </div>
  );
}