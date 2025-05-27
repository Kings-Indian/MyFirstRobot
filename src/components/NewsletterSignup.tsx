'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-md w-full">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-[rgb(0,62,65)]"
          required
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          className={`px-6 py-2 rounded-full transition-colors ${
            status === 'loading'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[rgb(0,62,65)] hover:bg-[rgb(0,72,75)]'
          } text-white`}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      {status === 'success' && (
        <p className="text-green-600 text-sm">
          {message || 'Thanks for signing up! Please check your email to confirm your subscription.'}
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-sm">
          {message || 'Something went wrong. Please try again later.'}
        </p>
      )}
    </div>
  );
} 