import { createFileRoute } from "@tanstack/react-router";
import { METADATA } from "@/lib/schemes";

export const Route = createFileRoute("/api/metadata")({
  server: {
    handlers: {
      GET: async () => Response.json(METADATA),
    },
  },
});
