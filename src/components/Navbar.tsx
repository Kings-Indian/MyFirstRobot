'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface DropdownProps {
  title: string;
  items: string[];
}

const Dropdown = ({ title, items }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        {title}
        <svg
          className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {items.map((item) => (
              <Link
                key={item}
                href={`/${title.toLowerCase()}/${item.toLowerCase().replace(' ', '-')}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo placeholder */}
            <div className="flex-shrink-0 flex items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500">Logo</span>
              </div>
            </div>

            {/* Navigation items */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Dropdown
                title="My First Robot"
                items={['Demo', 'Assembly', 'Modules']}
              />
              <div className="border-l border-gray-200 h-6 my-auto mx-2" />
              <Dropdown
                title="Community Projects"
                items={['Code', 'Models']}
              />
              <div className="border-l border-gray-200 h-6 my-auto mx-2" />
              <Link
                href="/about"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                About
              </Link>
            </div>
          </div>

          {/* Sign in button */}
          <div className="flex items-center">
            <Link
              href="/signin"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 