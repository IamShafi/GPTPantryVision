import React from "react";
import Navbar from "../components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Navbar />
        {children}
      </div>
    </main>
  );
};

export default Layout;
