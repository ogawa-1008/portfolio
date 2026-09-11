import { useRef, useState } from "react";
import SubPageHeader from "../components/SubPageHeader";
import "./WebDesignPage.css";

interface WebCard {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  link: string;
  external?: boolean;
}

const webCards: WebCard[] = [
  {
    id: "task",
    image: "https://via.placeholder.com/600x400/6366f1/ffffff?text=Task+App",
    imageAlt: "タスク管理ツール",
    title: "タスク管理ツール",
    description:
      "日々のタスクをシンプルに管理できるWebアプリです。操作性と視認性を重視しました。",
    link: "/アプリケーション",
    external: false,
  },
  {
    id: "learning",
    image: "https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Learning",
    imageAlt: "学習記録アプリ",
    title: "学習記録アプリ",
    description: "学習内容を記録し、進捗をグラフで可視化できます。",
    link: "/App/kakeibo-app/index.html",
    external: true,
  },
  {
    id: "portfolio",
    image: "https://via.placeholder.com/600x400/0ea5e9/ffffff?text=Portfolio",
    imageAlt: "ポートフォリオサイト",
    title: "ポートフォリオサイト",
    description: "制作実績やスキルセットをまとめた自己紹介サイトです。",
    link: "/",
    external: false,
  },
];

function WebDesignPage() {
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const detailRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleCardClick = (cardId: string): void => {
    if (openCardId === cardId) {
      setOpenCardId(null);
      return;
    }
    setOpenCardId(cardId);
  };

  const getDetailHeight = (cardId: string): string => {
    if (openCardId !== cardId) {
      return "0px";
    }
    const detailElement = detailRefs.current[cardId];
    if (!detailElement) {
      return "0px";
    }
    return `${detailElement.scrollHeight}px`;
  };

  return (
    <div className="web-design-page">
      <SubPageHeader title="Webデザイン" />

      <main className="main">
        <h1 className="section-title">自作Webサイト一覧</h1>
        <p className="section-desc">
          figma/XDを使用したさまざまなデザイン制作物です。
        </p>

        <div className="cards">
          {webCards.map((card) => (
            <div key={card.id} className="card">
              <div
                className="card-header"
                onClick={() => handleCardClick(card.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleCardClick(card.id);
                  }
                }}
              >
                <img src={card.image} alt={card.imageAlt} />
                <div className="card-body">
                  <div className="card-title">{card.title}</div>
                </div>
              </div>
              <div
                className="card-detail"
                ref={(element) => {
                  detailRefs.current[card.id] = element;
                }}
                style={{ height: getDetailHeight(card.id) }}
              >
                <p>{card.description}</p>
                <a
                  href={card.link}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                >
                  サイトを見る{" "}
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default WebDesignPage;
