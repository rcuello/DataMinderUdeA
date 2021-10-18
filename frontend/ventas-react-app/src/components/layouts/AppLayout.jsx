import React from 'react';
import Header from "../header/Header";
import Menu from "../menu/Menu";


const AppLayout = ({children}) => {
    return (
        <div  className="sb-nav-fixed">
            
            <Header />

            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Menu></Menu>
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default AppLayout;
