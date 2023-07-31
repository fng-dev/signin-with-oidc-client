/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const FusionAuth = (prosp: any) => {
    const { userManager, authorize, children } = prosp;
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        userManager.getUser()
            .then((user: any) => {
                if (!user) {
                    setLoading(true);
                    authorize();
                    return;
                }
                setLoading(false);
            })
            .catch(() => {
                authorize();
            });
    }, [])

    if (loading) {
        return (
            <div className="container-fluid" style={{ height: '100vh' }}>
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 text-center">
                        <div className="fw-bold mb-3 text-secondary ">Loading...</div>
                    </div>
                </div>
            </div>
        )
    }
    return <>{children}</>
}

export default FusionAuth;