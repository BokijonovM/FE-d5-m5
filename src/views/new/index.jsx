import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
import striptags from "striptags";
const NewBlogPost = () => {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [authorName, setAuthorName] = useState("");
  const [authorSurname, setAuthorSurname] = useState("");
  const [category, setCategory] = useState("Action");
  const [content, setContent] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const newPost = {
      category,
      title,
      cover,
      author: {
        name: authorName,
        surname: authorSurname,
        avatar,
      },
      readTime: {
        value: "2",
        unit: "minutes",
      },
      content: striptags(content),
    };
    try {
      const response = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
      } else {
        console.error("POST failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Cover Image</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Image link"
            value={cover}
            onChange={e => setCover(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Form.Group
            style={{ width: "30%" }}
            controlId="blog-form"
            className="mt-3"
          >
            <Form.Label>Author Name</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Author Name"
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            style={{ width: "30%" }}
            controlId="blog-form"
            className="mt-3"
          >
            <Form.Label>Author Surname</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Author Surname"
              value={authorSurname}
              onChange={e => setAuthorSurname(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            style={{ width: "30%" }}
            controlId="blog-form"
            className="mt-3"
          >
            <Form.Label>Author Avatar</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Image link"
              value={avatar}
              onChange={e => setAvatar(e.target.value)}
            />
          </Form.Group>
        </div>

        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option>Action</option>
            <option>Comedy</option>
            <option>Horror</option>
            <option>Romance</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <ReactQuill
            value={content}
            onChange={html => setContent(html)}
            className="new-blog-content"
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{ marginLeft: "1em" }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};
export default NewBlogPost;
