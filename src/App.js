import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import BooksManager from "./components/containers/BooksManager/BooksManager";
import LogIn from "./components/login/login";
import BookDetail from "./components/BookDetail/BookDetail";
import LogOut from "./components/Logout/LogOut";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      username: "admin",
      password: "admin"
    };
  }

  handleSubmit = (event, item) => {
    event.preventDefault();
    const { username, password } = this.state;

    if (item.username === username && item.password === password) {
      this.setState({
        isAuthenticated: true
      });
    } else {
      this.setState({
        isAuthenticated: false
      });
    }
  };

  toggleAuthentication = () => {
    this.setState({
      isAuthenticated: !this.state.isAuthenticated
    });
  };

  render() {
    return (
      <Router>
        <Header isAuthenticated={this.state.isAuthenticated} />

        <PrivateComponent
          path="/books"
          isAuthenticated={this.state.isAuthenticated}
          component={BooksManager}
        />

        <PrivateComponent
          path="/book-detail"
          isAuthenticated={this.state.isAuthenticated}
          component={BookDetail}
        />
        <Route
          path="/login"
          component={(path) => (
            <LogIn
              handleSubmit={this.handleSubmit}
              isRedirected={path}
              isAuthenticated={this.state.isAuthenticated}
            />
          )}
        />
        <Route
          path="/logout"
          component={() => (
            <LogOut
              toggleAuthentication={this.toggleAuthentication}
              isAuthenticated={this.state.isAuthenticated}
            />
          )}
        />
      </Router>
    );
  }
}

export default App;

const PrivateComponent = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: isAuthenticated
            }}
          />
        )
      }
    />
  );
};
