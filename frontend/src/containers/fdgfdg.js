import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import http from "../helpers/http";
import { movie } from "../redux/actions/movie";

class CreateMovie extends Component {
  state = {
    title: "",
    category: "",
    releaseDate: "",
    durationHours: 0,
    durationMinutes: 0,
    director: "",
    casts: "",
    synopsis: "",
  };

  changeText = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  saveData = async (e) => {
    e.preventDefault();
    const data = new URLSearchParams();
    const {
      title,
      category,
      releaseDate,
      durationHours,
      durationMinutes,
      director,
      casts,
      synopsis,
    } = this.state;

    data.append("title", title);
    data.append("category", category);
    data.append("releaseDate", releaseDate);
    data.append("duration", `${durationHours}:${durationMinutes}`);
    data.append("director", director);
    data.append("casts", casts);
    data.append("synopsis", synopsis);

    const response = await http(this.props.auth.token).post("movies", data);
    window.alert(response.data.message);
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.saveData}>
          {/* Movie Name */}
          <Form.Group>
            <Form.Label>Movie Name</Form.Label>
            <Form.Control
              onChange={this.changeText}
              name="title"
              type="text"
            />
          </Form.Group>
          {/* Category */}
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              onChange={this.changeText}
              name="category"
              type="text"
            />
          </Form.Group>
          {/* Release Date */}
          <Form.Group>
            <Form.Label>Release date</Form.Label>
            <Form.Control
              onChange={this.changeText}
              name="releaseDate"
              type="date"
            />
          </Form.Group>
          {/* Duration */}
          <Form.Group>
            <Form.Label>Duration (hour / minute)</Form.Label>
            <Form.Control
              onChange={this.changeText}
              name="durationHours"
              type="number"
            />
            <Form.Control
              onChange={this.changeText}
              name="durationMinutes"
              type="number"
            />
          </Form.Group>
          {/* Director */}
          <Form.Group>
            <Form.Label>Director</Form.Label>
            <Form.Control
              onChange={this.changeText}
              name="director"
              type="text"
            />
          </Form.Group>
          {/* Casts */}
          <Form.Group>
            <Form.Label>Casts</Form.Label>
            <Form.Control
              onChange={this.changeText}
              name="casts"
              type="text"
            />
          </Form.Group>
          {/* Synopsis */}
          <Form.Group>
            <Form.Label>Synopsis</Form.Label>
            <Form.Control
              onChange={this.changeText}
              name="synopsis"
              type="text"
              as="textarea"
            />
          </Form.Group>
          <Button variant="primary" type="submit" block>
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

const mapDispatchToProps = { movie };

export default connect(mapStateToProps)(CreateMovie);
