'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StartPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/opportunities');
    }, 2500); // 2.5 seconds delay

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center">
      <div className="animate-pulse">
        <svg
          className="h-24 w-24 text-primary mb-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M15.5 15.5C15.5 15.5 14.5 14.5 12 14.5C9.5 14.5 8.5 15.5 8.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M8.5 8.5C8.5 8.5 9.5 9.5 12 9.5C14.5 9.5 15.5 8.5 15.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M8.5 8.5V15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M15.5 8.5V15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-primary">CampusSphere</h1>
      <p className="mt-2 text-lg text-muted-foreground">Verified Student Opportunities.</p>
    </div>
  );
}
