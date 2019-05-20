import React, { Component } from 'react'
import Cuartos from './Cuartos'
import Semifinal from './Semifinal'
import Final from './Final'



export default class Prode extends Component {

  constructor() {
    super();
    //Initialize the state in the constructor
    this.state = {
      equipos: [],
      partidoCuartos: [],
      resultados: {
        resultado_equipo1_partido0: "",
        resultado_equipo2_partido0: "",
        resultado_equipo1_partido1: "",
        resultado_equipo2_partido1: "",
        resultado_equipo1_partido2: "",
        resultado_equipo2_partido2: "",
        resultado_equipo1_partido3: "",
        resultado_equipo2_partido3: "",
        resultado_equipo1_partido4: "",
        resultado_equipo2_partido4: "",
        resultado_equipo1_partido5: "",
        resultado_equipo2_partido5: "",
        resultado_equipo1_partido6: "",
        resultado_equipo2_partido6: "",
      },
      resultadosBotones: {
        ganador_equipo1_partido0: false,
        ganador_equipo2_partido0: false,
        ganador_equipo1_partido1: false,
        ganador_equipo2_partido1: false,
        ganador_equipo1_partido2: false,
        ganador_equipo2_partido2: false,
        ganador_equipo1_partido3: false,
        ganador_equipo2_partido3: false,
        ganador_equipo1_partido4: false,
        ganador_equipo2_partido4: false,
        ganador_equipo1_partido5: false,
        ganador_equipo2_partido5: false,
        ganador_equipo1_partido6: false,
        ganador_equipo2_partido6: false,
      },
      ganadoresCuartos: {
        ganador_partido1: "Ganador partido 1",
        ganador_partido2: "Ganador partido 2",
        ganador_partido3: "Ganador partido 3",
        ganador_partido4: "Ganador partido 4",
      },
      ganadoresSemifinales: {
        ganador_semifinal1: "Ganador semifinal 1",
        ganador_semifinal2: "Ganador semifinal 2"
      }
    }
  }

  componentDidMount() {
    //Get equipos
    fetch('http://localhost:8000/equipos')
      .then(response => {
        return response.json();
      })
      .then(equipos => {
        this.setState({ equipos });
      });
    //Check local storage
    const resultadosEnLS = localStorage.getItem('resultados');
    if (resultadosEnLS) {
      var resultados = JSON.parse(resultadosEnLS);
      this.setState({ resultados });
    }
    const ganadoresCuartosEnLS = localStorage.getItem('ganadoresCuartos');
    if (ganadoresCuartosEnLS) {
      var ganadoresCuartos = JSON.parse(ganadoresCuartosEnLS);
      this.setState({ ganadoresCuartos });
    }
    const ganadoresSemifinalesEnLS = localStorage.getItem('ganadoresSemifinales');
    if (ganadoresSemifinalesEnLS) {
      var ganadoresSemifinales = JSON.parse(ganadoresSemifinalesEnLS);
      this.setState({ ganadoresSemifinales });
    }
  }

  handleChanges = (event) => {
    let id = event.target.id;
    let value = event.target.value;
    let resultados = { ...this.state.resultados };
    let resultado = { ...resultados[id] };
    resultado = value;
    resultados[id] = resultado;

    this.setState({ resultados });
  }

  desactivarBoton = (id,id2) => {
    let resultadosBotones = { ...this.state.resultadosBotones };
    let resultado = { ...resultadosBotones[id] };
    resultado = false;
    resultadosBotones[id] = resultado;
    this.setState({ resultadosBotones }, () => {
      resultadosBotones = { ...this.state.resultadosBotones };
      let resultado2 = { ...resultadosBotones[id2] };
      resultado2 = false;
      console.log(id2);
      resultadosBotones[id2] = resultado2;
      this.setState({ resultadosBotones });
    });
    return false;
  }

  actualizarResultadosBotones = (event) => {
    let idActual = event.target.id;
    let idButtonDesactivado = this.obtenerIdDesactivado(idActual);
    let resultadosBotones = { ...this.state.resultadosBotones };
    let resultado = { ...resultadosBotones[idActual] };
    resultado = true;
    resultadosBotones[idActual] = resultado;
    this.setState({ resultadosBotones },
      () => this.actualizarResultadosDesactivado(idButtonDesactivado));
  }

  actualizarResultadosDesactivado(idButtonDesactivado) {
    console.log(idButtonDesactivado);
    let resultadosBotones = { ...this.state.resultadosBotones };
    let resultado = { ...resultadosBotones[idButtonDesactivado] };
    resultado = false;
    resultadosBotones[idButtonDesactivado] = resultado;
    this.setState({ resultadosBotones });
  }

  obtenerIdDesactivado = (idAnterior) => {
    let resultadosBotones = { ...this.state.resultadosBotones };
    var keysBotones = Object.keys(resultadosBotones);
    if (keysBotones.indexOf(idAnterior) % 2 == 0) {
      var indexButtonDesactivado = keysBotones.indexOf(idAnterior) + 1;
    }
    else {
      var indexButtonDesactivado = keysBotones.indexOf(idAnterior) - 1;
    }
    return keysBotones[indexButtonDesactivado];
  }

  componentDidUpdate() {
    localStorage.setItem('resultados', JSON.stringify(this.state.resultados));
    localStorage.setItem('ganadoresCuartos', JSON.stringify(this.state.ganadoresCuartos));
    localStorage.setItem('ganadoresSemifinales', JSON.stringify(this.state.ganadoresSemifinales));
  }

  crearGanadoresCuartos = () => {
    var ganadoresCuartos = { ...this.state.ganadoresCuartos };
    for (var i = 0; i < this.state.equipos.length / 2; i++) {
      let primerResultado = 'resultado_equipo1_partido' + i;
      let segundoResultado = 'resultado_equipo2_partido' + i;
      let primerResultadoBoton = 'ganador_equipo1_partido' + i;
      let segundoResultadoBoton = 'ganador_equipo2_partido' + i;
      let partidoActualizar = 'ganador_partido' + (i + 1);
      let ganador = { ...ganadoresCuartos[partidoActualizar] };
      let statePrimerResultado = parseInt(this.state.resultados[primerResultado]);
      let stateSegundoResultado = parseInt(this.state.resultados[segundoResultado]);
      let statePrimerResultadoBoton = this.state.resultadosBotones[primerResultadoBoton]
      let stateSegundoResultadoBoton = this.state.resultadosBotones[segundoResultadoBoton]

      if (!isNaN(statePrimerResultado) && !isNaN(stateSegundoResultado) || statePrimerResultadoBoton || stateSegundoResultadoBoton) { //check not null
        if (statePrimerResultadoBoton || (statePrimerResultado > stateSegundoResultado)) { //Si el boton esta prendido O el puntaje es mayor (Gana el primero)
          var indexEquipoGanador = i;
          ganador = this.state.equipos[indexEquipoGanador].nombre_equipo;
        }
        else {
          if (stateSegundoResultadoBoton || statePrimerResultado < stateSegundoResultado) { //Gana el segundo
            var indexEquipoGanador = i + 4;
            ganador = this.state.equipos[indexEquipoGanador].nombre_equipo;
          }
          else { //Empate sin radio
            ganador = 'Ganador partido ' + (i + 1);
          }
        }
      }
      else { //restore default
        ganador = 'Ganador partido ' + (i + 1);
      }
      ganadoresCuartos[partidoActualizar] = ganador;
    }
    this.setState({ ganadoresCuartos });
  }

  crearGanadoresSemifinales = () => {
    var ganadoresSemifinales = { ...this.state.ganadoresSemifinales };
    console.log("entro");
    var equipoActual = 1;
    var indiceSemifinal = 1;
    while (indiceSemifinal < 3) {
      let primerResultado = 'resultado_equipo1_partido' + (indiceSemifinal + 3);
      let segundoResultado = 'resultado_equipo2_partido' + (indiceSemifinal + 3);
      let primerResultadoBoton = 'ganador_equipo1_partido' + (indiceSemifinal + 3);
      let segundoResultadoBoton = 'ganador_equipo2_partido' + (indiceSemifinal + 3);
      var partidoActualizar = 'ganador_semifinal' + indiceSemifinal;
      var ganador = { ...ganadoresSemifinales[partidoActualizar] };
      let statePrimerResultado = parseInt(this.state.resultados[primerResultado]);
      let stateSegundoResultado = parseInt(this.state.resultados[segundoResultado]);
      let statePrimerResultadoBoton = this.state.resultadosBotones[primerResultadoBoton]
      let stateSegundoResultadoBoton = this.state.resultadosBotones[segundoResultadoBoton]

      if (!isNaN(statePrimerResultado) && !isNaN(stateSegundoResultado) || statePrimerResultadoBoton || stateSegundoResultadoBoton) { //check not null
        if (statePrimerResultadoBoton || (statePrimerResultado > stateSegundoResultado)) {
          var indexEquipoGanador = 'ganador_partido' + equipoActual;
          ganador = this.state.ganadoresCuartos[indexEquipoGanador];
        }
        else {
          if (stateSegundoResultadoBoton || statePrimerResultado < stateSegundoResultado) {
            var indexEquipoGanador = 'ganador_partido' + (equipoActual + 1);
            ganador = this.state.ganadoresCuartos[indexEquipoGanador];
          }
          else{
            ganador = 'Ganador Semifinal ' + indiceSemifinal;
          }
        }
        ganador = this.state.ganadoresCuartos[indexEquipoGanador];
      }
      else { //restore default
        ganador = 'Ganador Semifinal ' + indiceSemifinal;
      }
      equipoActual += 2;
      indiceSemifinal++;
      ganadoresSemifinales[partidoActualizar] = ganador;
    }
    this.setState({ ganadoresSemifinales });
  }
  
  render() {
    return (
      <div>
        <Cuartos handleChanges={this.handleChanges} crearGanadoresCuartos={this.crearGanadoresCuartos} actualizarResultadosBotones={this.actualizarResultadosBotones} resultadoBotones={this.state.resultadosBotones} state={this.state} desactivarBoton={this.desactivarBoton} />
        <Semifinal crearGanadoresSemifinales={this.crearGanadoresSemifinales} equipos={this.state.equipos} resultados={this.state.resultados} ganadoresCuartos={this.state.ganadoresCuartos} handleChanges={this.handleChanges} actualizarResultadosBotones={this.actualizarResultadosBotones} resultadoBotones={this.state.resultadosBotones} desactivarBoton={this.desactivarBoton} />
        <Final equipos={this.state.equipos} resultados={this.state.resultados} ganadoresSemifinales={this.state.ganadoresSemifinales} handleChanges={this.handleChanges} actualizarResultadosBotones={this.actualizarResultadosBotones} resultadoBotones={this.state.resultadosBotones} desactivarBoton={this.desactivarBoton} />
      </div>
    )
  }
}