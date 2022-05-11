import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const ChapterView = lazy(() => import("./pages/ChapterView"));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chapter/:id" element={<ChapterView />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;
