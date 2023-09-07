import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

const bc = new BroadcastChannel('my-awesome-site');

// const Home = () => {
//   return <div>Home</div>;
// };

const About = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    bc.onmessage = (event) => {
      if (event.data === 'Focus') {
        console.log('Received "Focus" message');
        // window.focus();
        window.blur();
        setTimeout(window.focus(), 0);
        document.body.focus();
        console.log(document.hasFocus());
      }

      if (event.data === 'Close') {
        console.log('check CLose');
        window.close();
      }
    };
  }, []);

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
      About
    </div>
  );
};

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>about</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path='/'>
            <button
              onClick={() => {
                window.open('about', 'tab');
              }}
            >
              Open New Tab
            </button>

            <button
              onClick={() => {
                bc.postMessage('Close');
              }}
            >
              Close
            </button>

            <button
              onClick={() => {
                window.focus();
                bc.postMessage('Focus');
              }}
            >
              Focus
            </button>

            {/* <button
              onClick={() => {
                setTab((prev) => prev + 1);
              }}
            >
              Change Tab
            </button> */}
          </Route>
          <Route path='/about'>
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
