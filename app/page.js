import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './landing/page'; // Update with correct path
import SignUpPage from './sign-up/page'; // Placeholder for your actual sign-up page component
import SignInPage from './sign-in/page';

import Image from "next/image";

export default function Home() {
  return (
    <LandingPage />
  );
}
