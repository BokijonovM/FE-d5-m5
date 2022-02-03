import React, { Component } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
export default class MyNavBar extends Component {
  downloadCSV = e => {
    try {
      // const request= fetch(process.env.REACT_APP_PROD_API_URL + 'blogPost/' + this.props.match.params.id)
      // console.log(request)
      window.location.replace(
        process.env.REACT_APP_LOCALHOST_3001 + "files/downloadCSV"
      );
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <Navbar expand="lg" className="blog-navbar" fixed="top">
        <Container className="justify-content-between">
          <Navbar.Brand as={Link} to="/">
            <img className="blog-navbar-brand" alt="logo" src={logo} />
          </Navbar.Brand>
          <div className="d-flex">
            <Button
              className="blog-navbar-add-button-1 bg-dark shadow-none"
              size="lg"
              onClick={e => this.downloadCSV(e)}
            >
              Get List of Authors
            </Button>

            <Button
              as={Link}
              to="/new"
              className="blog-navbar-add-button bg-dark"
              size="lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-lg"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
              </svg>
              Post Article
            </Button>
          </div>
        </Container>
      </Navbar>
    );
  }
}
