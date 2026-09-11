import { Link } from "react-router-dom";

function ProjectsSection() {
  return (
    <section className="projects" id="projects">
      <h2>プロジェクト</h2>

      <div className="project-grid">
        <Link to="/webサイト" className="card">
          <img
            src="/img/isometric-illust-945x556.png"
            alt="Webデザインの紹介画像"
          />
          <div className="card-body">
            <h3>Webデザイン</h3>
            <p>figma/XDを使用したさまざまなデザイン</p>
          </div>
        </Link>

        <Link to="/アプリケーション" className="card">
          <img
            src="/img/mobile-app-development-company-8379091_1440_2560.png"
            alt="アプリ開発の紹介画像"
          />
          <div className="card-body">
            <h3>アプリ開発</h3>
            <p>多様な言語を使用したアプリ開発</p>
          </div>
        </Link>

        <Link to="/ゲーム紹介" className="card">
          <img
            src="/img/AdobeStock_229737620-900x600.jpeg"
            alt="ゲーム開発の紹介画像"
          />
          <div className="card-body">
            <h3>ゲーム開発</h3>
            <p>unityを使用した簡易的なゲーム開発</p>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default ProjectsSection;
