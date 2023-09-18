import { useEffect, useState } from "react";

const ScrollTopUI = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return (
    <div className="scroll-top">
      <button
        className="scroll-to-top-button"
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      >
        top
      </button>
    </div>
  );
};

export default ScrollTopUI;
