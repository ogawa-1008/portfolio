import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WebDesignPage from "./pages/WebDesignPage";
import ApplicationPage from "./pages/ApplicationPage";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/webサイト" element={<WebDesignPage />} />
      <Route path="/アプリケーション" element={<ApplicationPage />} />
      <Route path="/ゲーム紹介" element={<GamePage />} />
    </Routes>
  );
}

export default App;
