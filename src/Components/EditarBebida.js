import React from "react";
import { Button, Form, Col, Row } from "react-bootstrap";

class EditarBebida extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: props.adding,
      edit: props.edit,
      nombre: props.nombre,
      descripcion: props.descripcion,
      precio: props.precio,
      cantidad: props.cantidad,
      id: props.id
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmit = () => {
    if (
      this.state.taskName === "" ||
      this.state.description === "" ||
      this.state.startDate === "" ||
      this.state.endDate === ""
    ) {
      alert("There is an empty value");
    } else {
      this.props.newDrink(
        this.state.nombre,
        this.state.descripcion,
        this.state.precio,
        this.state.cantidad
      );
      this.setState({
        nombre: "",
        descripcion: "",
        precio: "",
        cantidad: ""
      });
    }
    this.props.handleClose();
  };

  handleEdit = () => {
    if (
      this.state.taskName === "" ||
      this.state.description === "" ||
      this.state.startDate === "" ||
      this.state.endDate === ""
    ) {
      alert("There is an empty value");
    } else {
      this.props.edit(
        this.state.id,
        this.state.nombre,
        this.state.descripcion,
        this.state.precio,
        this.state.cantidad
      );
      this.setState({
        nombre: "",
        descripcion: "",
        precio: "",
        cantidad: ""
      });
    }
    this.props.handleClose();
  };

  //   addForm() {
  //     let form = (

  //     );
  //     return form;
  //   }

  render() {
    let adding = this.state.adding;
    return (
      <div>
        <div className="newTask">
          <h2>Nueva Bebida {this.state.id}</h2>
          <Form.Group as={Row} controlId="formDrinkName">
            <Form.Label column sm="4">
              Nombre:
            </Form.Label>
            <Col sm="12">
              <Form.Control
                type="text"
                name="nombre"
                placeholder="Nombre de la bebida"
                value={this.state.nombre}
                onChange={this.handleInputChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formDrinkDescrption">
            <Form.Label column sm="4">
              Description:
            </Form.Label>
            <Col sm="12">
              <Form.Control
                type="text"
                name="descripcion"
                placeholder="Descripcion de la bebida"
                value={this.state.descripcion}
                onChange={this.handleInputChange}
              />
            </Col>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="formDrinkPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={this.state.precio}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formDrinkQuantity">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                name="cantidad"
                value={this.state.cantidad}
                onChange={this.handleInputChange}
              />
            </Form.Group>
          </Form.Row>
          {adding ? (
            <Button variant="primary" onClick={this.handleSubmit}>
              Agregar
            </Button>
          ) : (
            <Button variant="success" onClick={this.handleEdit}>
              Editar
            </Button>
          )}

          <Button variant="danger" onClick={this.props.handleClose}>
            Cancelar
          </Button>
          <Form.Row>
            <Form.Group as={Col} controlId="formDrinkPrice"></Form.Group>
          </Form.Row>
        </div>
      </div>
    );
  }
}

export default EditarBebida;
