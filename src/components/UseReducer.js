import React from "react";

const SECURITY_CODE = 'paradigma'

function UseReducer({name}){
  const [state, dispatch] = React.useReducer(reducer, initialState)

  // const onConfirm = () => {
  //   setState({
  //     ...state,
  //     loading: false,
  //     error: state.value !== SECURITY_CODE,
  //   })
  // }

  // const passCode = () => {
  //   setState({...state, loading: false, confirmed: true})
  // }

  // const inputWrite = (event) => {
  //   setState({...state, value: event.target.value})
  // }

  // const onCheck = () => {
  //   setState({...state, loading: true, error: false})
  // }

  // const onDelete = () => {
  //   setState({...state, deleted: true})
  // }

  // const onReset = () => {
  //   setState({...state, deleted: false, confirmed: false, value:''})
  // }

  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        dispatch({type: 'CONFIRM'})
        if (state.value === SECURITY_CODE) {
          dispatch({type: 'PASS'})
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
          onChange={(event)=> dispatch({type: 'WRITE', payload: {inputValue: event.target.value}})}
        />
        <button
          onClick={()=> dispatch({type: 'CHECK'})}
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
          onClick={()=> dispatch({type: 'DELETE'})}
        >
          Sí, eliminar
        </button>
        <button
          onClick={()=> dispatch({type: 'RESET'})}
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
          onClick={()=> dispatch({type: 'RESET'})}
        >
          Resetear, volver atrás
        </button>
      </>
    )
  }
}

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false
}

const reducerObject = (state, payload={}) => ({
  'ERROR': {
    ...state,
    error: true,
    loading: false
  },
  'CHECK': {
    ...state,
    loading: true
  },
  'CONFIRM': {
    ...state,
    loading: false,
    error: state.value !== SECURITY_CODE,
  },
  'PASS': {
    ...state,
    loading: false,
    confirmed: true
  },
  'WRITE': {
    ...state,
    value: payload.inputValue
  },
  'DELETE': {
    ...state,
    deleted: true
  },
  'RESET': {
    ...state,
    deleted: false,
    confirmed: false,
    value:''
  }
})

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]){
    return reducerObject(state, action.payload)[action.type]
  }
  return state
}

export {UseReducer}