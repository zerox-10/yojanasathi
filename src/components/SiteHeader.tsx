import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader({ onStart }: { onStart: (assisted?: boolean) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4">
        <a href="/" className="label-mono min-w-0 truncate font-medium" data-testid="header-logo">
          Yojana&nbsp;Sathi
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          <a href="#how-it-works" className="text-sm text-muted-ink hover:text-ink" data-testid="header-how-it-works-link">
            How it works
          </a>
          <a href="#for-helpers" className="text-sm text-muted-ink hover:text-ink" data-testid="header-helpers-link">
            For helpers
          </a>
          <Button size="sm" onClick={() => onStart(false)} data-testid="header-start-button">
            Start checking
          </Button>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid size-11 shrink-0 place-items-center rounded-md border border-line bg-surface md:hidden"
          data-testid={open ? "mobile-menu-close-button" : "mobile-menu-button"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-surface px-5 py-4 md:hidden" data-testid="mobile-menu-panel">
          <nav className="flex flex-col gap-1">
            <a
              href="#how-it-works"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center text-sm"
              data-testid="mobile-how-it-works-link"
            >
              How it works
            </a>
            <a
              href="#for-helpers"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center text-sm"
              data-testid="mobile-helpers-link"
            >
              For helpers
            </a>
            <Button
              className="mt-2 min-h-11"
              onClick={() => {
                setOpen(false);
                onStart(false);
              }}
              data-testid="mobile-start-button"
            >
              Start checking
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
