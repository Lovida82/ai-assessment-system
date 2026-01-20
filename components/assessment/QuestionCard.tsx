'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Question, CATEGORY_INFO } from '@/lib/types/assessment';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: string;
  onSubmit: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; badge: string }> = {
  prompt: { bg: 'bg-[#0f4c81]/5', text: 'text-[#0f4c81]', badge: 'bg-[#0f4c81]' },
  data: { bg: 'bg-emerald-50', text: 'text-emerald-700', badge: 'bg-emerald-500' },
  workflow: { bg: 'bg-amber-50', text: 'text-amber-700', badge: 'bg-amber-500' },
  ethics: { bg: 'bg-purple-50', text: 'text-purple-700', badge: 'bg-purple-500' }
};

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer: initialAnswer,
  onSubmit,
  onNext,
  onPrevious,
  isFirst,
  isLast
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>(initialAnswer || '');

  useEffect(() => {
    setSelectedAnswer(initialAnswer || '');
  }, [question.id, initialAnswer]);

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    onSubmit(selectedAnswer);
    if (!isLast) {
      onNext();
    }
  };

  const categoryInfo = CATEGORY_INFO[question.category];
  const colors = CATEGORY_COLORS[question.category];

  return (
    <Card className="max-w-3xl mx-auto shadow-xl border-0 overflow-hidden">
      {/* 헤더 */}
      <CardHeader className={`${colors.bg} border-b border-slate-100 py-4`}>
        <div className="flex items-center justify-between">
          <Badge className={`${colors.badge} text-white px-3 py-1`}>
            {categoryInfo.name}
          </Badge>
          <span className="text-sm font-medium text-slate-500">
            {questionNumber} / {totalQuestions}
          </span>
        </div>
      </CardHeader>

      {/* 문제 */}
      <CardContent className="p-6 bg-white">
        <h2 className="text-xl font-semibold text-slate-800 leading-relaxed mb-6">
          {question.question_text}
        </h2>

        {/* 선택지 */}
        <RadioGroup
          value={selectedAnswer}
          onValueChange={setSelectedAnswer}
          className="space-y-3"
        >
          {question.options.map((option) => (
            <div
              key={option.id}
              onClick={() => setSelectedAnswer(option.id)}
              className={`group relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${selectedAnswer === option.id
                  ? 'border-[#0f4c81] bg-[#0f4c81]/5'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
            >
              <RadioGroupItem
                value={option.id}
                id={`option-${option.id}`}
                className="sr-only"
              />
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 transition-colors font-semibold
                ${selectedAnswer === option.id
                  ? 'bg-[#0f4c81] text-white'
                  : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                }`}
              >
                {option.id}
              </div>
              <Label
                htmlFor={`option-${option.id}`}
                className={`flex-1 cursor-pointer text-base leading-relaxed
                  ${selectedAnswer === option.id ? 'text-slate-900 font-medium' : 'text-slate-700'}`}
              >
                {option.text}
              </Label>
              {selectedAnswer === option.id && (
                <div className="w-6 h-6 bg-[#0f4c81] rounded-full flex items-center justify-center ml-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </RadioGroup>
      </CardContent>

      {/* 푸터 */}
      <CardFooter className="flex justify-between p-4 bg-slate-50 border-t border-slate-100">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isFirst}
          className="border-slate-200 text-slate-600 hover:bg-white"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          이전
        </Button>

        {isLast ? (
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            평가 완료
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="bg-[#0f4c81] hover:bg-[#0a3255] text-white"
          >
            다음
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
