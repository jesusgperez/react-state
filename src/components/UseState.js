import React from "react";

const SECURITY_CODE = 'paradigma'

function UseState({name}){
    const [value, setValue] = React.useState('')
    const [error, setError] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(()=>{
        if (loading) {
            setTimeout(() => {
                setLoading(false)
                value !== SECURITY_CODE ? setError(true) : setError(false)
            }
            ,3000)
        }
    }, [loading])

    return (
        <div>
            <h2>Eliminar UseState {name}</h2>
            <p>Por favor, escribe el código de seguridad</p>
            {error && <p>Error: el código es incorrecto</p>}
            {loading && <p>Cargando...</p>}
            <input 
                placeholder="Código de seguridad"
                value={value}
                onChange={(event)=>{
                    setValue(event.target.value)
                }}
            />
            <button
                onClick={()=> {
                    setLoading(!loading)
                    setError(false)
                }}
            >Comprobar</button>
        </div>
    )
}

export {UseState}