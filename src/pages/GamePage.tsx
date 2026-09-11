import { useState } from "react";
import { Link } from "react-router-dom";
import SubPageHeader from "../components/SubPageHeader";
import "./GamePage.css";

interface GameCard {
  id: string;
  image: string;
  fallbackImage: string;
  imageAlt: string;
  title: string;
  description: string;
  tags: string[];
  buttonText: string;
  buttonIcon: string;
}

const gameCards: GameCard[] = [
  {
    id: "super-jump",
    image: "/img/AdobeStock_229737620-900x600.jpeg",
    fallbackImage:
      "https://via.placeholder.com/560x320/6366f1/ffffff?text=Super+Jump+Hero",
    imageAlt: "スーパージャンプヒーローの紹介画像",
    title: "スーパージャンプヒーロー",
    description:
      "ジャンプとダッシュを駆使してステージを攻略する、シンプルだけど奥深い2Dアクションゲーム！",
    tags: ["2D", "アクション", "Unity"],
    buttonText: "プレイ情報を見る",
    buttonIcon: "fa-solid fa-play",
  },
  {
    id: "mystery-puzzle",
    image: "/img/isometric-illust-945x556.png",
    fallbackImage:
      "https://via.placeholder.com/560x320/8b5cf6/ffffff?text=Mystery+Puzzle",
    imageAlt: "ミステリーパズルの紹介画像",
    title: "ミステリーパズル",
    description:
      "頭を使って謎を解くステージクリア型パズルゲーム。じっくり考えるのが好きな人におすすめ！",
    tags: ["パズル", "カジュアル", "Unity"],
    buttonText: "詳細を見る",
    buttonIcon: "fa-solid fa-circle-info",
  },
];

function GameImage({
  src,
  fallback,
  alt,
}: {
  src: string;
  fallback: string;
  alt: string;
}) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <img
      className="game-card__img"
      src={imageSrc}
      alt={alt}
      onError={() => setImageSrc(fallback)}
    />
  );
}

function GamePage() {
  return (
    <div className="game-page">
      <SubPageHeader title="ゲーム開発" />

      <main className="main">
        <h1 className="section-title">オリジナルゲーム紹介</h1>
        <p className="section-desc">Unityで制作した2Dゲームを紹介します</p>

        <div className="game-list">
          {gameCards.map((game) => (
            <section key={game.id} className="game-card">
              <GameImage
                src={game.image}
                fallback={game.fallbackImage}
                alt={game.imageAlt}
              />
              <div className="game-card__body">
                <h2 className="game-card__title">{game.title}</h2>
                <p className="game-card__desc">{game.description}</p>
                <div className="game-card__tags">
                  {game.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <Link to="/#projects" className="play-btn">
                  <i className={game.buttonIcon}></i> {game.buttonText}
                </Link>
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="footer">© 2026 Ogawa Game Studio</footer>
    </div>
  );
}

export default GamePage;
