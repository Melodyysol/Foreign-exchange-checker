import { Exchange } from "./Exchange";
import { History } from "./History";

export const RenderHomePage = () => {
  return (
    <main className="text-sm text-gray-400">
      <Exchange />
      <History />
    </main>
  );
};
