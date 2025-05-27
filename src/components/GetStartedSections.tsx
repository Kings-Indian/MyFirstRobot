'use client';

import { useEffect } from 'react';
import Image from 'next/image';

const sections = [
  {
    id: 'demo',
    title: 'Interactive Demo',
    description: 'See your robot in action with our interactive simulation environment.',
    image: 'https://via.placeholder.com/800x600?text=Demo+Section'
  },
  {
    id: 'materials',
    title: 'Required Materials',
    description: 'Complete list of components and tools needed for your build.',
    image: 'https://via.placeholder.com/800x600?text=Materials+Section'
  },
  {
    id: 'assembly',
    title: 'Step-by-Step Assembly',
    description: 'Detailed instructions to build your robot from start to finish.',
    image: 'https://via.placeholder.com/800x600?text=Assembly+Section'
  },
  {
    id: 'modules',
    title: 'Programming Modules',
    description: 'Learn to program and control your robot with our guided tutorials.',
    image: 'https://via.placeholder.com/800x600?text=Modules+Section'
  }
];

export default function GetStartedSections() {
  useEffect(() => {
    const handleClick = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href) {
        document.querySelector(href)?.scrollIntoView({
          behavior: 'smooth'
        });
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return (
    <div className="flex flex-col gap-32 py-16">
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex justify-center space-x-8 h-16">
            {sections.map(({ id, title }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="inline-flex items-center h-full px-2 text-sm font-medium text-gray-700 hover:text-[rgb(0,62,65)] hover:border-b-2 hover:border-[rgb(0,62,65)]"
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {sections.map(({ id, title, description, image }, index) => (
        <section
          key={id}
          id={id}
          className="scroll-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
            index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
          }`}>
            <div className={`flex flex-col gap-6 ${
              index % 2 === 1 ? 'lg:col-start-2' : ''
            }`}>
              <h2 className="text-3xl font-bold text-[rgb(0,62,65)]">{title}</h2>
              <p className="text-lg text-gray-600">{description}</p>
              <button className="self-start px-6 py-2 bg-[rgb(0,62,65)] text-white rounded-full hover:bg-[rgb(0,72,75)] transition-colors">
                Learn More
              </button>
            </div>
            <div className={`aspect-4/3 relative rounded-lg overflow-hidden ${
              index % 2 === 1 ? 'lg:col-start-1' : ''
            }`}>
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
} 