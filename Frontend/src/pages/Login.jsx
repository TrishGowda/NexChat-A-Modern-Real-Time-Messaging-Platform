import React from 'react';
import LoginForm from '../components/Auth/LoginForm';

export default function Login() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      <LoginForm />
    </div>
  );
}