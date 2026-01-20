'use client';

import { useState, useEffect } from 'react';

interface TimerProps {
  startTime: Date | null;
  isRunning: boolean;
}

export function Timer({ startTime, isRunning }: TimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isRunning || !startTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(startTime);
      const diff = Math.floor((now.getTime() - start.getTime()) / 1000);
      setElapsed(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <span className="font-mono">{formatTime(elapsed)}</span>
    </div>
  );
}
