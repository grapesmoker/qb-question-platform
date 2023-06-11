import React from "react";
import { useState } from "react";
import "./global.css";
import styles from "./home.module.css";
// import Editor from "./components/editor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import SetAdmin from "./pages/setAdmin";
import QuestionWriter from "./pages/questionWriter";
import AllQuestions from "./components/allQuestions";

function Home() {
  return <span>kems</span>;
}

function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function App() {
  const [sidebarOpen, setSideBarOpen] = useState(true);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };
  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Geologica:wght,SHRP@100,0;300,0;400,100;700,0&display=swap');
      </style>
      <Router>
        <div className={styles.container}>
          <Navbar className={styles.sideNav} />
          <div className={styles.mainPanel}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/editor" element={<QuestionWriter />} />
              <Route path="/all-questions" element={<AllQuestions />} />
              <Route path="/set-admin" element={<SetAdmin />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
          <Sidebar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
        </div>
      </Router>
    </>
  );
}

export default App;
