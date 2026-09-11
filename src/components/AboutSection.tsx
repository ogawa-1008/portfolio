function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-image-wrapper">
          <img
            src="/img/2AC36FA4-BCD7-40D8-BF27-0F7B6E822C7D_1_105_c.jpeg"
            alt="作業デスクの写真"
            className="about-image"
          />
        </div>

        <div className="about-content">
          <h2 className="about-heading">私について</h2>

          <div className="about-text-group">
            <p className="about-text">
              こんにちは！私は東京を拠点に活動するフルスタックエンジニア兼UI/UXデザイナーです。
              5年以上の経験を持ち、アイデアを現実の製品に変えることに情熱を注いでいます。
            </p>

            <p className="about-text">
              私の専門分野は、React、Next.js、TypeScriptを使用したモダンなWebアプリケーションの構築です。
              また、ユーザー中心のデザイン原則を理解し、見た目だけでなく機能的にも優れた
              インターフェースを作成することに重点を置いています。
            </p>

            <p className="about-text">
              コーディング以外では、デザインのトレンドを探求したり、
              オープンソースプロジェクトに貢献したり、
              技術コミュニティで知識を共有したりすることを楽しんでいます。
            </p>
          </div>

          <div className="about-stats-grid">
            <div className="about-stat-card">
              <span className="about-stat-number">5+</span>
              <span className="about-stat-label">年の経験</span>
            </div>

            <div className="about-stat-card">
              <span className="about-stat-number">50+</span>
              <span className="about-stat-label">完成プロジェクト</span>
            </div>

            <div className="about-stat-card">
              <span className="about-stat-number">30+</span>
              <span className="about-stat-label">満足したクライアント</span>
            </div>

            <div className="about-stat-card">
              <span className="about-stat-number">10+</span>
              <span className="about-stat-label">受賞歴</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
