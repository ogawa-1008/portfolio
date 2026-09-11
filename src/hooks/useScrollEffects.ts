import { useEffect, useState } from "react";

interface ScrollEffects {
  isScrolled: boolean;
  showTopButton: boolean;
}

export function useScrollEffects(): ScrollEffects {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 120);
      setShowTopButton(scrollY > 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isScrolled, showTopButton };
}
