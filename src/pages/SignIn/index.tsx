/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({ handleLogin, userManager }: any) => {
    const navigate = useNavigate();
    

    useEffect(() => {
        _isAuthenticated();
    }, [])

    const _isAuthenticated = async () => {
        const session: any = await userManager();
        if (session) {
            navigate('/authorized');
        }
    }

    return (
        <div className="container-fluid" style={{ height: '100vh' }}>
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-10 p-5 col-md-3 border border-2 rounded text-center">
                    <div className="fw-bold mb-3 text-secondary">Login <span className="text-primary"> GUX </span> OpenID</div>
                    <button className="btn btn-outline-secondary px-5" onClick={handleLogin}>Entrar</button>
                </div>
            </div>
        </div>
    );
}

export default SignIn;