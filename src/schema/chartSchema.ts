import { z } from "zod";

export const chartSchema = z.object({
  amount: z.number(),
  base: z.string(),
  date: z.string(),
  // end_date: z.string(),
  // rates: z.record(z.string(), z.record(z.string(), z.number())),
  rates: z.record(z.string(), z.number()),
});

export const chartHistorySchema = z.object({
  base: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  rates: z.record(z.string(), z.record(z.string(), z.number())),
});

export type Chart = z.infer<typeof chartSchema>;
export type ChartHistory = z.infer<typeof chartHistorySchema>;
