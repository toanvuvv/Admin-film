import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import http from "../helpers/http";
import { Card, Col, Image, Row } from "react-bootstrap";
import { updateMovieByID } from "../redux/actions/movie";
class EditMovie extends Component {
  // state = {
  // 	movie: [],
  // };
  constructor(props) {
    super(props);
    this.state = {
      movie: [],
    };
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await http().get(`movies/${id}`);
    this.setState({
      movie: response.data.results,
    });
  }
  saveData = async (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    // const { title } = this.state.movie;
    const { movie } = this.state;
    // const data = new URLSearchParams();
    // data.append("title", title);
    // const response = await http(this.props.auth.token).patch(
    // 	`movies/${id}`,
    // 	data,
    // );
    let movieData = {
      id: id,
      title: movie.title,
      directed: movie.directed,
      releaseDate: movie.releaseDate,
      cast: movie.cast,
      synopsis: movie.synopsis,
      duration:
        (movie.durationHours || 0) +
        "h " +
        (movie.durationMinutes || 0) +
        "min",
    };
    // duration: movie.durationHours+"h "+movie.durationMinutes+"min",
    this.props.updateMovieByID(id, movieData);
    console.log(2222222);
    // window.alert(response.data.message);
  };
  changeText = (event) => {
    const { movie } = this.state;
    this.setState({
      movie: {
        ...movie,
        [event.target.name]: event.target.value,
      },
    });
  };
  render() {
    const { movie } = this.state;
    const { id } = this.props.match.params;
    let movieData;
    console.log("hihihi" + movie);
    return (
      <React.Fragment>
        {Object.keys(movie).length > 0 && (
          <Form onSubmit={this.saveData}>
            <Form.Group>
              <Form.Label>Movie Name</Form.Label>
              <Form.Control
                type="text"
                name="title"
                onChange={this.changeText}
                defaultValue={movie.title}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                onChange={this.changeText}
                defaultValue={movie.category}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Label>Release date</Form.Label>
                <Form.Control
                  type="date"
                  name="releaseDate"
                  onChange={this.changeText}
                  defaultValue={movie.releaseDate}
                />
              </Col>
              <Col>
                <Form.Label>Duration (hour / minute)</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      name="durationHours"
                      onChange={this.changeText}
                      placeholder="2"
                      defaultValue={movie.durationHours}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      name="durationMinutes"
                      onChange={this.changeText}
                      placeholder="13"
                      defaultValue={movie.durationMinutes}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Director</Form.Label>
                  <Form.Control
                    type="text"
                    name="directed"
                    onChange={this.changeText}
                    defaultValue={movie.directed}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Casts</Form.Label>
                  <Form.Control
                    type="text"
                    name="cast"
                    onChange={this.changeText}
                    defaultValue={movie.cast}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Synopsis</Form.Label>
              <Form.Control
                type="text"
                name="synopsis"
                as="textarea"
                onChange={this.changeText}
                defaultValue={movie.synopsis}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="warning"
              onClick={() => {
				window.alert("Movie has been updated");
                window.location.reload();
              }}
            >
              Save
            </Button>
          </Form>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { updateMovieByID };
export default connect(mapStateToProps, mapDispatchToProps)(EditMovie);
