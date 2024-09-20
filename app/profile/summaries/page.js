"use client"; // Ensure the page is client-side
import React, { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import '../animations.css'; // Import the animation styles
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'; // Adjust according to the arrow style you want

function AnswerBox({ Question, Answer, setAnswer }) {
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
    <div className="flex flex-col gap-2 items-center w-full max-w-4xl p-6 bg-white border-2 border-[#bbdddd] rounded-lg shadow-md z-10 input-scale-in"  style={{ justifyContent: 'center', minHeight: '200px', marginBottom: '1rem' }}>
      <p className="mb-2 text-lg font-bold">{Question}</p>
      <textarea
        ref={textareaRef}
        className="w-full p-3 border border-gray-300 rounded-md mb-2 text-md resize-none"
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
  const [workExperiences, setWorkExperiences] = useState([""]);
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

  const handleLinkClick = (e) => {
    // Check if jobTitles is empty
    if (!jobTitles || jobTitles.trim() === '') {
      e.preventDefault(); // Prevent navigation
      alert('Please add at least one work experience before proceeding.'); // Show alert
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

  return (
    <div className="bg-white min-h-screen flex flex-row items-center justify-center gap-4">
      {/* Left Text Section with Animation */}
      <Box
        sx={{
          width: '50vw', // 50% of the screen width for the text on the left
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
        <p className="text-5xl p-10 font-bold text-left px-8 text-fade-in-slide">
          Welcome to Your Profile!
        </p>
        <p className="text-2xl font-italics text-left px-8 text-fade-in-slide">
          First, add summaries of up to three work experiences you've had
        </p>
        </div>
        
      </Box>

      {/* Right Circle and Form Section */}
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Background Circle */}
        <Box
          sx={{
            width: '200%',
            height: '200%',
            borderRadius: '50%',
            backgroundColor: '#eeeeee',
            position: 'absolute',
            right: 0,
            top: -450,
            transform: 'scale(3) translateX(50%)',
            zIndex: 0,
          }}
        />

        {/* Form Section Centered Inside Circle */}
        <Box
          sx={{
            zIndex: 1, // Ensure it's on top of the circle
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%', // Make form smaller and centered
            position: 'relative',
          }}
        >
          {workExperiences.map((experience, index) => (
            <AnswerBox
              key={index}
              Question={`Work Experience ${index + 1}`}
              Answer={experience}
              setAnswer={(value) => updateWorkExperience(index, value)}
            />
          ))}

          <div className="flex flex-row gap-10 mt-4">
            {workExperiences.length < 3 && (
              <button
                onClick={addWorkExperience}
                className="p-2 bg-[#bbdddd] text-black rounded-md border-2 border-[#bbdddd]"
              >
                + Add Work Experience
              </button>
            )}

            <button
              onClick={handleSave}
              className="p-2 bg-[#bbdddd] text-black rounded-md border-2 border-[#bbdddd]"
            >
              Save Experiences
            </button>
          </div>
          <Link
              href={{
                  pathname: './preferences',
                  query: { positions: jobTitles },
              }}
              onClick={handleLinkClick} // Add the click handler here
              className="mt-20 p-4 bg-[#bbdddd] text-black rounded-full border-2 border-[#bbdddd] flex items-center justify-center relative"
              style={{
                  width: '60px', // Width for the circular button
                  height: '60px', // Height for the circular button
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
              }}
          >
              <FontAwesomeIcon
                  icon={faArrowRight}
                  style={{
                      color: 'white', // Change arrow color to white
                      fontSize: '2rem', // Scale the arrow size
                  }}
              />
          </Link>
        </Box>
      </Box>
    </div>
  );
}
