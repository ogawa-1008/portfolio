interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
  onHamburgerClick: () => void;
  onNavLinkClick: () => void;
}

function Header({
  isDark,
  onThemeToggle,
  onHamburgerClick,
  onNavLinkClick,
}: HeaderProps) {
  return (
    <header className="header">
      <h1>Portfolio</h1>

      <nav className="nav">
        <ul>
          <li>
            <a href="#about" onClick={onNavLinkClick}>
              About Me
            </a>
          </li>
          <li>
            <a href="#career" onClick={onNavLinkClick}>
              Career
            </a>
          </li>
          <li>
            <a href="#projects" onClick={onNavLinkClick}>
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" onClick={onNavLinkClick}>
              Contact
            </a>
          </li>
          <li>
            <button
              id="theme-toggle"
              type="button"
              aria-label="ダークモード切替"
              onClick={onThemeToggle}
            >
              <i
                className={`fa-solid ${isDark ? "fa-sun" : "fa-moon"}`}
                id="theme-toggle-icon"
              ></i>
            </button>
          </li>
        </ul>
      </nav>

      <button
        className="hamburger"
        id="hamburger"
        type="button"
        aria-label="メニュー"
        onClick={onHamburgerClick}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}

export default Header;
