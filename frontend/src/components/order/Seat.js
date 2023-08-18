import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createSeat } from "../../redux/actions/order";
import "./styles.css";

class Seat extends Component {
  state = {
    listSeat: {},
  };

  seatClick = (e) => {
    const { name, checked } = e.target;
    this.setState(
        (prevState) => ({
          listSeat: {
            ...prevState.listSeat,
            [name]: checked,
          },
        }),
        () => {
          const selectedSeats = Object.keys(this.state.listSeat)
              .filter((seat) => this.state.listSeat[seat])
              .join(", ");
          this.props.createSeat(selectedSeats);
        }
    );
  };

  render() {
    const seatNum = [];
    const seatRows = ["A", "B", "C", "D", "E", "F", "G"];

    for (let i = 1; i < 15; i++) {
      if (i === 8) {
        seatNum.push(<div className="px-3" key={i}></div>);
      }
      seatNum.push(<td className="pl-3" key={i}>{i}</td>);
    }

    const seats = seatRows.map((row) => {
      const rowSeats = [];
      for (let i = 1; i < 15; i++) {
        if (i === 8) {
          rowSeats.push(<div className="px-3" key={i}></div>);
        }
        const seatName = `${row}${i}`;
        rowSeats.push(
            <td key={seatName}>
              <input
                  type="checkbox"
                  value={seatName}
                  name={seatName}
                  onChange={this.seatClick}
              />
            </td>
        );
      }
      return (
          <tr key={row}>
            <td>{row}</td>
            {rowSeats}
          </tr>
      );
    });

    return (
        <div>
          <table>
            <tbody>
            {seats}
            <tr>
              <td></td>
              {seatNum}
            </tr>
            </tbody>
          </table>
          <p className="text-link-lg pt-4">Seating key</p>
          <Row>
            <Col>
              <div className="availableBox float-left mr-3"></div>
              <p>Available</p>
            </Col>
            <Col>
              <div className="selectBox float-left mr-3"></div>
              <p>Selected</p>
            </Col>
            <Col>
              <div className="loveBox float-left mr-3"></div>
              <p>Love nest</p>
            </Col>
            <Col>
              <div className="soldBox float-left mr-3"></div>
              <p>Sold</p>
            </Col>
          </Row>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.order,
});

const mapDispatchToProps = { createSeat };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Seat));
