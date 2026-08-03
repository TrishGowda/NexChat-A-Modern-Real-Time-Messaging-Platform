import React from 'react';
import SignupForm from '../components/Auth/SignupForm';

export default function Signup() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      <SignupForm />
    </div>
  );
}