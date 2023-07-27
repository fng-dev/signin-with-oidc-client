/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSession } from "../../session";

const SignIn = ({ handleLogin, history }: any) => {
    const navigate = useNavigate();
    const session: any = getSession('session');

    useEffect(() => {
        if (session?.is_logged) {
            navigate('/authorized');
        }
    }, [])

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