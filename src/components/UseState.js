import React from "react";

const SECURITY_CODE = 'paradigma'

function UseState({name}){
  const [state, setState] = React.useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
  })

  React.useEffect(()=>{
    if (state.loading) {
      setTimeout(() => {
        setState({
          ...state,
          loading: false,
          error: state.value !== SECURITY_CODE,
        })

        if (state.value === SECURITY_CODE) {
          setState({...state, loading: false, confirmed: true})
        }
      }
      ,3000)
    }
  }, [state.loading])

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad</p>
        {state.error && <p>Error: el código es incorrecto</p>}
        {state.loading && <p>Cargando...</p>}
        <input 
          placeholder="Código de seguridad"
          value={state.value}
          onChange={(event)=> setState({...state, value: event.target.value})}
        />
        <button
          onClick={()=> setState({...state, loading: true, error: false})}
        >
          Comprobar
        </button>
      </div>
    )
  } else if (state.confirmed & !state.deleted){
    return (
      <>
        <p>Pedimos confirmación. ¿Estás seguro?</p>
        <button
          onClick={()=>{setState({...state, deleted: true})}}
        >
          Sí, eliminar
        </button>
        <button
          onClick={()=>setState({...state, confirmed: false, value: ''})}
        >
          No, me arrepentí
        </button>
      </>
    )
  } else {
    return (
      <>
        <p>La tarea fue eliminada con éxito</p>      
        <button
          onClick={()=>setState({...state, deleted: false, confirmed: false, value:''})}
        >
          Resetear, volver atrás
        </button>
      </>
    )
  }
}

export {UseState}