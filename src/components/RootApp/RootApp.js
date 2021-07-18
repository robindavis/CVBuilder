// Library Imports
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// User Imports
import "./RootApp.scss";
import HomePage from "../HomePage/HomePage";
import ErrorPage from "../ErrorPage/ErrorPage";
import ContactPage from "../ContactPage/ContactPage";

function App() {
  return (
    <div className="rootAppContainer">
      <Router>
        <Switch>
          <Route path="/Contact" exact>
            <ContactPage />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
