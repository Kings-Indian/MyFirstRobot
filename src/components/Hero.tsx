'use client';

import Image from 'next/image';
import Link from 'next/link';
import Model3DViewer from './Model3DViewer';
import NewsletterSignup from './NewsletterSignup';

export default function Hero() {
  return (
    <div className="flex flex-col gap-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-[rgb(0,62,65)]">
            Build Your First Robot
          </h1>
          <p className="text-lg text-gray-600">
            Start your robotics journey with our comprehensive guide and interactive 3D model. Learn, build, and program your own robot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#demo"
              className="px-8 py-3 bg-[rgb(0,62,65)] text-white rounded-full text-center hover:bg-[rgb(0,72,75)] transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/signup"
              className="px-8 py-3 border-2 border-[rgb(0,62,65)] text-[rgb(0,62,65)] rounded-full text-center hover:bg-[rgb(0,62,65)] hover:text-white transition-colors"
            >
              Create Account
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-600">
              Stay updated with our latest tutorials and robotics news
            </p>
            <NewsletterSignup />
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <Model3DViewer />
          <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500">Robot preview image will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 