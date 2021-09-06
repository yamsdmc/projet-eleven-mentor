import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <div>HEADER MENU</div>
        <Router>
            <div>
                <Switch>
                    {/*<Route path="/add-dog">*/}
                    {/*    <About />*/}
                    {/*</Route>*/}
                    {/*<Route path="/listing-breed">*/}
                    {/*    <Users />*/}
                    {/*</Route>*/}
                    <Route path="/">
                        <App />
                    </Route>
                </Switch>
            </div>
        </Router>
    </div>
  );
}

export default App;
