import React, { Component } from "react";
import { Row, Col, Image } from "react-bootstrap";
import "./styles.css";
const BlogAuthor = ({ posts }) => {
  const { firstName, avatar } = posts;
  return (
    <Row>
      <Col xs={2}>
        <Image className="blog-author" src={avatar} roundedCircle />
      </Col>
      <Col>
        <div>
          <p className="mb-0">by</p>{" "}
        </div>
        <h6 className="mb-0 mt-n2">{firstName}</h6>
      </Col>
    </Row>
  );
};

export default BlogAuthor;
