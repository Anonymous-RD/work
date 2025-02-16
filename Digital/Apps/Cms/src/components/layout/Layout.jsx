import React from "react";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import Header from "../../components/common/Header/Header";

const Layout = ({ children }) => {
    return (
        <div className="layout-wrapper">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="main-content h-screen">
                {/* Header */}
                <Header />
                {children}
            </main>
        </div>
    );
};

export default Layout;