import { z } from "zod";

export const chartSchema = z.object({
  amount: z.number(),
  base: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  rates: z.record(z.string(), z.record(z.string(), z.number())),
});

export type Chart = z.infer<typeof chartSchema>;
