import axios from "axios";
import {
  chartHistorySchema,
  chartSchema,
  type ChartHistory,
  type Chart,
} from "../schema/chartSchema";

function handleFetchError(error: unknown, context: string): never {
  if (error instanceof Error) {
    console.error(`${context}:`, error.message);
    throw error;
  }
  throw new Error(`Uncaught error in ${context}`, { cause: error });
}

export async function fetchCurrency(
  amount: number,
  from: string,
  to: string,
): Promise<Chart> {
  try {
    const response = await axios.get("/api/latest", {
      params: { amount, from, to },
    });
    console.log("Response from API:", response.data); // Log the response data for debugging
    const validatingData = chartSchema.safeParse(response.data);
    if (!validatingData.success) {
      console.error("Error validating the currency:", validatingData.error);
      throw new Error(
        "Error validating the currency: " + validatingData.error.message,
      );
    }
    return validatingData.data;
  } catch (error) {
    return handleFetchError(error, "fetching currency");
  }
}

export async function fetchCurrencyHistory(
  from: string,
  to: string,
  startDate: string,
  endDate: string,
): Promise<ChartHistory> {
  try {
    const response = await axios.get(`/api/${startDate}..${endDate}`, {
      params: { amount: 1, from, to },
    });
    console.log("Response from API:", response.data); // Log the response data for debugging
    const validatingData = chartHistorySchema.safeParse(response.data);
    if (!validatingData.success) {
      throw new Error(
        "Error validating the currency history: " +
          validatingData.error.message,
      );
    }
    return validatingData.data;
  } catch (error) {
    return handleFetchError(error, "fetching currency");
  }
}
