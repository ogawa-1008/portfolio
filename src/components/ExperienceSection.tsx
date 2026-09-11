function ExperienceSection() {
  return (
    <section className="experience" id="career">
      <div className="experience__header">
        <h2 className="experience__title">経験 & 学歴</h2>
      </div>

      <div className="timeline">
        <div className="timeline__line"></div>

        <article className="timeline-item">
          <div className="timeline-item__icon">🏢</div>

          <div className="timeline-item__card">
            <span className="timeline-item__date">2022年 - 現在</span>

            <h3 className="timeline-item__role">シニアフルスタックエンジニア</h3>

            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="timeline-item__company"
            >
              テックイノベーション株式会社
            </a>

            <p className="timeline-item__description">
              大規模なWebアプリケーションの設計と開発をリード。
              エンジニアチームを指導し、コードレビューを実施。
            </p>
          </div>
        </article>

        <article className="timeline-item">
          <div className="timeline-item__icon">🏢</div>

          <div className="timeline-item__card">
            <span className="timeline-item__date">2020年 - 2022年</span>

            <h3 className="timeline-item__role">フロントエンドエンジニア</h3>

            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="timeline-item__company"
            >
              デジタルソリューションズ
            </a>

            <p className="timeline-item__description">
              React、Next.js、TypeScriptを使用してレスポンシブな
              Webアプリケーションを開発。UI/UXチームと密接に協力。
            </p>
          </div>
        </article>

        <article className="timeline-item">
          <div className="timeline-item__icon">🏢</div>

          <div className="timeline-item__card">
            <span className="timeline-item__date">2018年 - 2020年</span>

            <h3 className="timeline-item__role">ジュニアWeb開発者</h3>

            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="timeline-item__company"
            >
              クリエイティブラボ
            </a>

            <p className="timeline-item__description">
              複数のクライアントプロジェクトでWebサイトと
              アプリケーションの構築を支援。
              新しい技術とベストプラクティスを学習。
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default ExperienceSection;
