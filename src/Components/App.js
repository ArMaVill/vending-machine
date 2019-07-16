import React from "react";
import axios from "axios";
import EditarBebida from "./EditarBebida";
import Bebida from "./Bebida";
import { Container, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import "../App.css";
const REST_PATH = "https://armavill.github.io/api-bebidas/";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.newDrink = this.newDrink.bind(this);

    this.state = {
      bebidas: [],
      isLoading: true,
      mensaje: "",
      error: null,
      show: false,
      editing: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.loadData();
  }

  loadData() {
    axios
      .get(REST_PATH + "/bebidas")
      .then(response => {
        this.setState({
          bebidas: response.data.respuesta,
          isLoading: false
        });
        console.log(this.state);
      })
      .catch(error =>
        this.setState({ error: true, mensaje: error.message, isLoading: false })
      );
  }

  newDrink(nombre, descripcion, precio, cantidad) {
    console.log(nombre, descripcion, precio, cantidad);
    axios
      .post(REST_PATH + "/bebidas", {
        nombre,
        descripcion,
        precio,
        cantidad
      })
      .then(response => {
        this.setState({
          error: response.data.error,
          mensaje: response.data.mensaje
        });
        this.loadData();
        console.log(response.data.error);
        console.log(response.data.mensaje);
      })
      .catch(error =>
        this.setState({ error: true, mensaje: error.message, isLoading: false })
      );
  }

  delete(id) {
    console.log("Eliminando.." + id);
    axios
      .delete(REST_PATH + "/bebidas/" + id)
      .then(response => {
        console.log(response.data.mensaje);
        this.setState({
          error: response.data.error,
          mensaje: response.data.mensaje
        });
        this.loadData();
      })
      .catch(error =>
        this.setState({ error: true, mensaje: error.message, isLoading: false })
      );
  }

  edit(id, nombre, descripcion, precio, cantidad) {
    console.log(id, nombre, descripcion, precio, cantidad);
    axios
      .put(REST_PATH + "/bebidas/" + id, {
        id: id,
        nombre,
        descripcion,
        precio,
        cantidad
      })
      .then(response => {
        this.setState({
          error: response.data.error,
          mensaje: response.data.mensaje,
          bebidas: []
        });
        this.loadData();
        console.log(response.data.respuesta);
        console.log(response.data.error);
        console.log(response.data.mensaje);
      })
      .catch(error =>
        this.setState({ error: true, mensaje: error.message, isLoading: false })
      );
  }

  handleEdit(id, nombre, descripcion, precio, cantidad) {
    console.log(id);
    this.setState({
      editing: true,
      id: id,
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      cantidad: cantidad
    });
  }

  handleClose() {
    this.setState({ show: false, editing: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    let form;
    const { bebidas, editing, show, isLoading } = this.state;

    if (show) {
      form = (
        <div>
          <EditarBebida
            handleClose={this.handleClose}
            newDrink={this.newDrink}
            adding={true}
            id={"nuevoid"}
          />
        </div>
      );
    } else {
      form = (
        <Button variant="primary" onClick={this.handleShow}>
          Nueva Bebida
        </Button>
      );
    }

    if (editing) {
      form = (
        <div>
          <EditarBebida
            handleClose={this.handleClose}
            edit={this.edit}
            editing={true}
            id={this.state.id}
            nombre={this.state.nombre}
            descripcion={this.state.descripcion}
            cantidad={this.state.cantidad}
            precio={this.state.precio}
          />
        </div>
      );
    }

    return (
      <Container className="App">
        <div>
          <h1>Lista de Bebidas Disponibles</h1>
          <div>{form}</div>

          {this.state.mensaje !== "" && (
            <div>
              {this.state.error ? (
                <Alert variant="danger" style={{ margin: " 20px 0 20px 0" }}>
                  {this.state.mensaje}
                </Alert>
              ) : (
                <Alert variant="primary" style={{ margin: " 20px 0 20px 0" }}>
                  {this.state.mensaje}
                </Alert>
              )}
            </div>
          )}
          <Row className="fila">
            {bebidas.length > 0 ? (
              bebidas.map(bebida => (
                <Col key={bebida._id} sm={4}>
                  <Bebida
                    id={bebida._id}
                    nombre={bebida.nombre}
                    descripcion={bebida.descripcion}
                    precio={bebida.precio}
                    cantidad={bebida.cantidad}
                    delete={this.delete}
                    handleEdit={this.handleEdit}
                  ></Bebida>
                </Col>
              ))
            ) : !isLoading ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              <p>No hay bebidas</p>
            )}
          </Row>
        </div>
      </Container>
    );
  }
}

export default App;
