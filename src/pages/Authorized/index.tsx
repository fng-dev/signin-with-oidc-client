/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import UsersService from "../../services/users.service";
import User from "../../components/User";

const Authorized = ({ handleLogout, userManager }: any) => {
    const navigate = useNavigate();
    const Users = new UsersService(userManager);

    const [profile, setProfile] = useState<any>({});
    const [users, setUsers] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        _handleLoadData();

        window.addEventListener('logout_action', _handleLoadData)

        return () => {
            window.removeEventListener('logout_action', _handleLoadData)
        }
    }, [])

    const _handleLoadData = async () => {

        try {
            setLoading(true);

            const session: any = await userManager.getUser();

            if (!session) {
                navigate('/');
                return
            }

            const expires_at = moment(parseInt(session.expires_at) * 1000);
            const humanFormat = expires_at.format('DD/MM/YYYY HH:mm:ss');

            setProfile({ ...session, humanFormat });

            const usersResponse = await Users.getUsers();
            setUsers(usersResponse.data.items)

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
                        <>
                            <div className="div d-flex flex-column mt-5 border p-3" style={{ maxWidth: '600px' }}>
                                <div className="col-12 text-center">
                                    <div className="fw-bold mb-3 text-secondary ">Informacion del perfil</div>
                                </div>

                                <div className="col-12" style={{ fontSize: '12px' }}>
                                    <div className="fw-bold mb-3 text-secondary ">UserId: <br /> <span className="text-danger">{profile?.userId}</span> </div>
                                </div>

                                <div className="col-12" style={{ fontSize: '12px' }}>
                                    <div className="fw-bold mb-3 text-secondary ">Nombre: <br /> <span className="text-danger">{profile?.profile?.name}</span> </div>
                                </div>

                                <div className="col-12" style={{ fontSize: '12px' }}>
                                    <div className="fw-bold mb-3 text-secondary ">Email: <br /> <span className="text-danger">{profile?.profile?.email}</span> </div>
                                </div>

                                <div className="col-12" style={{ fontSize: '12px' }}>
                                    <div className="fw-bold mb-3 text-secondary ">Caduca a las: <br /> <span className="text-danger">{profile?.humanFormat}</span> </div>
                                </div>

                                <div className="col-12" style={{ fontSize: '12px', wordBreak: 'break-all' }}>
                                    <div className="fw-bold mb-3 text-secondary ">Access Token: <br /> <span className="text-danger">{profile?.access_token}</span> </div>
                                </div>

                                <div className="col-12" style={{ fontSize: '12px', wordBreak: 'break-all' }}>
                                    <div className="fw-bold mb-3 text-secondary ">Refresh Token: <br /> <span className="text-danger">{profile?.refresh_token}</span> </div>
                                </div>

                            </div>

                            <div className="col-12 text-center mb-2 mt-5 text-secondary fw-bold">
                                Usuarios api externa
                            </div>

                            {users && users.map((user: any) => (
                                <User data={user} key={user.PK} />
                            ))}
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default Authorized;