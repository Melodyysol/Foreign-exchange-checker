import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FocusTrap } from "focus-trap-react";

import useAuth from "../custom-hook/UseAuth";

import CloseIcon from "../assets/icons/close-icon.png";
import { toast } from "sonner";

const authenticatedLinks = [
  { name: "Converter", icon: "💱", path: "/" },
  { name: "Favorites", icon: "⭐", path: "/favorites" },
  { name: "Compare", icon: "⚖️", path: "/compare" },
  { name: "Log", icon: "📝", path: "/log" },
  { name: "History", icon: "⏳", path: "/history" },
  { name: "Settings", icon: "⚙️", path: "/settings" },
];

const Sidebar = ({
  setShowSidebar,
  showSidebar,
}: {
  setShowSidebar: (show: boolean) => void;
  showSidebar: boolean;
}) => {
  // const [currentLink, setCurrentLink] = useState(authenticatedLinks[0]);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navigate = useNavigate();

  const firstButtonRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (showSidebar) {
      firstButtonRef.current?.focus();
    }
  }, [showSidebar]);

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

  const handleLogout = async () => {
    if (user) {
      const result = await signOut();
      if (result.success) {
        toast.error("Logout successful!");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    setShowSidebar(false);
  };

  return (
    <FocusTrap>
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
              aria-label="Close sidebar"
              className="btn btn-xs btn-circle btn-accent absolute top-2 right-2 tooltip tooltip-bottom tooltip-info"
              data-tip="Close"
              onClick={() => setShowSidebar(false)}
            >
              <img src={CloseIcon} alt="close icon" className="rounded-full" />
            </button>
            <ul className="flex flex-col gap-4 items-start">
              {authenticatedLinks.map((link) => (
                <motion.li
                  key={link.name}
                  ref={firstButtonRef}
                  tabIndex={0}
                  role="button"
                  variants={itemVariants}
                  className={`capitalize btn md:btn-lg justify-start hover:btn-active btn-block ${location.pathname === link.path ? "btn-active" : "btn-soft"}`}
                  onClick={() => {
                    navigate(link.path);
                    setShowSidebar(false);
                  }}
                >
                  {link.icon} {link.name}
                </motion.li>
              ))}
            </ul>
            <button
              onClick={() => handleLogout()}
              className={`btn ${user ? "btn-error" : "btn-success"} btn-block mt-10 uppercase font-extrabold`}
            >
              Log {user ? "out" : "in"}
            </button>
          </div>
        </motion.div>
      </motion.aside>
    </FocusTrap>
  );
};
export default Sidebar;
