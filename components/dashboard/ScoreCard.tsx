'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ScoreCardProps {
  title: string;
  score: number;
  grade?: string;
  description?: string;
  showGrade?: boolean;
}

const GRADE_COLORS: Record<string, string> = {
  'S': 'bg-purple-500',
  'A': 'bg-blue-500',
  'B': 'bg-green-500',
  'C': 'bg-yellow-500',
  'D': 'bg-red-500'
};

const GRADE_DESCRIPTIONS: Record<string, string> = {
  'S': '최우수',
  'A': '우수',
  'B': '양호',
  'C': '보통',
  'D': '노력필요'
};

export function ScoreCard({ title, score, grade, description, showGrade = true }: ScoreCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">{score.toFixed(1)}</div>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {showGrade && grade && (
            <div className="text-right">
              <Badge className={`${GRADE_COLORS[grade]} text-white text-lg px-4 py-2`}>
                {grade}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                {GRADE_DESCRIPTIONS[grade]}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
