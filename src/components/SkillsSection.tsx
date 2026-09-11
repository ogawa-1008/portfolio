function SkillsSection() {
  return (
    <section className="skills-section" id="skills">
      <h2 className="skills-header">
        <span>スキル＆専門分野</span>
      </h2>

      <div className="skills-grid">
        <article className="skill-card">
          <div className="skill-card__icon skill-icon--blue">&lt;/&gt;</div>
          <h3 className="skill-card__title">フロントエンド開発</h3>
          <div className="skill-tags">
            <span className="skill-tag">React</span>
            <span className="skill-tag">Next.js</span>
            <span className="skill-tag">TypeScript</span>
            <span className="skill-tag">JavaScript</span>
            <span className="skill-tag">HTML/CSS</span>
            <span className="skill-tag">Tailwind CSS</span>
          </div>
        </article>

        <article className="skill-card">
          <div className="skill-card__icon skill-icon--green">DB</div>
          <h3 className="skill-card__title">バックエンド開発</h3>
          <div className="skill-tags">
            <span className="skill-tag">Node.js</span>
            <span className="skill-tag">Express</span>
            <span className="skill-tag">PostgreSQL</span>
            <span className="skill-tag">MongoDB</span>
            <span className="skill-tag">REST API</span>
            <span className="skill-tag">GraphQL</span>
          </div>
        </article>

        <article className="skill-card">
          <div className="skill-card__icon skill-icon--purple">🎨</div>
          <h3 className="skill-card__title">UI/UXデザイン</h3>
          <div className="skill-tags">
            <span className="skill-tag">Figma</span>
            <span className="skill-tag">Adobe XD</span>
            <span className="skill-tag">Sketch</span>
            <span className="skill-tag">デザインシステム</span>
            <span className="skill-tag">プロトタイピング</span>
            <span className="skill-tag">ユーザーリサーチ</span>
          </div>
        </article>

        <article className="skill-card">
          <div className="skill-card__icon skill-icon--orange">📱</div>
          <h3 className="skill-card__title">モバイル開発</h3>
          <div className="skill-tags">
            <span className="skill-tag">React Native</span>
            <span className="skill-tag">Flutter</span>
            <span className="skill-tag">iOS</span>
            <span className="skill-tag">Android</span>
            <span className="skill-tag">レスポンシブデザイン</span>
          </div>
        </article>

        <article className="skill-card">
          <div className="skill-card__icon skill-icon--indigo">☁️</div>
          <h3 className="skill-card__title">クラウド &amp; DevOps</h3>
          <div className="skill-tags">
            <span className="skill-tag">AWS</span>
            <span className="skill-tag">Google Cloud</span>
            <span className="skill-tag">Docker</span>
            <span className="skill-tag">Kubernetes</span>
            <span className="skill-tag">CI/CD</span>
            <span className="skill-tag">Vercel</span>
          </div>
        </article>

        <article className="skill-card">
          <div className="skill-card__icon skill-icon--yellow">🔧</div>
          <h3 className="skill-card__title">ツール &amp; その他</h3>
          <div className="skill-tags">
            <span className="skill-tag">Git</span>
            <span className="skill-tag">GitHub</span>
            <span className="skill-tag">VS Code</span>
            <span className="skill-tag">Jira</span>
            <span className="skill-tag">Agile</span>
            <span className="skill-tag">テスト駆動開発</span>
          </div>
        </article>
      </div>
    </section>
  );
}

export default SkillsSection;
