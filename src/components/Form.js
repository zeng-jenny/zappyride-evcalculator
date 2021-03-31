import React from "react";

const Form = () => {
  return (
    <form>
      <label>
        Rate Options:
        <input type="text" name="name" />
      </label>
      <label>
        How many miles do you plan to drive in a year?:
        <input type="number" name="name" />
      </label>
      <label>
        What hours of the day will you plan to charge?:
        <input type="time" name="name" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Form;
