import { Copy, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function ShareDialog({ summary }: { summary: string }) {
  const [open, setOpen] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      toast.success("Summary copied to clipboard");
    } catch {
      toast.error("Could not copy — please copy manually");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" data-testid="results-share-button">
          <MessageCircle className="size-4" /> Share shortlist
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg" data-testid="share-dialog">
        <DialogHeader>
          <DialogTitle>Share this shortlist</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-ink">
          Copy the text below or send it through WhatsApp. Nothing is stored on our servers.
        </p>
        <textarea
          readOnly
          value={summary}
          className="mt-3 h-48 w-full rounded-md border border-line bg-surface p-3 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          data-testid="share-summary-textarea"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <Button onClick={copy} data-testid="share-copy-button">
            <Copy className="size-4" /> Copy text
          </Button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(summary)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-9 items-center gap-2 rounded-md border border-line px-3 text-sm font-medium hover:border-muted-ink"
            data-testid="share-whatsapp-button"
          >
            <MessageCircle className="size-4" /> WhatsApp
          </a>
          <Button variant="ghost" onClick={() => setOpen(false)} data-testid="share-close-button">
            <X className="size-4" /> Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
