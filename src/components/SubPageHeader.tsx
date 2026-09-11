import { Link } from "react-router-dom";

interface SubPageHeaderProps {
  title: string;
}

function SubPageHeader({ title }: SubPageHeaderProps) {
  return (
    <header className="page-header">
      <Link to="/" className="back-btn">
        <i className="fa-solid fa-arrow-left"></i> 戻る
      </Link>
      <span className="page-title">{title}</span>
      <span style={{ width: "80px" }}></span>
    </header>
  );
}

export default SubPageHeader;
