import { createFileRoute } from "@tanstack/react-router";
import { getScheme } from "@/lib/schemes";

export const Route = createFileRoute("/api/schemes/$schemeId")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const scheme = getScheme(params.schemeId);
        if (!scheme) return Response.json({ error: "Scheme not found" }, { status: 404 });
        return Response.json(scheme);
      },
    },
  },
});
