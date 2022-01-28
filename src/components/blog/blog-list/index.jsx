import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item/indexPost";
// import posts from "../../../data/posts.json";
const BlogList = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchLocalHost = async () => {
      try {
        let res = await fetch("http://localhost:3001/posts");
        console.log("Data fetched");
        if (res.ok) {
          let data = await res.json();
          setPosts(data);
          console.log(data);
        } else {
          console.log("Fetching Failed!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocalHost();
  }, []);
  return (
    <Row>
      {posts.map(post => (
        <Col md={4} style={{ marginBottom: 50 }}>
          <BlogItem key={post._id} posts={post} />
        </Col>
      ))}
    </Row>
  );
};
export default BlogList;
