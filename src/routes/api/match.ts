import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { matchSchemes } from "@/lib/matching";

const schema = z.object({
  age: z.number().int().min(0).max(120),
  state: z.string().min(1).max(60),
  occupation: z.string().min(1).max(60),
  income: z.string().min(1).max(40),
  category: z.string().min(1).max(40),
  land_status: z.string().min(1).max(40),
  bank_account: z.string().min(1).max(20),
  ration_card: z.string().min(1).max(20),
  assisted: z.boolean().optional(),
});

export const Route = createFileRoute("/api/match")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = schema.safeParse(await request.json());
        if (!parsed.success) {
          return Response.json({ error: "Invalid profile" }, { status: 400 });
        }
        return Response.json(matchSchemes(parsed.data));
      },
    },
  },
});
