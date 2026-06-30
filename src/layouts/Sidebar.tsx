import { motion } from "motion/react";
import { useState } from "react";

import CloseIcon from "../assets/icons/close-icon.png";
import { useNavigate } from "react-router-dom";

// Example array structure you can map over
const authenticatedLinks = [
  { name: "Converter", icon: "💱", path: "/converter" },
  { name: "Live Rates", icon: "📈", path: "/live-rates" },
  { name: "Rate Alerts", icon: "🔔", path: "/rate-alerts" },
  { name: "Charts", icon: "📊", path: "/charts" },
  { name: "History", icon: "⏳", path: "/history" },
  { name: "Settings", icon: "⚙️", path: "/settings" },
];

const Sidebar = ({
  setShowSidebar,
}: {
  setShowSidebar: (show: boolean) => void;
}) => {
  const [currentLink, setCurrentLink] = useState(authenticatedLinks[0]);

  const navigate = useNavigate();

  const sidebarVariants = {
    hidden: {
      x: "-100%",
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
    show: {
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const backDropVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setShowSidebar(false);
  };

  return (
    <motion.aside
      variants={backDropVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="bg-base-content/20 fixed inset-0"
      onClick={() => setShowSidebar(false)}
    >
      <motion.div
        variants={sidebarVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="fixed left-0 top-0 bottom-0 bg-base-100 w-64 md:w-96 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-11/12 mx-auto py-10 relative">
          <button
            className="btn btn-xs btn-circle btn-accent absolute top-2 right-2 tooltip tooltip-bottom tooltip-info"
            data-tip="Close"
            onClick={() => setShowSidebar(false)}
          >
            <img src={CloseIcon} alt={CloseIcon} className="rounded-full" />
          </button>
          <ul className="flex flex-col gap-4 items-start">
            {authenticatedLinks.map((link, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className={`capitalize btn md:btn-lg justify-start hover:btn-active btn-block ${currentLink.name === link.name ? "btn-active" : "btn-soft"}`}
                onClick={() => {
                  setCurrentLink(link);
                  handleNavigation(link.path);
                }}
              >
                {link.icon} {link.name}
              </motion.li>
            ))}
          </ul>
          <button
            onClick={() => handleNavigation("/login")}
            className="btn btn-success btn-block mt-10 uppercase font-extrabold"
          >
            Log In
          </button>
        </div>
      </motion.div>
    </motion.aside>
  );
};
export default Sidebar;
