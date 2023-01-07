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

  const onConfirm = () => {
    setState({
      ...state,
      loading: false,
      error: state.value !== SECURITY_CODE,
    })
  }

  const passCode = () => {
    setState({...state, loading: false, confirmed: true})
  }

  const inputWrite = (event) => {
    setState({...state, value: event.target.value})
  }

  const onCheck = () => {
    setState({...state, loading: true, error: false})
  }

  const onDelete = () => {
    setState({...state, deleted: true})
  }

  const onReset = () => {
    setState({...state, deleted: false, confirmed: false, value:''})
  }

  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        onConfirm()
        if (state.value === SECURITY_CODE) {
          passCode()
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
          onChange={(event)=> inputWrite(event)}
        />
        <button
          onClick={()=> onCheck()}
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
          onClick={()=> onDelete()}
        >
          Sí, eliminar
        </button>
        <button
          onClick={()=> onReset()}
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
          onClick={()=> onReset()}
        >
          Resetear, volver atrás
        </button>
      </>
    )
  }
}

export {UseState}