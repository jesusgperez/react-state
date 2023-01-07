import React from "react";
import { Loading } from "./Loading";

const SECURITY_CODE = 'paradigma'

class ClassState extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      error: false,
      loading: false
    }
  }

    // UNSAFE_componentWillMount(){
    //     console.log('componentWillMount')
    // }
    // componentDidMount(){
    //     console.log('componentDidMount')
    // }

  componentDidUpdate(){
    if (this.state.loading) {
      setTimeout(() => {
        this.setState({loading: false})
        this.setState({error: this.state.value !== SECURITY_CODE})
      },3000)
    }
  }

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor, escribe el código de seguridad</p>
        {this.state.error && <p>Error: el código es incorrecto</p>}
        {this.state.loading && <Loading/>}
        <input 
          placeholder="Código de seguridad"
          value={this.state.value}
          onChange={(event) => {
            this.setState({value: event.target.value
          })
        }}
        />
        <button
          onClick={()=>{this.setState({loading: true, error: false})}}
        >
          Comprobar
        </button>
      </div>
    )
  }
}

export {ClassState}