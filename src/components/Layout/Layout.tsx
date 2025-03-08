import * as React from "react";
import NavBar from '../NavBar/NavBar.tsx';


const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <>
            <header className="mb-5">
                <NavBar />
            </header>
            <main className="container">
                {children}
            </main>
        </>
    );
};

export default Layout;