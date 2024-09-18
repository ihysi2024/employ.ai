'use client';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';

export default function LandingPage() {
  const router = useRouter(); // Use the useRouter hook

  return (
    <div className="bg-white min-h-screen flex">
      <div className=" flex flex-col justify-center p-16">
        <h1 className="text-6xl font-bold text-black mb-4">Welcome to Employ.ai</h1>
        <p className="text-xl text-gray-500 mb-8">
          The platform designed to find jobs right for <b>you</b>
        </p>
        <div className="flex space-x-4">
          <button
            className="bg-[#93c7c3] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#67cec3] transition"
            onClick={() => router.push('/sign-in')} // Navigate to sign-in page
          >
            Login
          </button>
          <button
            className="bg-white text-gray-600 font-semibold py-3 px-6 rounded-md border border-[#93c7c3] hover:bg-gray-100 transition"
            onClick={() => router.push('/sign-up')} // Navigate to sign-up page
          >
            Register
          </button>
        </div>
      </div>

      {/* Right side with half circle */}
      <Box
        sx={{
          width: '100vw', // Full width of the right section
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'flex-end', // Aligns the circle to the right
        }}
      >
        <Box
          sx={{
            width: '200%', // Increase the width of the circle
            height: '200%', // Keep the height the same
            borderRadius: '50%',
            backgroundColor: '#eeeeee',
            position: 'absolute',
            right: 0, // Position at the right
            top: -380,
            transform: 'scale(3)', // Scale the circle to make it large
            transform: 'translateX(50%)', // Shift to the left to show the left hemisphere
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            right: '50%', // Center the GIF horizontally in the right section
            top: '50%', // Center the GIF vertically
            transform: 'translate(50%, -50%)', // Adjust for center alignment
            zIndex: 1, // Ensure the GIF is above the circle
          }}
        >
          <img src="/jobsearchgif.gif" alt="Job Search GIF" style={{ width: '700px', height: '400px' }} />
        </Box>
      </Box>
    </div>
  );
}
