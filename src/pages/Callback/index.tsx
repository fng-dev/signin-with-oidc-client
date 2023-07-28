/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = ({ userManager }: any) => {

  const navigate: any = useNavigate();

  useEffect(() => {
    _handleLogin();

    window.addEventListener('reload_page', _handleLogin);

    return () => {
      window.removeEventListener('reload_page', _handleLogin);
    }

  }, []);

  const _handleLogin = async () => {
    const session = await userManager.getUser();

    if (session) {
      navigate('/authorized');
      return;
    }

    userManager
      .signinRedirectCallback()
      .then(() => {
        navigate('/authorized');
      })
      .catch(() => {
        userManager.signoutRedirect();
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