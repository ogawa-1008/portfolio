function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-section__container">
        <p className="hero-section__intro-text">
          こんにちは、私は
          <span className="hero-section__intro-name">小川弘能</span>
          です
        </p>

        <h1 className="hero-section__title">
          フルスタックエンジニア | UI/UXデザイナー
        </h1>

        <p className="hero-section__description">
          美しくユーザーフレンドリーなWebアプリケーションの作成に情熱を注いでいます。
          モダンな技術とクリーンなデザインを組み合わせて、意味のあるデジタル体験を創造します。
        </p>

        <div className="hero-section__cta-group">
          <a
            href="#projects"
            className="hero-section__cta hero-section__cta--primary"
          >
            プロジェクトを見る
          </a>
          <a
            href="#contact"
            className="hero-section__cta hero-section__cta--secondary"
          >
            お問い合わせ
          </a>
        </div>

        <div className="hero-section__social-links">
          <a
            className="hero-section__social-link"
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            className="hero-section__social-link"
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a
            className="hero-section__social-link"
            href="mailto:contact@example.com"
            aria-label="メール"
          >
            <i className="fa-regular fa-envelope"></i>
          </a>
        </div>

        <div className="hero-section__scroll-indicator">
          <i className="fa-solid fa-arrow-down"></i>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
