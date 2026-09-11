interface MenuOverlayProps {
  onClick: () => void;
}

function MenuOverlay({ onClick }: MenuOverlayProps) {
  return (
    <div
      className="menu-overlay"
      id="menu-overlay"
      onClick={onClick}
      role="presentation"
    ></div>
  );
}

export default MenuOverlay;
