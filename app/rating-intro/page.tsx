import Markdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const markdown = `
**주의: 아래는 임의로 생성된 레이팅 시스템 소개 문서입니다. 실제와는 관련이 없습니다.**

# 레이팅 시스템 소개

## 시스템 개요

이 페이지는 서비스 내 레이팅 시스템이 어떻게 작동하는지 간단히 소개합니다.

레이팅은 사용자 활동과 성과 지표를 기반으로 계산되며, 공정하고 투명한 평가를 목표로 합니다.

## 주요 구성 요소

### 레이팅 지표

레이팅은 여러 개의 지표(예: 정답률, 참여도, 안정성 점수 등)를 조합하여 산출됩니다.

각 지표는 가중치가 다르며, 전체 점수에 미치는 영향 역시 서로 다릅니다.

> 참고: 레이팅은 상대적인 값으로, 전체 사용자 분포에 따라 변화할 수 있습니다.

### 레이팅 계산 방식

기본적으로 레이팅은 최근 활동에 더 높은 가중치를 주는 방식으로 계산됩니다.

특정 기간 동안의 기록이 부족한 경우, 이전 레이팅이나 기본값을 사용하여 보정합니다.

#### 간단한 예시 코드

아래 예시는 클라이언트에서 사용자 레이팅을 가져와 화면에 표시하는 간단한 JSX 코드 예시입니다.

\`\`\`jsx
function RatingExample({ userId }) {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    fetch(\`/api/rating/\${userId}\`)
      .then((res) => res.json())
      .then((data) => setRating(data.rating));
  }, [userId]);

  return <div>현재 레이팅: {rating ?? "계산 중..."}</div>;
}
\`\`\`

- 레이팅 지표 정의
- 가중치 및 계산 공식 확정
  - 최근 기록에 대한 가중치 조정

1. 사용자 활동 데이터 수집
2. 레이팅 계산 작업 수행
3. 결과를 대시보드에 반영

---
`;

const ShadcnTypographyRenderer = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="my-6 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="my-6 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="my-6 scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="my-6 scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </pre>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="ml-6 list-disc [&>li]:mt-2">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="ml-6 list-decimal [&>li]:mt-2">{children}</ol>
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full table-auto">{children}</table>
    </div>
  ),
  hr: () => <hr className="my-4 w-full" />,
};

export default function RatingIntro() {
  return (
    <main className="min-h-screen w-full max-w-3xl items-center py-16 px-8 md:py-32 md:px-16 bg-white dark:bg-black sm:items-start">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={ShadcnTypographyRenderer as Components}
      >
        {markdown}
      </Markdown>
    </main>
  );
}
