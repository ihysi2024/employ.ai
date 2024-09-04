'use client';
import { useState } from 'react';
import { toast } from "react-hot-toast";
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'; // Import this correctly

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth); // Call the hook correctly
  const router = useRouter();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSignup();
    }
  };

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      toast.success("Account successfully created! Please sign in.");
      console.log(user);
      setEmail(''); 
      setPassword('');
      return router.push('/sign-in');
    } catch (error) {
      toast.error("Unable to create account. Check to see if you already have an account, if the email inputted is invalid, or if password is too short.");
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>

        <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#67cec3]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#67cec3]"
              placeholder="Create a password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#93c7c3] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#67cec3] focus:outline-none focus:ring-2 focus:ring-[#67cec3] focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account? <a href="/sign-in" className="text-[#67cec3] hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
