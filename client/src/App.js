import React from "react";
import { useState } from "react";
import "./global.css";
import styles from "./home.module.css";
// import Editor from "./components/editor";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import SetAdmin from "./pages/setAdmin";
import QuestionWriter from "./pages/questionWriter";
import AllQuestions from "./components/allQuestions";
import SlateEditor from "./components/slateEditor";
import Packetizing from "./components/packetizingView";
import LoginPage from "./pages/loginPage";

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
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  const AppLayout = () => (
    <>
      <div className={styles.container}>
        <Navbar className={styles.sideNav} />
        <main>
          <div className={styles.mainPanel}>
            <Outlet />
          </div>
        </main>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
      </div>
    </>
  );

  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Geologica:wght,SHRP@100,0;300,0;400,100;700,0&display=swap');
      </style>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/editor" element={<QuestionWriter />} />
            <Route path="/all-questions" element={<AllQuestions />} />
            <Route path="/set-admin" element={<SetAdmin />} />
            <Route path="/slate" element={<SlateEditor />} />
            <Route path="/packetizing" element={<Packetizing />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
