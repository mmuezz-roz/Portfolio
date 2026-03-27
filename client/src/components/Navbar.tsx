import { useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#insights", label: "Blogs" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center px-3 pt-[max(1rem,env(safe-area-inset-top))] sm:px-4 sm:pt-6">
      {/* Narrow centered pill (~30–40% width on desktop) */}
      <div className="pointer-events-auto relative z-[100] w-full max-w-[calc(100%-1.5rem)] md:max-w-[min(40vw,42rem)] md:min-w-[min(100%,22rem)]">
        <nav
          className="relative z-[100] flex w-full items-center gap-2 rounded-full border border-[#e0e0e0] bg-white px-3 py-2 shadow-[0_4px_24px_-6px_rgba(15,23,42,0.08),0_2px_8px_-4px_rgba(15,23,42,0.06)] sm:gap-3 sm:px-4 sm:py-2.5 md:gap-2 md:px-3 md:py-2"
          aria-label="Primary"
        >
          <a
            href="#home"
            className="flex shrink-0 items-center rounded-full outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-400"
          >
            <img
              src="/profile.jpg"
              alt=""
              className="h-8 w-8 rounded-full object-cover object-top ring-2 ring-white sm:h-9 sm:w-9"
              width={36}
              height={36}
            />
          </a>

          <ul className="hidden min-w-0 flex-1 items-center justify-center gap-5 text-[0.8125rem] font-medium text-[#4b5563] md:flex md:gap-6 lg:gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="whitespace-nowrap transition hover:text-[#111827]">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden shrink-0 md:block">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#111111] px-5 py-2.5 text-[0.8125rem] font-medium leading-none text-white shadow-sm transition hover:bg-black"
            >
              Contact
            </a>
          </div>

          <button
            type="button"
            className="ml-auto shrink-0 rounded-full border border-[#e5e5e5] bg-white px-3 py-2 text-[0.8125rem] font-medium text-[#374151] md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
          >
            Menu
          </button>
        </nav>

        {open && (
          <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-[110] rounded-2xl border border-[#e0e0e0] bg-white p-4 shadow-lg md:hidden">
            <ul className="flex flex-col gap-3 text-sm text-[#374151]">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex rounded-full bg-[#111111] px-4 py-2 font-medium text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
