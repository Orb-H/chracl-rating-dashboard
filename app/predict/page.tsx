export default function Predict() {
  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center py-16 px-8 md:py-32 md:px-16 bg-background md:items-start">
      <header className="mb-8 w-full">
        <h1 className="text-4xl font-bold">승부 예측</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {/* TODO(#210): Add content about predicting custom matches. */}
          이전에 진행됐거나 진행 예정인 경기의 예측 결과를 확인해보세요.
        </p>
      </header>
      {/* TODO(#210): Add content about prediction data. */}
    </main>
  );
}
