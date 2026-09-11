interface TopButtonProps {
  visible: boolean;
}

function TopButton({ visible }: TopButtonProps) {
  const handleClick = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      id="top-button"
      type="button"
      className={visible ? "show" : ""}
      aria-label="トップへ戻る"
      onClick={handleClick}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
}

export default TopButton;
