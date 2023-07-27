/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSession, setSession } from "../../session";
import Oauth2Service from "../../services/oauth2";
import moment from "moment";

const Authorized = ({ handleLogout }: any) => {
    const navigate = useNavigate();
    const Oauth2 = new Oauth2Service();

    const [profile, setProfile] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        refreshTokenAndGetProfile();

        window.addEventListener('logout_action', refreshTokenAndGetProfile)

        return () => {
            window.removeEventListener('logout_action', refreshTokenAndGetProfile)
        }
    }, [])

    const refreshTokenAndGetProfile = async () => {
        const session: any = getSession('session');

        try {
            if (!session || !session.is_logged) {
                navigate('/');
                return
            }

            setLoading(true);
            const newTokensResponse: any = await Oauth2.refreshToken();
            const { token } = newTokensResponse.data
            const humanFormat = moment().add(30, 'minutes').format('DD/MM/YYYY HH:mm:ss');
            const userProfileResponse: any = await Oauth2.getProfile(token);

            setProfile({
                ...profile,
                error: false,
                ...userProfileResponse.data,
                userId: session.profile.sub,
                old_token: session.access_token,
                new_token: token,
                refresh_token: session.refresh_token,
                tokenDurationInMinutes: session.tokenDurationInMinutes,
                humanFormat
            })
            setSession('session', { ...session, access_token: token, humanFormat });
            setLoading(false);
        } catch (e: any) {
            setProfile({ ...profile, error: e.message })
            setLoading(false);
        }
    }

    return (
        <div className="container-fluid py-5" style={{ minHeight: '100vh' }}>
            <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                <div className="row justify-content-center align-items-center">
                    <div className="col-12 text-center">
                        <div className="fw-bold mb-3 text-secondary ">Login <span className="text-primary"> GUX </span> Authorized</div>

                        <button className="btn btn-outline-secondary px-5" onClick={handleLogout}>Cerrar Session</button>
                    </div>
                </div>

                {
                    loading ? (
                        <div className="row justify-content-center mt-2">
                            <div className="col-12 text-center">
                                <div className="fw-bold mb-3 text-secondary "> Refrescando token y cargando informacion del perfil... </div>
                            </div>
                        </div>
                    ) : (
                        <div className="div d-flex flex-column mt-5 border p-3" style={{ maxWidth: '600px' }}>
                            <div className="col-12 text-center">
                                <div className="fw-bold mb-3 text-secondary ">Informacion del perfil</div>
                            </div>

                            <div className="col-12" style={{ fontSize: '12px' }}>
                                <div className="fw-bold mb-3 text-secondary ">UserId: <br /> <span className="text-danger">{profile?.userId}</span> </div>
                            </div>

                            <div className="col-12" style={{ fontSize: '12px' }}>
                                <div className="fw-bold mb-3 text-secondary ">Nombre: <br /> <span className="text-danger">{profile?.name}</span> </div>
                            </div>

                            <div className="col-12" style={{ fontSize: '12px' }}>
                                <div className="fw-bold mb-3 text-secondary ">Email: <br /> <span className="text-danger">{profile?.email}</span> </div>
                            </div>

                            <div className="col-12" style={{ fontSize: '12px' }}>
                                <div className="fw-bold mb-3 text-secondary ">Duracion Token: <br /> <span className="text-danger">{profile?.tokenDurationInMinutes} minutos</span> </div>
                            </div>

                            <div className="col-12" style={{ fontSize: '12px' }}>
                                <div className="fw-bold mb-3 text-secondary ">Caduca a las: <br /> <span className="text-danger">{profile?.humanFormat}</span> </div>
                            </div>

                            <div className="col-12" style={{ fontSize: '12px', wordBreak: 'break-all' }}>
                                <div className="fw-bold mb-3 text-secondary ">Token antiguo: <br /> <span className="text-danger">{profile?.old_token}</span> </div>
                            </div>

                            <div className="col-12" style={{ fontSize: '12px', wordBreak: 'break-all' }}>
                                <div className="fw-bold mb-3 text-secondary ">Token nuevo: <br /> <span className="text-danger">{profile?.new_token}</span> </div>
                            </div>

                            <div className="col-12" style={{ fontSize: '12px', wordBreak: 'break-all' }}>
                                <div className="fw-bold mb-3 text-secondary ">Refresh Token: <br /> <span className="text-danger">{profile?.refresh_token}</span> </div>
                            </div>

                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Authorized;