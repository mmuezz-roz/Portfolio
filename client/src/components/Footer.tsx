export function Footer() {
  return (
    <footer className="border-t border-surface-border py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:py-12">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-6 px-4 text-center text-sm text-slate-500 sm:flex-row sm:px-8 sm:text-left lg:px-10">
        <p>© {new Date().getFullYear()} Abdul Muez. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-8">
          <a href="https://github.com/mmuezz-roz" className="transition hover:text-slate-900">
            GitHub
          </a>
          <a href="https://linkedin.com/in/abdul-muez" className="transition hover:text-slate-900">
            LinkedIn
          </a>
          <a href="mailto:mmuez58@gmail.com" className="transition hover:text-slate-900">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
