/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { getSession, setSession } from "../../session";
import Oauth2Service from "../../services/oauth2";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Callback = ({ userManager }: any) => {

  const navigate: any = useNavigate();
  const Oauth2 = new Oauth2Service();

  useEffect(() => {
    _handleLogin();

    window.addEventListener('reload_page', _handleLogin);

    return () => {
      window.removeEventListener('reload_page', _handleLogin);
    }

  }, []);

  const _handleLogin = async () => {
    const session = getSession('session');

    if (session?.is_logged) {
      navigate('/authorized');
      return;
    }

    userManager
      .signinRedirectCallback()
      .then(async (user: any, data:any) => {
        if (user) {

          console.log(data)
          const access_token = user.access_token;
          const userProfileResponse: any = await Oauth2.getProfile(access_token);
          const expires_at = moment(parseInt(user.expires_at) * 1000);
          
          const tokenDuration = moment.duration(expires_at.diff(moment()));
          const tokenDurationInMinutes = tokenDuration.asMinutes();

          const humanFormat = expires_at.format('DD/MM/YYYY HH:mm:ss');
          
          setSession('session', { is_logged: true, ...user, tokenDurationInMinutes: Math.round(tokenDurationInMinutes), humanFormat, profile: { ...user?.profile, ...userProfileResponse.data } });

        } else {
          setSession('session', null);
        }
      })
      .catch(() => {
        setSession('session', null);
      });
  }

  return (
    <div className="container-fluid" style={{ height: '100vh' }}>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-12 text-center">
          <div className="fw-bold mb-3 text-secondary ">Cargando informacion del perfil...</div>
        </div>
      </div>
    </div>
  );
}

export default Callback;