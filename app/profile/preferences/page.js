"use client"; // Ensure the page is client-side
import React, { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import '../animations.css'; // Import the animation styles
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'; // Adjust according to the arrow style you want
import { useSearchParams } from 'next/navigation'

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
  const [location, setLocation] = useState("")
  const [salary, setSalary] = useState("");
  const searchParams = useSearchParams()
  const jobTitles = searchParams.get('positions').split(",")
  

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
          Now add some preferences (optional)
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
          <AnswerBox
                Question="What is your preferred location? "
                Answer={location}
                setAnswer={setLocation}
            />
            <AnswerBox
                Question="What is the minimum annual salary you would prefer? "
                Answer={salary}
                setAnswer={setSalary}
            />
          <Link
              href={{
                  pathname: '/job-listing',
                  query: { positions: jobTitles, loc: location, sal: salary },
              }}
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

