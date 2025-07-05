import React from "react";
import { Routes, Route } from "react-router-dom";
import ShortenerForm from "./components/ShortenerForm";
import Statistics from "./components/Statistics";
import RedirectHandler from "./components/RedirectHandler";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ShortenerForm />} />
      <Route path="/stats" element={<Statistics />} />
      <Route path="/:shortcode" element={<RedirectHandler />} />
    </Routes>
  );
}

export default App;
