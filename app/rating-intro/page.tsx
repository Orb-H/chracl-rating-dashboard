import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdown = `
# h1
## h2
### h3
#### h4

p

> blockquote

\`\`\`jsx
console.log("code block");
\`\`\`

- unordered list item 1
- unordered list item 2
  - nested item

1. ordered list item 1
2. ordered list item 2

---
`;

const ShadcnTypographyRenderer = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
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
    <main className="min-h-screen w-full max-w-3xl items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={ShadcnTypographyRenderer}
      >
        {markdown}
      </Markdown>
    </main>
  );
}
