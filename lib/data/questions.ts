import { Question } from '@/lib/types/assessment';

// 프롬프트 엔지니어링 문제
const promptQuestions: Question[] = [
  {
    id: 'prompt-1',
    category: 'prompt',
    difficulty: 'easy',
    question_text: 'ChatGPT에게 가장 효과적으로 질문하는 방법은?',
    options: [
      { id: 'A', text: '한 단어로 간단하게 질문한다' },
      { id: 'B', text: '배경 정보와 원하는 결과를 구체적으로 설명한다' },
      { id: 'C', text: '여러 질문을 한 번에 묻는다' },
      { id: 'D', text: '전문 용어를 최대한 많이 사용한다' }
    ],
    correct_answer: 'B',
    explanation: '효과적인 프롬프트는 명확한 컨텍스트와 구체적인 요구사항을 포함해야 합니다.'
  },
  {
    id: 'prompt-2',
    category: 'prompt',
    difficulty: 'easy',
    question_text: 'AI에게 특정 형식의 출력을 요청할 때 가장 효과적인 방법은?',
    options: [
      { id: 'A', text: '원하는 형식의 예시를 직접 보여준다' },
      { id: 'B', text: '형식을 지정하지 않고 AI가 알아서 하게 한다' },
      { id: 'C', text: '여러 형식을 섞어서 요청한다' },
      { id: 'D', text: '출력 형식은 중요하지 않다' }
    ],
    correct_answer: 'A',
    explanation: 'Few-shot learning을 활용하여 예시를 보여주면 AI가 원하는 형식을 정확히 이해할 수 있습니다.'
  },
  {
    id: 'prompt-3',
    category: 'prompt',
    difficulty: 'medium',
    question_text: '프롬프트에서 "역할 부여(Role Prompting)"의 장점은?',
    options: [
      { id: 'A', text: 'AI의 응답 속도가 빨라진다' },
      { id: 'B', text: '특정 관점이나 전문성을 가진 응답을 얻을 수 있다' },
      { id: 'C', text: '토큰 사용량이 줄어든다' },
      { id: 'D', text: '오류가 완전히 사라진다' }
    ],
    correct_answer: 'B',
    explanation: '역할을 부여하면 AI가 해당 전문가의 관점에서 답변하여 더 적절한 응답을 생성합니다.'
  },
  {
    id: 'prompt-4',
    category: 'prompt',
    difficulty: 'medium',
    question_text: 'Chain-of-Thought (CoT) 프롬프팅이란?',
    options: [
      { id: 'A', text: '여러 AI를 연결해서 사용하는 것' },
      { id: 'B', text: 'AI에게 단계별로 생각하도록 유도하는 것' },
      { id: 'C', text: '프롬프트를 여러 번 반복하는 것' },
      { id: 'D', text: '긴 문장을 짧게 나누는 것' }
    ],
    correct_answer: 'B',
    explanation: 'CoT 프롬프팅은 AI가 논리적 추론 과정을 단계별로 보여주도록 하여 복잡한 문제 해결에 효과적입니다.'
  },
  {
    id: 'prompt-5',
    category: 'prompt',
    difficulty: 'medium',
    question_text: '프롬프트에서 "제약 조건"을 명시하는 이유는?',
    options: [
      { id: 'A', text: 'AI가 더 창의적으로 응답하게 하기 위해' },
      { id: 'B', text: '응답의 범위와 형식을 제어하기 위해' },
      { id: 'C', text: '처리 시간을 늘리기 위해' },
      { id: 'D', text: 'AI의 학습 데이터를 변경하기 위해' }
    ],
    correct_answer: 'B',
    explanation: '제약 조건을 명시하면 원하는 범위 내에서 정확한 응답을 얻을 수 있습니다.'
  },
  {
    id: 'prompt-6',
    category: 'prompt',
    difficulty: 'hard',
    question_text: 'AI가 잘못된 정보를 확신있게 말하는 현상을 무엇이라 하나요?',
    options: [
      { id: 'A', text: '오버피팅(Overfitting)' },
      { id: 'B', text: '환각(Hallucination)' },
      { id: 'C', text: '언더피팅(Underfitting)' },
      { id: 'D', text: '드롭아웃(Dropout)' }
    ],
    correct_answer: 'B',
    explanation: 'AI 환각(Hallucination)은 AI가 사실이 아닌 정보를 마치 사실인 것처럼 생성하는 현상입니다.'
  },
  {
    id: 'prompt-7',
    category: 'prompt',
    difficulty: 'hard',
    question_text: '긴 문서를 분석할 때 효과적인 프롬프트 전략은?',
    options: [
      { id: 'A', text: '전체 문서를 한 번에 입력한다' },
      { id: 'B', text: '문서를 청크로 나누어 순차적으로 처리한다' },
      { id: 'C', text: '문서의 첫 부분만 입력한다' },
      { id: 'D', text: '프롬프트 없이 문서만 입력한다' }
    ],
    correct_answer: 'B',
    explanation: '긴 문서는 청크(Chunk)로 나누어 처리하면 토큰 제한을 관리하면서 전체 내용을 분석할 수 있습니다.'
  },
  {
    id: 'prompt-8',
    category: 'prompt',
    difficulty: 'easy',
    question_text: 'Zero-shot Prompting과 Few-shot Prompting의 차이점은?',
    options: [
      { id: 'A', text: 'Zero-shot은 예시 없이, Few-shot은 예시를 포함하여 요청한다' },
      { id: 'B', text: 'Zero-shot이 더 많은 예시를 사용한다' },
      { id: 'C', text: '두 방식은 동일하다' },
      { id: 'D', text: 'Few-shot은 AI를 학습시키는 방법이다' }
    ],
    correct_answer: 'A',
    explanation: 'Zero-shot은 예시 없이 직접 질문하고, Few-shot은 원하는 형식의 예시를 몇 개 제공하여 AI가 패턴을 파악하게 합니다.'
  },
  {
    id: 'prompt-9',
    category: 'prompt',
    difficulty: 'hard',
    question_text: 'AI 응답의 일관성을 높이기 위해 temperature 값을 어떻게 설정해야 하나요?',
    options: [
      { id: 'A', text: '높게 설정한다 (예: 1.0)' },
      { id: 'B', text: '낮게 설정한다 (예: 0.2)' },
      { id: 'C', text: 'temperature는 일관성과 무관하다' },
      { id: 'D', text: '항상 0.5로 고정한다' }
    ],
    correct_answer: 'B',
    explanation: '낮은 temperature 값은 더 결정적이고 일관된 출력을 생성합니다.'
  },
  {
    id: 'prompt-10',
    category: 'prompt',
    difficulty: 'medium',
    question_text: '프롬프트에서 "하지 말아야 할 것"을 명시하는 것이 중요한 이유는?',
    options: [
      { id: 'A', text: 'AI가 더 창의적으로 응답하게 하기 위해' },
      { id: 'B', text: '원하지 않는 응답을 방지하기 위해' },
      { id: 'C', text: '응답 속도를 높이기 위해' },
      { id: 'D', text: '토큰 사용량을 줄이기 위해' }
    ],
    correct_answer: 'B',
    explanation: '부정적 지시(Negative Prompting)를 통해 원하지 않는 내용이 포함되는 것을 방지할 수 있습니다.'
  }
];

// 데이터 분석 & 시각화 문제
const dataQuestions: Question[] = [
  {
    id: 'data-1',
    category: 'data',
    difficulty: 'easy',
    question_text: 'AI를 활용한 데이터 분석의 첫 단계로 가장 적절한 것은?',
    options: [
      { id: 'A', text: '바로 복잡한 분석을 시작한다' },
      { id: 'B', text: '데이터의 구조와 특성을 먼저 파악한다' },
      { id: 'C', text: '시각화부터 시작한다' },
      { id: 'D', text: '결론을 먼저 정한다' }
    ],
    correct_answer: 'B',
    explanation: '데이터 분석의 첫 단계는 EDA(탐색적 데이터 분석)를 통해 데이터의 구조와 특성을 이해하는 것입니다.'
  },
  {
    id: 'data-2',
    category: 'data',
    difficulty: 'easy',
    question_text: '범주형 데이터를 시각화할 때 가장 적합한 차트는?',
    options: [
      { id: 'A', text: '선 그래프 (Line Chart)' },
      { id: 'B', text: '막대 그래프 (Bar Chart)' },
      { id: 'C', text: '산점도 (Scatter Plot)' },
      { id: 'D', text: '영역 그래프 (Area Chart)' }
    ],
    correct_answer: 'B',
    explanation: '막대 그래프는 범주별 값을 비교하는 데 가장 효과적인 시각화 방법입니다.'
  },
  {
    id: 'data-3',
    category: 'data',
    difficulty: 'medium',
    question_text: '시계열 데이터에서 이상치를 탐지하기 위해 AI에게 요청할 때 포함해야 할 정보는?',
    options: [
      { id: 'A', text: '데이터의 시간 단위와 정상 범위' },
      { id: 'B', text: '데이터 수집 장비의 제조사' },
      { id: 'C', text: '데이터베이스 서버 위치' },
      { id: 'D', text: '데이터 파일의 확장자' }
    ],
    correct_answer: 'A',
    explanation: '이상치 탐지에는 시간 단위와 정상으로 간주되는 범위 정보가 필수적입니다.'
  },
  {
    id: 'data-4',
    category: 'data',
    difficulty: 'medium',
    question_text: '피벗 테이블을 AI에게 설명할 때 핵심적으로 전달해야 할 내용은?',
    options: [
      { id: 'A', text: '테이블의 색상과 디자인' },
      { id: 'B', text: '행/열로 사용할 필드와 집계 방식' },
      { id: 'C', text: '원본 데이터의 정렬 순서' },
      { id: 'D', text: '데이터가 저장된 시트 이름' }
    ],
    correct_answer: 'B',
    explanation: '피벗 테이블 생성에는 어떤 필드를 행/열로 사용하고, 어떤 집계 함수를 적용할지가 핵심입니다.'
  },
  {
    id: 'data-5',
    category: 'data',
    difficulty: 'hard',
    question_text: '상관관계와 인과관계의 차이점으로 올바른 것은?',
    options: [
      { id: 'A', text: '같은 의미이다' },
      { id: 'B', text: '상관관계가 있으면 항상 인과관계가 있다' },
      { id: 'C', text: '상관관계는 관련성만 나타내고, 인과관계는 원인-결과를 나타낸다' },
      { id: 'D', text: '인과관계가 더 약한 관계이다' }
    ],
    correct_answer: 'C',
    explanation: '상관관계는 두 변수의 관련성만 나타내며, 인과관계는 한 변수가 다른 변수의 원인임을 의미합니다.'
  },
  {
    id: 'data-6',
    category: 'data',
    difficulty: 'easy',
    question_text: 'Excel이나 스프레드시트 데이터를 AI에게 분석 요청할 때 가장 좋은 방법은?',
    options: [
      { id: 'A', text: '스크린샷을 찍어서 보여준다' },
      { id: 'B', text: 'CSV나 텍스트 형식으로 데이터를 복사하여 붙여넣는다' },
      { id: 'C', text: '파일명만 알려준다' },
      { id: 'D', text: '데이터를 설명하지 않고 분석을 요청한다' }
    ],
    correct_answer: 'B',
    explanation: 'CSV나 텍스트 형식으로 데이터를 제공하면 AI가 정확하게 데이터를 파싱하고 분석할 수 있습니다.'
  },
  {
    id: 'data-7',
    category: 'data',
    difficulty: 'medium',
    question_text: '대시보드 설계 시 가장 중요하게 고려해야 할 요소는?',
    options: [
      { id: 'A', text: '가능한 많은 차트를 배치한다' },
      { id: 'B', text: '핵심 KPI와 사용자의 의사결정 흐름' },
      { id: 'C', text: '화려한 색상과 애니메이션' },
      { id: 'D', text: '최신 차트 유형 사용' }
    ],
    correct_answer: 'B',
    explanation: '효과적인 대시보드는 핵심 지표를 명확히 보여주고 사용자의 의사결정을 지원해야 합니다.'
  },
  {
    id: 'data-8',
    category: 'data',
    difficulty: 'hard',
    question_text: 'AI를 활용한 예측 분석에서 과적합(Overfitting)을 방지하려면?',
    options: [
      { id: 'A', text: '학습 데이터를 최대한 많이 사용한다' },
      { id: 'B', text: '검증 데이터셋으로 모델 성능을 평가한다' },
      { id: 'C', text: '복잡한 모델을 사용한다' },
      { id: 'D', text: '테스트 없이 바로 배포한다' }
    ],
    correct_answer: 'B',
    explanation: '학습에 사용하지 않은 검증 데이터로 평가하여 모델의 일반화 성능을 확인해야 합니다.'
  },
  {
    id: 'data-9',
    category: 'data',
    difficulty: 'medium',
    question_text: '데이터 시각화에서 색맹 사용자를 위해 고려해야 할 점은?',
    options: [
      { id: 'A', text: '빨강-초록 조합을 적극 활용한다' },
      { id: 'B', text: '색상 외에 패턴이나 레이블을 함께 사용한다' },
      { id: 'C', text: '모든 차트를 흑백으로 만든다' },
      { id: 'D', text: '색상은 고려하지 않아도 된다' }
    ],
    correct_answer: 'B',
    explanation: '색상만으로 정보를 전달하지 않고, 패턴, 레이블, 아이콘 등을 함께 사용하면 접근성이 높아집니다.'
  },
  {
    id: 'data-10',
    category: 'data',
    difficulty: 'hard',
    question_text: 'AI에게 A/B 테스트 결과 분석을 요청할 때 필수적으로 제공해야 할 정보가 아닌 것은?',
    options: [
      { id: 'A', text: '각 그룹의 샘플 크기' },
      { id: 'B', text: '측정한 지표와 결과값' },
      { id: 'C', text: '테스트 실행 서버의 하드웨어 사양' },
      { id: 'D', text: '통계적 유의수준 기준' }
    ],
    correct_answer: 'C',
    explanation: 'A/B 테스트 분석에는 샘플 크기, 측정 지표, 유의수준 등이 필요하지만 서버 하드웨어 사양은 통계 분석과 무관합니다.'
  }
];

// 워크플로우 자동화 문제
const workflowQuestions: Question[] = [
  {
    id: 'workflow-1',
    category: 'workflow',
    difficulty: 'easy',
    question_text: '업무 자동화의 첫 단계로 가장 적절한 것은?',
    options: [
      { id: 'A', text: '바로 자동화 도구를 설치한다' },
      { id: 'B', text: '현재 업무 프로세스를 분석하고 문서화한다' },
      { id: 'C', text: '모든 업무를 한 번에 자동화한다' },
      { id: 'D', text: '가장 복잡한 업무부터 시작한다' }
    ],
    correct_answer: 'B',
    explanation: '자동화 전에 현재 프로세스를 정확히 이해하고 문서화해야 효과적인 자동화가 가능합니다.'
  },
  {
    id: 'workflow-2',
    category: 'workflow',
    difficulty: 'easy',
    question_text: 'AI를 활용한 이메일 자동화에서 주의해야 할 점은?',
    options: [
      { id: 'A', text: '모든 이메일을 자동 응답으로 처리한다' },
      { id: 'B', text: '발송 전 내용을 검토하고 개인정보 보호를 확인한다' },
      { id: 'C', text: '가능한 긴 메일을 작성한다' },
      { id: 'D', text: '수신자 확인 없이 대량 발송한다' }
    ],
    correct_answer: 'B',
    explanation: '자동 생성된 이메일도 발송 전 검토가 필요하며, 개인정보 보호 규정을 준수해야 합니다.'
  },
  {
    id: 'workflow-3',
    category: 'workflow',
    difficulty: 'medium',
    question_text: 'RPA(Robotic Process Automation)가 가장 적합한 업무 유형은?',
    options: [
      { id: 'A', text: '창의적 판단이 많이 필요한 업무' },
      { id: 'B', text: '반복적이고 규칙 기반의 업무' },
      { id: 'C', text: '매번 다른 방식으로 처리해야 하는 업무' },
      { id: 'D', text: '고객과의 감정적 소통이 필요한 업무' }
    ],
    correct_answer: 'B',
    explanation: 'RPA는 규칙이 명확하고 반복적인 업무를 자동화하는 데 가장 효과적입니다.'
  },
  {
    id: 'workflow-4',
    category: 'workflow',
    difficulty: 'medium',
    question_text: 'API 연동을 통한 업무 자동화의 장점이 아닌 것은?',
    options: [
      { id: 'A', text: '시스템 간 데이터 자동 동기화' },
      { id: 'B', text: '수동 데이터 입력 오류 감소' },
      { id: 'C', text: '인터넷 없이도 항상 작동' },
      { id: 'D', text: '실시간 정보 업데이트' }
    ],
    correct_answer: 'C',
    explanation: 'API는 일반적으로 네트워크 연결이 필요하며, 오프라인에서는 작동하지 않습니다.'
  },
  {
    id: 'workflow-5',
    category: 'workflow',
    difficulty: 'hard',
    question_text: '업무 프로세스 자동화 시 "예외 처리"가 중요한 이유는?',
    options: [
      { id: 'A', text: '예외 상황은 발생하지 않으므로 불필요하다' },
      { id: 'B', text: '예상치 못한 상황에서도 시스템이 안정적으로 동작하게 한다' },
      { id: 'C', text: '처리 속도를 높이기 위해' },
      { id: 'D', text: '코드 양을 줄이기 위해' }
    ],
    correct_answer: 'B',
    explanation: '예외 처리를 통해 오류 상황에서도 시스템이 중단되지 않고 적절히 대응할 수 있습니다.'
  },
  {
    id: 'workflow-6',
    category: 'workflow',
    difficulty: 'easy',
    question_text: 'AI 도구를 활용한 문서 작성의 올바른 활용법은?',
    options: [
      { id: 'A', text: 'AI가 작성한 내용을 검토 없이 그대로 사용한다' },
      { id: 'B', text: '초안 작성에 활용하고 반드시 검토 및 수정한다' },
      { id: 'C', text: '기밀 정보를 포함하여 요청한다' },
      { id: 'D', text: '출처 확인 없이 사실로 인용한다' }
    ],
    correct_answer: 'B',
    explanation: 'AI는 초안 작성을 돕는 도구로 활용하고, 최종 내용은 반드시 사람이 검토해야 합니다.'
  },
  {
    id: 'workflow-7',
    category: 'workflow',
    difficulty: 'medium',
    question_text: '업무 자동화 ROI(투자수익률)를 계산할 때 고려해야 할 요소가 아닌 것은?',
    options: [
      { id: 'A', text: '절감된 인건비' },
      { id: 'B', text: '오류 감소로 인한 비용 절감' },
      { id: 'C', text: '경쟁사의 자동화 현황' },
      { id: 'D', text: '자동화 도구 도입 및 유지보수 비용' }
    ],
    correct_answer: 'C',
    explanation: 'ROI 계산에는 비용과 효과를 측정하며, 경쟁사 현황은 직접적인 ROI 요소가 아닙니다.'
  },
  {
    id: 'workflow-8',
    category: 'workflow',
    difficulty: 'medium',
    question_text: 'AI를 활용한 회의록 자동 작성의 올바른 활용 방법은?',
    options: [
      { id: 'A', text: 'AI가 작성한 회의록을 검토 없이 바로 공유한다' },
      { id: 'B', text: '녹음 내용을 AI로 정리한 후 참석자 확인을 거친다' },
      { id: 'C', text: '기밀 회의 내용도 외부 AI 서비스에 업로드한다' },
      { id: 'D', text: '회의 참석 없이 AI가 추측으로 작성하게 한다' }
    ],
    correct_answer: 'B',
    explanation: 'AI 회의록은 편리하지만, 정확성 확인과 기밀 정보 보호가 필수입니다.'
  },
  {
    id: 'workflow-9',
    category: 'workflow',
    difficulty: 'medium',
    question_text: '노코드/로우코드 도구의 장점이 아닌 것은?',
    options: [
      { id: 'A', text: '개발 지식이 없어도 자동화 구현 가능' },
      { id: 'B', text: '빠른 프로토타입 개발' },
      { id: 'C', text: '모든 복잡한 비즈니스 로직 구현 가능' },
      { id: 'D', text: '비개발자의 업무 효율화' }
    ],
    correct_answer: 'C',
    explanation: '노코드/로우코드 도구는 복잡한 로직에는 한계가 있어, 고급 기능은 코딩이 필요할 수 있습니다.'
  },
  {
    id: 'workflow-10',
    category: 'workflow',
    difficulty: 'medium',
    question_text: '반복 업무 자동화 대상을 선정할 때 우선순위가 높은 업무는?',
    options: [
      { id: 'A', text: '한 달에 한 번 발생하는 창의적 기획 업무' },
      { id: 'B', text: '매일 반복되고 규칙이 명확한 데이터 입력 업무' },
      { id: 'C', text: '고객 감정에 따라 대응이 달라지는 민원 처리' },
      { id: 'D', text: '매번 새로운 판단이 필요한 전략 수립' }
    ],
    correct_answer: 'B',
    explanation: '자동화는 반복 빈도가 높고, 규칙이 명확하며, 예외가 적은 업무부터 적용하는 것이 효과적입니다.'
  }
];

// 윤리 및 보안 문제
const ethicsQuestions: Question[] = [
  {
    id: 'ethics-1',
    category: 'ethics',
    difficulty: 'easy',
    question_text: 'AI 챗봇에 절대 입력하면 안 되는 정보는?',
    options: [
      { id: 'A', text: '날씨 관련 질문' },
      { id: 'B', text: '고객의 개인정보나 회사 기밀 정보' },
      { id: 'C', text: '일반적인 프로그래밍 질문' },
      { id: 'D', text: '공개된 뉴스 기사 내용' }
    ],
    correct_answer: 'B',
    explanation: '개인정보와 기밀 정보는 AI 서비스에 입력 시 유출 위험이 있으므로 절대 입력하면 안 됩니다.'
  },
  {
    id: 'ethics-2',
    category: 'ethics',
    difficulty: 'easy',
    question_text: 'AI가 생성한 콘텐츠를 사용할 때 반드시 확인해야 할 것은?',
    options: [
      { id: 'A', text: '폰트 크기' },
      { id: 'B', text: '저작권 침해 여부와 사실 관계 정확성' },
      { id: 'C', text: '파일 용량' },
      { id: 'D', text: '생성 시간' }
    ],
    correct_answer: 'B',
    explanation: 'AI 생성 콘텐츠는 저작권 문제가 있을 수 있고, 사실과 다른 정보가 포함될 수 있습니다.'
  },
  {
    id: 'ethics-3',
    category: 'ethics',
    difficulty: 'medium',
    question_text: 'AI 편향성(Bias)이 문제가 되는 이유는?',
    options: [
      { id: 'A', text: 'AI의 응답 속도가 느려진다' },
      { id: 'B', text: '특정 집단에 대한 차별적 결과를 초래할 수 있다' },
      { id: 'C', text: '전력 소비가 증가한다' },
      { id: 'D', text: 'AI 편향성은 문제가 되지 않는다' }
    ],
    correct_answer: 'B',
    explanation: 'AI 편향성은 학습 데이터의 편향에서 비롯되어 특정 집단에 불이익을 줄 수 있습니다.'
  },
  {
    id: 'ethics-4',
    category: 'ethics',
    difficulty: 'medium',
    question_text: '제약회사에서 AI를 활용할 때 특별히 주의해야 할 규정은?',
    options: [
      { id: 'A', text: '도로교통법' },
      { id: 'B', text: 'GMP 및 의약품 관련 규제, 개인정보보호법' },
      { id: 'C', text: '건축법' },
      { id: 'D', text: '특별히 주의할 규정이 없다' }
    ],
    correct_answer: 'B',
    explanation: '제약회사는 GMP, 의약품 규제, HIPAA, 개인정보보호법 등 엄격한 규제를 준수해야 합니다.'
  },
  {
    id: 'ethics-5',
    category: 'ethics',
    difficulty: 'hard',
    question_text: 'AI 사용의 투명성(Transparency)이 중요한 이유로 올바른 것은?',
    options: [
      { id: 'A', text: '사용자에게 AI 사용 사실을 숨기기 위해' },
      { id: 'B', text: 'AI 의사결정 과정을 이해하고 신뢰를 구축하기 위해' },
      { id: 'C', text: '경쟁사에 기술을 공개하기 위해' },
      { id: 'D', text: '투명성은 중요하지 않다' }
    ],
    correct_answer: 'B',
    explanation: 'AI 투명성은 의사결정 과정의 이해, 오류 발견, 신뢰 구축에 필수적입니다.'
  },
  {
    id: 'ethics-6',
    category: 'ethics',
    difficulty: 'easy',
    question_text: 'AI 도구 사용 시 회사 보안 정책에서 일반적으로 요구하는 것은?',
    options: [
      { id: 'A', text: '승인된 AI 도구만 사용' },
      { id: 'B', text: '아무 AI 도구나 자유롭게 사용' },
      { id: 'C', text: '개인 계정으로 회사 업무 처리' },
      { id: 'D', text: '보안 정책은 AI에 적용되지 않는다' }
    ],
    correct_answer: 'A',
    explanation: '대부분의 회사는 승인된 AI 도구만 사용하도록 정책을 수립하고 있습니다.'
  },
  {
    id: 'ethics-7',
    category: 'ethics',
    difficulty: 'medium',
    question_text: '딥페이크(Deepfake) 기술의 윤리적 위험성은?',
    options: [
      { id: 'A', text: '영상 품질이 낮아진다' },
      { id: 'B', text: '허위 정보 유포, 명예훼손, 사기에 악용될 수 있다' },
      { id: 'C', text: '인터넷 속도가 느려진다' },
      { id: 'D', text: '딥페이크에는 윤리적 문제가 없다' }
    ],
    correct_answer: 'B',
    explanation: '딥페이크는 가짜 영상/음성 생성을 통해 허위정보, 사기, 명예훼손 등에 악용될 수 있습니다.'
  },
  {
    id: 'ethics-8',
    category: 'ethics',
    difficulty: 'hard',
    question_text: 'AI 모델의 "설명 가능성(Explainability)"이 중요한 분야는?',
    options: [
      { id: 'A', text: '게임 개발' },
      { id: 'B', text: '의료 진단, 금융 심사, 법적 판단' },
      { id: 'C', text: '날씨 예보' },
      { id: 'D', text: '설명 가능성은 어떤 분야에서도 중요하지 않다' }
    ],
    correct_answer: 'B',
    explanation: '사람의 생명, 재산, 권리에 영향을 미치는 분야에서는 AI 결정의 이유를 설명할 수 있어야 합니다.'
  },
  {
    id: 'ethics-9',
    category: 'ethics',
    difficulty: 'medium',
    question_text: 'EU의 AI 규제법(AI Act)에서 "고위험 AI"로 분류되는 기준은?',
    options: [
      { id: 'A', text: 'AI 시스템의 크기' },
      { id: 'B', text: '인간의 건강, 안전, 기본권에 미치는 영향' },
      { id: 'C', text: 'AI 개발 비용' },
      { id: 'D', text: 'AI 회사의 규모' }
    ],
    correct_answer: 'B',
    explanation: 'EU AI Act는 인간의 건강, 안전, 기본권에 영향을 미치는 AI를 고위험으로 분류합니다.'
  },
  {
    id: 'ethics-10',
    category: 'ethics',
    difficulty: 'hard',
    question_text: 'AI 윤리에서 "공정성(Fairness)"을 달성하기 어려운 이유는?',
    options: [
      { id: 'A', text: '컴퓨터 성능이 부족해서' },
      { id: 'B', text: '공정성의 정의가 상황과 관점에 따라 다를 수 있어서' },
      { id: 'C', text: '공정성은 측정할 수 없어서' },
      { id: 'D', text: 'AI는 항상 공정하므로 문제가 없다' }
    ],
    correct_answer: 'B',
    explanation: '공정성은 다양한 정의(기회 균등, 결과 균등 등)가 있어 모든 기준을 동시에 만족하기 어렵습니다.'
  }
];

// 전체 문제 합치기
export const allQuestions: Question[] = [
  ...promptQuestions,
  ...dataQuestions,
  ...workflowQuestions,
  ...ethicsQuestions
];

// 카테고리별 문제 가져오기
export function getQuestionsByCategory(category: string): Question[] {
  return allQuestions.filter(q => q.category === category);
}

// 랜덤 문제 세트 생성 (각 카테고리에서 10문제씩)
export function generateQuestionSet(): Question[] {
  const categories = ['prompt', 'data', 'workflow', 'ethics'];
  const questionSet: Question[] = [];

  categories.forEach(category => {
    const categoryQuestions = getQuestionsByCategory(category);
    // 셔플하여 랜덤 순서로
    const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5);
    questionSet.push(...shuffled.slice(0, 10));
  });

  // 전체 문제도 섞기
  return questionSet.sort(() => Math.random() - 0.5);
}
