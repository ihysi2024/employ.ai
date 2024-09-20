'use client';
import { useState } from 'react';
import { toast } from "react-hot-toast";
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(email, password); 
      const user = userCredential.user;

      toast.success("Sign in successful!"); // This will now work
      console.log(user);
      setEmail(''); 
      setPassword('');
      return router.push('/profile/summaries');
    } catch (error) {
      toast.error("Sign in failed! Invalid password or username. Try again.");
      console.log(error.message);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSignIn();
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Sign In</h2>

        <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
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

          <div className="mb-6">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#67cec3]"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#93c7c3] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#67cec3] focus:outline-none focus:ring-[#67cec3] focus:ring-opacity-50"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account? <a href="/sign-up" className="text-[#67cec3] hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
