'use client';

import { Progress } from '@/components/ui/progress';

interface AssessmentProgressProps {
  current: number;
  total: number;
  answeredCount: number;
}

export function AssessmentProgress({ current, total, answeredCount }: AssessmentProgressProps) {
  const percentage = (current / total) * 100;
  const answeredPercentage = (answeredCount / total) * 100;

  return (
    <div className="w-full space-y-4">
      {/* 진행률 바 */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>진행률</span>
          <span>{Math.round(answeredPercentage)}% 완료</span>
        </div>
        <Progress value={answeredPercentage} className="h-2" />
      </div>

      {/* 문제 번호 인디케이터 */}
      <div className="flex justify-center gap-1 flex-wrap">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors
              ${i + 1 === current
                ? 'bg-primary'
                : i + 1 < current
                  ? 'bg-primary/50'
                  : 'bg-muted'
              }`}
          />
        ))}
      </div>
    </div>
  );
}
