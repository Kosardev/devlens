import { RepoInputForm } from "@/components/repo/repo-input-form";

export default function HomePage() {
  return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
          <div className="text-center space-y-6 max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  DevLens
              </h1>
              <p className="text-sm text-slate-400">
                  GitHub Issue Insight Dashboard – ریپازیتوری GitHub رو وارد کن تا
                  وضعیت Issueها، روند، و insightها رو ببینی.
              </p>
              <div className="flex justify-center">
                  <RepoInputForm />
              </div>
          </div>
      </main>
  );
}