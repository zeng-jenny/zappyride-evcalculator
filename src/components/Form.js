import React from "react";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      rate: null,
      miles: 0,
      startTime: 0,
      endTime: 0,
      total: 0,
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
    if (this.state.rate === "A") {
      this.setState(
        {
          total: Number(this.state.miles) * 0.15,
        },
        () => console.log(this.state.total)
      );
    } else {
      if (this.state.startTime >= 12 && this.state.endTime <= 18) {
        this.setState(
          {
            total:
              (this.state.endTime - this.state.startTime) *
              0.2 *
              Number(this.state.miles),
          },
          () => console.log(this.state)
        );
      } else if (this.state.startTime >= 12 && this.state.endTime >= 18) {
        let remainingTime = this.state.endTime - 18;
        let tot =
          ((18 - this.state.startTime) * 0.2 + remainingTime * 0.08) *
          Number(this.state.miles);
        this.setState({ total: tot }, () => console.log(this.state));
      } else if (this.state.startTime < 12 && this.state.endTime <= 18) {
        let remainingTime = this.state.endTime - 12;
        let tot =
          ((12 - this.state.startTime) * 0.2 + remainingTime * 0.08) *
          Number(this.state.miles);
        this.setState({ total: tot }, () => console.log(this.state));
      } else {
        let lowRate = 12 - this.state.startTime + this.state.endTime - 18;
        let highRate = 18 - 12;
        let tot = lowRate * 0.08 + highRate * 0.2 * Number(this.state.miles);
        this.setState(
          {
            total: tot,
          },
          () => console.log(this.state)
        );
      }
    }
  }

  render() {
    return (
      <div className="info">
        <form onSubmit={this.handleSubmit}>
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
        </form>
        <p>
          Yearly total using Rate {this.state.rate ? this.state.rate : "A/B"}:
        </p>
        <p>{this.state.total ? this.state.total : 0}</p>
      </div>
    );
  }
}

export default Form;
