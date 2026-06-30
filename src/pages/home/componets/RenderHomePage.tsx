import { Exchange } from "./Exchange";
import TabDetail from "./TabDetail";

export const RenderHomePage = () => {
  return (
    <main className="text-sm text-gray-400">
      <Exchange />
      <TabDetail />
    </main>
  );
};
