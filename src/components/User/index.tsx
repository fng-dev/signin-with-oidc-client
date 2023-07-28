const User = ({ data }: any) => {
    return (
        <div className="div d-flex flex-column my-3 border p-3" style={{ width: '600px' }}>

            <div className="col-12" style={{ fontSize: '12px' }}>
                <div className="fw-bold mb-3 text-secondary ">PK: <br /> <span className="text-danger">{data?.PK}</span> </div>
            </div>

            <div className="col-12" style={{ fontSize: '12px' }}>
                <div className="fw-bold mb-3 text-secondary ">SK: <br /> <span className="text-danger">{data?.SK}</span> </div>
            </div>

            <div className="col-12" style={{ fontSize: '12px' }}>
                <div className="fw-bold mb-3 text-secondary ">Nombre: <br /> <span className="text-danger">{data?.name}</span> </div>
            </div>

            <div className="col-12" style={{ fontSize: '12px' }}>
                <div className="fw-bold mb-3 text-secondary ">Email: <br /> <span className="text-danger">{data?.email}</span> </div>
            </div>

        </div>
    )
}

export default User;