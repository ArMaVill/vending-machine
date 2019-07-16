import React from "react";
import { Button, Card } from "react-bootstrap";

class Bebidas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      nombre: props.nombre,
      descripcion: props.descripcion,
      cantidad: props.cantidad,
      precio: props.precio
    };
  }

  render() {
    return (
      <Card bg="dark" text="white" style={{ width: "20rem" }}>
        <Card.Body>
          <Card.Title>{this.state.nombre}</Card.Title>
          <Card.Text>{this.state.descripcion}</Card.Text>
          <Card.Text>
            <small className="text-muted">₡{this.state.precio}</small>
            <br></br>
            <small className="text-muted">{this.state.id}</small>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button
            variant="success"
            onClick={() =>
              this.props.handleEdit(
                this.state.id,
                this.state.nombre,
                this.state.descripcion,
                this.state.precio,
                this.state.cantidad
              )
            }
          >
            Editar
          </Button>
          <Button
            variant="danger"
            onClick={() => this.props.delete(this.props.id)}
          >
            Eliminar
          </Button>
        </Card.Footer>
      </Card>
    );
  }
}

export default Bebidas;
