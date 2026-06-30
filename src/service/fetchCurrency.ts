import axios from "axios";
import { chartSchema, type Chart } from "../schema/chartSchema";
export async function fetchCurrency(from: string, to: string): Promise<Chart> {
  try {
    const response = await axios.get(
      `https://api.frankfurter.app/2025-05-01..2025-05-31?from=${from}&to=${to}`,
    );
    const validatingData = chartSchema.safeParse(response.data);
    if (!validatingData.success) {
      throw new Error(validatingData.error.message);
    }
    return validatingData.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Uncaught Error occurred", {
      cause: error,
    });
  }
}
