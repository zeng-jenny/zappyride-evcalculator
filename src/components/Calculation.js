import React from "react";

const Calculations = (props) => {
  let { rate, Atotal, Btotal } = props;
  return (
    <div className='calculations'>
        {rate ? <p>You have selected Rate {rate}. </p> : null}
        {Atotal ? <p>Yearly total using Rate A: ${Atotal}</p> : null}
        {Btotal ? <p>Yearly total using Rate B: ${Btotal}</p> : null}
        {rate === "B" && Number(Atotal) < Number(Btotal) && (
          <p>
            Switch to Rate A and save ${Number(Btotal) - Number(Atotal)} yearly!
          </p>
        )}
        {rate === "A" && Number(Btotal) < Number(Atotal) && (
          <p>
            Switch to Rate B and save ${Number(Atotal) - Number(Btotal)} yearly!
          </p>
        )}

    </div>
  );
};

export default Calculations;
