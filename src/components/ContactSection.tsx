import { FormEvent } from "react";

function ContactSection() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <section className="contact" id="contact">
      <header className="contact__header">
        <h2 className="contact__title">お問い合わせ</h2>
        <p className="contact__subtitle">
          質問やプロジェクトのアイデアがありますか？
          お気軽にご連絡ください！
        </p>
      </header>

      <div className="contact__container">
        <div className="contact-info">
          <h3 className="contact-info__title">連絡先情報</h3>

          <div className="contact-info__item">
            <div className="contact-info__icon">✉️</div>
            <div className="contact-info__content">
              <span className="contact-info__label">メール</span>
              <span className="contact-info__value">contact@example.com</span>
            </div>
          </div>

          <div className="contact-info__item">
            <div className="contact-info__icon">📞</div>
            <div className="contact-info__content">
              <span className="contact-info__label">電話</span>
              <span className="contact-info__value">+81 90-1234-5678</span>
            </div>
          </div>

          <div className="contact-info__item">
            <div className="contact-info__icon">📍</div>
            <div className="contact-info__content">
              <span className="contact-info__label">住所</span>
              <span className="contact-info__value">東京、日本</span>
            </div>
          </div>

          <div className="contact-hours">
            <h4 className="contact-hours__title">稼働時間</h4>

            <div className="contact-hours__row">
              <span>月曜日 - 金曜日:</span>
              <span>9:00 - 18:00</span>
            </div>

            <div className="contact-hours__row">
              <span>土曜日:</span>
              <span>10:00 - 14:00</span>
            </div>

            <div className="contact-hours__row">
              <span>日曜日:</span>
              <span>休業</span>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form__field">
            <label className="contact-form__label">お名前</label>
            <input
              type="text"
              className="contact-form__input"
              placeholder="山田太郎"
            />
          </div>

          <div className="contact-form__field">
            <label className="contact-form__label">メールアドレス</label>
            <input
              type="email"
              className="contact-form__input"
              placeholder="your.email@example.com"
            />
          </div>

          <div className="contact-form__field">
            <label className="contact-form__label">件名</label>
            <input
              type="text"
              className="contact-form__input"
              placeholder="お問い合わせ内容"
            />
          </div>

          <div className="contact-form__field">
            <label className="contact-form__label">メッセージ</label>
            <textarea
              className="contact-form__textarea"
              placeholder="メッセージをお書きください..."
            ></textarea>
          </div>

          <button type="submit" className="contact-form__button">
            メッセージを送信
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactSection;
