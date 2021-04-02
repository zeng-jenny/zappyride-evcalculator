import React from "react";
import Calculations from "./Calculation.js";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      rate: null,
      miles: 0,
      startTime: 0,
      endTime: 0,
      Atotal: 0,
      Btotal: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  handleTimeChange(evt) {
    this.setState({
      [evt.target.name]:
        evt.target.value.split(":").reduce(function (seconds, v) {
          return +v + seconds * 60;
        }, 0) / 60,
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    let kwh = Number(this.state.miles) * 0.3;
    this.setState(
      {
        Atotal: (0.15 * kwh).toFixed(2),
      },
      () => console.log(this.state.total)
    );

    if (this.state.startTime <= 12 && this.state.endTime >= 18) {
      let tot =
        ((12 - this.state.startTime + this.state.endTime - 18) * 0.08 +
          6 * 0.2) *
        kwh;
      this.setState(
        {
          Btotal: tot.toFixed(2),
        },
        () => console.log(this.state)
      );
    } else if (this.state.startTime >= 12 && this.state.endTime >= 18) {
      let tot =
        ((18 - this.state.startTime) * 0.2 + (this.state.endTime - 18) * 0.08) *
        kwh;
      this.setState({ Btotal: tot.toFixed(2) }, () => console.log(this.state));
    } else if (this.state.startTime < 12 && this.state.endTime <= 18) {
      let tot =
        ((12 - this.state.startTime) * 0.08 +
          (this.state.endTime - 12) * 0.08) *
        kwh;
      this.setState({ Btotal: tot.toFixed(2) }, () => console.log(this.state));
    } else {
      let tot = (this.state.endTime - this.state.startTime) * 0.2 * kwh;
      this.setState(
        {
          Btotal: tot.toFixed(2),
        },
        () => console.log(this.state)
      );
    }
  }

  render() {
    return (
      <div className="info">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Complete to form below to compare rates!</legend>
            <label htmlFor="rate">
              Rate Options:
              <select name="rate" onChange={this.handleChange}>
                <option value="selection" hidden>
                  Please select a rate option.
                </option>
                <option value="A">Rate A</option>
                <option value="B">Rate B</option>
              </select>
            </label>
            <label htmlFor="miles">
              How many miles do you plan to drive in a year?:
              <input type="number" name="miles" onChange={this.handleChange} />
            </label>
            <label htmlFor="time">
              What hours of the day will you plan to charge?:
              <input
                type="time"
                name="startTime"
                onChange={this.handleTimeChange}
              />
              <input
                type="time"
                name="endTime"
                onChange={this.handleTimeChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </fieldset>
        </form>
        <Calculations
          rate={this.state.rate}
          Atotal={this.state.Atotal}
          Btotal={this.state.Btotal}
        />
      </div>
    );
  }
}

export default Form;
