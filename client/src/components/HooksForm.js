import React, { useContext } from 'react';
import Context from '../utils/context';

const HooksForm = () => {
  const context = useContext(Context);

  return (
    <div>
      <br />
      <br />
      <form onSubmit={context.useContextSubmit}>
        <label> React useContext: </label>
        <input
          id="useContext"
          onChange={context.useContextChange}
          type="text"
        />
        <button type="submit"> Submit </button>
      </form>
      <br />

      <h3>React useContext:</h3>
      <p>Change: {context.useContextChangeState}</p>
      <p>Submit: {context.useContextSubmitState}</p>
      <br />
      <br />
    </div>
  );
};

export default HooksForm;
