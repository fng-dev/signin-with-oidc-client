/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { getSession, setSession } from "../../session";
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const session = getSession('session');
    const navigate = useNavigate();
    useEffect(() => {
        setSession('session', null);
        navigate('/');
    }, [session]);


    return (
        <div className="container-fluid" style={{ height: '100vh' }}>
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-12 text-center">
                    <div className="fw-bold mb-3 text-secondary ">Session finalizada con exito...</div>
                </div>
            </div>
        </div>
    );
}

export default Logout;