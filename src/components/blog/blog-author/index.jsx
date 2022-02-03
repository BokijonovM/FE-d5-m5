import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import "./styles.css";
const BlogAuthor = ({ posts }) => {
  const { name, avatar, surname } = posts;
  return (
    <Row>
      <Col xs={2}>
        <Image className="blog-author" src={avatar} roundedCircle />
      </Col>
      <Col>
        <div>by</div>
        <div className="d-flex">
          <h6 className="mb-0 mt-n2">{name}&nbsp;</h6>
          <h6 className="mb-0 mt-n2">{surname}</h6>
        </div>
      </Col>
    </Row>
  );
};

export default BlogAuthor;
