import React from "react";

const AuthLayout = ({children})=>{
    return (
        <div className="bg-secondary">
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                    {children}
                    </main>
                </div>
                <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy;</div>
                            
                        </div>
                    </div>
                </footer>
                </div>
            </div>

        </div>
    )
}

export default AuthLayout;