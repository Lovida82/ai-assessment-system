'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { CategoryScore, CATEGORY_INFO } from '@/lib/types/assessment';

interface SkillRadarChartProps {
  data: CategoryScore[];
  showLegend?: boolean;
}

export function SkillRadarChart({ data, showLegend = true }: SkillRadarChartProps) {
  const chartData = data.map(item => ({
    subject: CATEGORY_INFO[item.category].name,
    score: item.score,
    fullMark: 100
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
        <PolarGrid gridType="polygon" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fontSize: 12, fill: '#666' }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fontSize: 10 }}
          tickCount={6}
        />
        <Tooltip
          formatter={(value) => [`${value}점`, '점수']}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px'
          }}
        />
        <Radar
          name="내 점수"
          dataKey="score"
          stroke="#6366f1"
          fill="#6366f1"
          fillOpacity={0.5}
          strokeWidth={2}
        />
        {showLegend && <Legend />}
      </RadarChart>
    </ResponsiveContainer>
  );
}
