import React from 'react';
import {TechnicianSidebar} from "./TechnicianSidebar.tsx";
import TechnicianHeader from "./TechnicianHeader.tsx";
import {Footer} from "./Footer.tsx";
import "./layout.css"

interface LayoutProps {
    children: React.ReactNode;
    activeItem?: string;
}

export const TechnicianLayout: React.FC<LayoutProps> = ({ children, activeItem }) => {
    return (
        <div className="app-wrapper">
            <div className="tech-layout-container">
                <TechnicianSidebar activeItem={activeItem} />

                <div className="tech-main-wrapper">
                    <TechnicianHeader />
                    <main className="tech-content-area">
                        {children}
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TechnicianLayout;