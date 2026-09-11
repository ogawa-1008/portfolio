function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer-profile">
          <h3 className="footer-profile__name">小川弘能</h3>
          <p className="footer-profile__description">
            美しいWebアプリケーションを作成する
            <br />
            フルスタックエンジニア
          </p>
        </div>

        <nav className="footer-nav">
          <ul className="footer-nav__list">
            <li className="footer-nav__item">
              <a href="#about" className="footer-nav__link">
                About
              </a>
            </li>
            <li className="footer-nav__item">
              <a href="#projects" className="footer-nav__link">
                Projects
              </a>
            </li>
            <li className="footer-nav__item">
              <a href="#skills" className="footer-nav__link">
                Skills
              </a>
            </li>
            <li className="footer-nav__item">
              <a href="#contact" className="footer-nav__link">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer-social">
          <h4 className="footer-social__title">フォローする</h4>
          <div className="footer-social__icons">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social__icon"
              aria-label="GitHub"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social__icon"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social__icon"
              aria-label="X"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a
              href="mailto:contact@example.com"
              className="footer-social__icon"
              aria-label="メール"
            >
              <i className="fa-regular fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-bottom__text">
          © 2025 小川弘能. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
