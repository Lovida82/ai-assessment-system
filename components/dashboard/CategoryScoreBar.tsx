'use client';

import { Progress } from '@/components/ui/progress';
import { CategoryScore, CATEGORY_INFO } from '@/lib/types/assessment';

interface CategoryScoreBarProps {
  categoryScores: CategoryScore[];
}

export function CategoryScoreBar({ categoryScores }: CategoryScoreBarProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4">
      {categoryScores.map((cs) => {
        const categoryInfo = CATEGORY_INFO[cs.category];
        return (
          <div key={cs.category} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{categoryInfo.name}</span>
              <span className="text-muted-foreground">
                {cs.score.toFixed(1)}점 ({cs.correctCount}/{cs.totalCount} 정답)
              </span>
            </div>
            <div className="relative">
              <Progress
                value={cs.score}
                className="h-3"
              />
              <div
                className={`absolute top-0 left-0 h-3 rounded-full transition-all ${getScoreColor(cs.score)}`}
                style={{ width: `${cs.score}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
