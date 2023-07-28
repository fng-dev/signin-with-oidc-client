/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ userManager }: any) => {

    const navigate = useNavigate();

    useEffect(() => {
        _isAuthenticated();
    }, []);

    const _isAuthenticated = async () => {
        const session: any = await userManager.getUser();
        if (session) {
            userManager.signoutRedirect();
            return;
        }

        navigate('/');
    }


    return (
        <div className="container-fluid" style={{ height: '100vh' }}>
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-12 text-center">
                    <div className="fw-bold mb-3 text-secondary ">Finalizando sesion...</div>
                </div>
            </div>
        </div>
    );
}

export default Logout;