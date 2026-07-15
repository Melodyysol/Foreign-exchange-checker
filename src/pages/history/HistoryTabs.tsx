import type { Tab, TabProps } from "../../type/tabs";
import { tabs } from "../../utilities/tabs";
import { useNavigate } from "react-router-dom";

export const HistoryTabs = ({ currentTab, setCurrentTab }: TabProps) => {
  const navigate = useNavigate();

  const handleTabChange = (tab: Tab) => {
    const selectedTab = tabs.find((t) => t.tab === tab);
    if (selectedTab) {
      setCurrentTab(selectedTab);
      navigate(`/${selectedTab.tab}`);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="border-b-2 border-b-base-200 hidden md:block">
        {tabs.map(({ tab, num }) => (
          <button
            key={tab}
            className={`uppercase btn border-b btn-sm ${currentTab.tab === tab ? "btn-soft" : "btn-ghost"}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
            {num && (
              <span className="bg-gray-400/30  text-yellow-50 px-1.5 py-0.5 rounded-full text-[8px]">
                {num}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="dropdown dropdown-end w-full md:hidden">
        <button
          tabIndex={0}
          type="button"
          className="cursor-pointer uppercase btn btn-block btn-sm btn-soft gap-2"
        >
          {currentTab.tab}
          {currentTab.num ? (
            <span className="bg-gray-400/30  text-yellow-50 px-1.5 py-0.5 rounded-full text-[8px]">
              {currentTab.num}
            </span>
          ) : (
            ""
          )}
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content z-10 menu shadow bg-base-200 rounded-box w-full gap-2"
        >
          {tabs.map((t) => (
            <li
              key={t.tab}
              role="button"
              className="uppercase flex flex-row items-center gap-1 cursor-pointer hover:bg-base-300 p-2"
              value={t.tab}
              onClick={() => handleTabChange(t.tab)}
            >
              {t.tab}
              {t.num ? (
                <span className="bg-gray-400/30  text-yellow-50 px-1.5 py-0.5 rounded-full text-[8px]">
                  {t.num}
                </span>
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
