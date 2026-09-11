import { useEffect } from "react";

interface BodyClassesOptions {
  isDark: boolean;
  isScrolled: boolean;
  isMenuOpen: boolean;
}

export function useBodyClasses({
  isDark,
  isScrolled,
  isMenuOpen,
}: BodyClassesOptions): void {
  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
    document.body.classList.toggle("scrolled", isScrolled);
    document.body.classList.toggle("menu-open", isMenuOpen);
  }, [isDark, isScrolled, isMenuOpen]);

  useEffect(() => {
    return () => {
      document.body.classList.remove("dark", "scrolled", "menu-open");
    };
  }, []);
}
