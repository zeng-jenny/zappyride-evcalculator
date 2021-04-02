import React, { Component } from "react";
import Form from "./components/Form";
import Header from "./components/Header";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Form />
      </div>
    );
  }
}

export default App;
