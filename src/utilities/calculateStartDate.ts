export const calculatedStartDate = (range: string) => {
  const now = new Date();

  switch (range) {
    case "1D":
      now.setDate(now.getDate() - 1);
      break;
    case "1W":
      now.setDate(now.getDate() - 7);
      break;
    case "1M":
      now.setMonth(now.getMonth() - 1);
      break;
    case "3M":
      now.setMonth(now.getMonth() - 3);
      break;
    case "1Y":
      now.setFullYear(now.getFullYear() - 1);
      break;
    case "5Y":
      now.setFullYear(now.getFullYear() - 5);
      break;
    default:
      now.setDate(now.getDate() - 1);
      break;
  }
  return now.toISOString().split("T")[0];
};
