import { useEffect, useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";
import ExperienceSection from "../components/ExperienceSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import TopButton from "../components/TopButton";
import MenuOverlay from "../components/MenuOverlay";
import { useScrollEffects } from "../hooks/useScrollEffects";
import { useBodyClasses } from "../hooks/useBodyClasses";

function HomePage() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isScrolled, showTopButton } = useScrollEffects();

  useBodyClasses({ isDark, isScrolled, isMenuOpen });

  useEffect(() => {
    if (!isScrolled) {
      setIsMenuOpen(false);
    }
  }, [isScrolled]);

  const handleThemeToggle = (): void => {
    setIsDark((prev) => !prev);
  };

  const handleHamburgerClick = (): void => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClose = (): void => {
    setIsMenuOpen(false);
  };

  const handleNavLinkClick = (): void => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <Header
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
        onHamburgerClick={handleHamburgerClick}
        onNavLinkClick={handleNavLinkClick}
      />

      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />

      <TopButton visible={showTopButton} />
      <MenuOverlay onClick={handleMenuClose} />
    </>
  );
}

export default HomePage;
