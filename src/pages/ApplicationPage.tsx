import { useRef, useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import SubPageHeader from "../components/SubPageHeader";
import "./ApplicationPage.css";

interface AppCard {
  id: string;
  icon: string;
  iconAlt: string;
  title: string;
  tags: string;
  detailImage: string;
  detailImageAlt: string;
  description: string;
  features: string[];
  actionType: "link" | "modal";
  link?: string;
  modalKey?: "task" | "portfolio";
}

const appCards: AppCard[] = [
  {
    id: "task",
    icon: "/img/リストイラスト.jpg",
    iconAlt: "タスク管理ツールのアイコン画像",
    title: "タスク管理ツール",
    tags: "タスク, 管理, Web",
    detailImage:
      "https://via.placeholder.com/600x300/6366f1/ffffff?text=Task+App",
    detailImageAlt: "タスク管理ツールの画面イメージ",
    description: "日々のタスクをシンプルに管理できるWebアプリです。",
    features: ["進捗管理", "通知機能", "カレンダー表示"],
    actionType: "modal",
    modalKey: "task",
  },
  {
    id: "kakeibo",
    icon: "/img/管理イラスト.jpeg",
    iconAlt: "家計簿アプリのアイコン画像",
    title: "家計簿アプリ",
    tags: "家計簿, 収支管理, グラフ",
    detailImage:
      "https://via.placeholder.com/600x300/8b5cf6/ffffff?text=Kakeibo+App",
    detailImageAlt: "家計簿アプリの画面イメージ",
    description:
      "日々の収入・支出を記録し、グラフで可視化できるアプリです。",
    features: ["収支の履歴管理", "月ごとの絞り込み表示", "CSV出力"],
    actionType: "link",
    link: "/App/kakeibo-app/index.html",
  },
  {
    id: "portfolio",
    icon: "https://via.placeholder.com/128/0ea5e9/ffffff?text=Port",
    iconAlt: "ポートフォリオサイトのアイコン画像",
    title: "ポートフォリオサイト",
    tags: "ポートフォリオ, 自己紹介, デザイン",
    detailImage:
      "https://via.placeholder.com/600x300/0ea5e9/ffffff?text=Portfolio",
    detailImageAlt: "ポートフォリオサイトの画面イメージ",
    description: "制作実績やスキルセットをまとめた自己紹介サイトです。",
    features: ["レスポンシブ対応", "ギャラリー表示", "連絡フォーム"],
    actionType: "modal",
    modalKey: "portfolio",
  },
];

interface ModalContent {
  title: string;
  type: "task" | "portfolio";
}

const modalContents: Record<"task" | "portfolio", ModalContent> = {
  task: {
    title: "タスク管理ツール（顧客情報管理システム）",
    type: "task",
  },
  portfolio: {
    title: "ポートフォリオサイト",
    type: "portfolio",
  },
};

function ApplicationPage() {
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const [modalKey, setModalKey] = useState<"task" | "portfolio" | null>(null);
  const detailRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleCardClick = (cardId: string): void => {
    if (openCardId === cardId) {
      setOpenCardId(null);
      return;
    }
    setOpenCardId(cardId);
  };

  const getDetailMaxHeight = (cardId: string): string => {
    if (openCardId !== cardId) {
      return "0px";
    }
    const detailElement = detailRefs.current[cardId];
    if (!detailElement) {
      return "0px";
    }
    return `${detailElement.scrollHeight + 48}px`;
  };

  const handleModalOpen = (
    event: MouseEvent<HTMLButtonElement>,
    key: "task" | "portfolio"
  ): void => {
    event.preventDefault();
    event.stopPropagation();
    setModalKey(key);
  };

  const handleModalClose = (): void => {
    setModalKey(null);
  };

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      handleModalClose();
    }
  };

  const currentModal = modalKey ? modalContents[modalKey] : null;

  return (
    <div className="application-page">
      <SubPageHeader title="アプリ開発" />

      <main className="main">
        <h1 className="section-title">自作アプリギャラリー</h1>
        <p className="section-desc">
          多様な言語を使用したアプリ開発の制作物です。
        </p>

        <div className="cards">
          {appCards.map((card) => (
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
                <img src={card.icon} alt={card.iconAlt} />
                <div>
                  <div className="card-title">{card.title}</div>
                  <div className="card-tags">{card.tags}</div>
                </div>
              </div>
              <div
                className={`card-detail ${openCardId === card.id ? "open" : ""}`}
                ref={(element) => {
                  detailRefs.current[card.id] = element;
                }}
                style={{ maxHeight: getDetailMaxHeight(card.id) }}
              >
                <img src={card.detailImage} alt={card.detailImageAlt} />
                <h2>{card.title}</h2>
                <p>{card.description}</p>
                <ul>
                  {card.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <p className="tag-line">
                  <strong>タグ:</strong> {card.tags}
                </p>
                {card.actionType === "link" && card.link && (
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {card.id === "task" ? "アプリを開く" : "サイトを見る"}{" "}
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                )}
                {card.actionType === "modal" && card.modalKey && (
                  <button
                    type="button"
                    className="btn-view"
                    onClick={(event) => {
                      if (card.modalKey) {
                        handleModalOpen(event, card.modalKey);
                      }
                    }}
                  >
                    見る <i className="fa-solid fa-terminal"></i>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <div
        className={`cmd-modal-overlay ${modalKey ? "is-open" : ""}`}
        id="cmd-modal-overlay"
        aria-hidden={modalKey ? "false" : "true"}
        onClick={handleOverlayClick}
      >
        <div
          className="cmd-modal"
          id="cmd-modal"
          role="dialog"
          aria-labelledby="cmd-modal-title"
        >
          {currentModal && (
            <>
              <h3 id="cmd-modal-title">{currentModal.title}</h3>
              <div id="cmd-modal-body">
                {currentModal.type === "task" && (
                  <>
                    <p>
                      このアプリを起動するには、ターミナルで以下を実行してください。
                    </p>
                    <pre>{`cd App/管理アプリ\nnpm install\nnpm run dev`}</pre>
                    <p>
                      起動後、ブラウザで{" "}
                      <strong>http://localhost:5173</strong>{" "}
                      を開いてください。
                    </p>
                  </>
                )}
                {currentModal.type === "portfolio" && (
                  <>
                    <p>
                      このサイトがポートフォリオです。トップページを開くには下のボタンをクリックしてください。
                    </p>
                    <Link to="/" className="cmd-modal-link">
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>{" "}
                      トップを開く
                    </Link>
                  </>
                )}
              </div>
            </>
          )}
          <button
            type="button"
            className="cmd-modal-close"
            id="cmd-modal-close"
            onClick={handleModalClose}
          >
            <i className="fa-solid fa-times"></i> 閉じる
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationPage;
