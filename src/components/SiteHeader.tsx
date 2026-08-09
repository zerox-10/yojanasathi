import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";

export function SiteHeader({ onStart }: { onStart?: (assisted?: boolean) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4">
        <Link to="/" className="label-mono min-w-0 truncate font-medium" data-testid="header-logo">
          Yojana&nbsp;Sathi
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            to="/"
            className="text-sm text-muted-ink hover:text-ink"
            data-testid="header-home-link"
            activeProps={{ className: "font-medium text-ink" }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to="/impact"
            className="text-sm text-muted-ink hover:text-ink"
            data-testid="header-impact-link"
            activeProps={{ className: "font-medium text-ink" }}
          >
            Impact
          </Link>
          <Link
            to="/schemes"
            className="text-sm text-muted-ink hover:text-ink"
            data-testid="header-schemes-link"
            activeProps={{ className: "font-medium text-ink" }}
          >
            Schemes
          </Link>
          {onStart ? (
            <Button size="sm" onClick={() => onStart(false)} data-testid="header-start-button">
              Start checking
            </Button>
          ) : (
            <Button asChild size="sm" data-testid="header-start-button">
              <Link to="/">Start checking</Link>
            </Button>
          )}
          <LanguageToggle />
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
        <div
          className="border-t border-line bg-surface px-5 py-4 md:hidden"
          data-testid="mobile-menu-panel"
        >
          <nav className="flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center text-sm"
              data-testid="mobile-home-link"
            >
              Home
            </Link>
            <Link
              to="/impact"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center text-sm"
              data-testid="mobile-impact-link"
            >
              Impact
            </Link>
            <Link
              to="/schemes"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center text-sm"
              data-testid="mobile-schemes-link"
            >
              Schemes
            </Link>
            {onStart ? (
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
            ) : (
              <Button asChild className="mt-2 min-h-11" data-testid="mobile-start-button">
                <Link to="/" onClick={() => setOpen(false)}>
                  Start checking
                </Link>
              </Button>
            )}
            <div className="mt-4">
              <LanguageToggle mobile />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
