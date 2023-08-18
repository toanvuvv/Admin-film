import React, { Component } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import http from "../helpers/http";
import { createMovie } from "../redux/actions/movie"; // Ensure you have a createMovie action

class CreateMovie extends Component {
  state = {
    id: 100,
    title: "",
    releaseDate: "",
    durationHours: 0,
    durationMinutes: 0,
    directed: "",
    cast: "",
    synopsis: "",
  };

  changeText = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  saveData = async (e) => {
    e.preventDefault();
    const {
      id,
      title,
      releaseDate,
      durationHours,
      durationMinutes,
      directed,
      cast,
      synopsis,
    } = this.state;

    const movieData = {
      id,
      title,
      releaseDate,
      duration: `${durationHours}h ${durationMinutes}min`,
      directed,
      cast,
      synopsis,
    };

    this.props.createMovie(id, movieData);
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.saveData}>
          {/* Form Fields */}
          <Form.Group>
            <Form.Label>Movie Name</Form.Label>
            <Form.Control onChange={this.changeText} name="title" type="text" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              onChange={this.changeText}
              name="category"
              type="text"
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Release date</Form.Label>
                <Form.Control
                  onChange={this.changeText}
                  name="releaseDate"
                  type="date"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Duration (hour / minute)</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      onChange={this.changeText}
                      name="durationHours"
                      type="number"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      onChange={this.changeText}
                      name="durationMinutes"
                      type="number"
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Director</Form.Label>
                <Form.Control
                  onChange={this.changeText}
                  name="directed"
                  type="text"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Casts</Form.Label>
                <Form.Control
                  onChange={this.changeText}
                  name="cast"
                  type="text"
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Synopsis</Form.Label>
            <Form.Control
              onChange={this.changeText}
              name="synopsis"
              type="text"
              as="textarea"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              window.alert("Movie successfully created");
              window.location.reload();
            }}
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { createMovie }; // Assuming you have an action called createMovie

export default connect(mapStateToProps, mapDispatchToProps)(CreateMovie);
