import React, { useContext } from 'react';
import Context from '../utils/context';


const HooksDemo = () => {
  const context = useContext(Context)


  return (
    <div>
      <div>
      <button onClick={() => context.dispatchContextTrue()}>Dispatch Context True </button>
      <button onClick={() => context.dispatchContextFalse()}>Dispatch Context False </button>

      <br />
      <br />
      {context.useContextSubmitState
        ? <h3> {context.useContextSubmitState} </h3>
        : <h3> No User Text </h3>
      }
      <br />
      {context.stateProp2
        ? <p> stateprop2 is true </p>
        : <p> stateprop2 is false </p>
      }
      <br />
      <br />
      <br />
      </div>
    </div>
  )
}



export default HooksDemo;
