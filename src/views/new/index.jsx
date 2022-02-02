import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button, Modal } from "react-bootstrap";
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

  const [addPost, setAddPost] = useState(false);

  const showAddPost = () => setAddPost(true);
  const closeAddPost = () => setAddPost(false);

  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    closeAddPost();
    formData.append("profile", selectedFile);

    console.log(formData);

    try {
      let response = await fetch(
        `http://localhost:3001/files/rkowrhz0kyy2g0o1/cover`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        let data = await response.json();
        console.log("Successfully uploaded", data);
      } else {
        console.log("error on uploading");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = e => {
    setSelectedFile(e.target.files[0]);
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

        <div className="d-flex align-items-end">
          <Form.Group
            style={{ width: "80%" }}
            controlId="blog-form"
            className="mt-3"
          >
            <Form.Label>Cover Image</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Image link"
              value={cover}
              onChange={e => setCover(e.target.value)}
            />
          </Form.Group>

          <Button
            className=""
            style={{ marginLeft: "1em", width: "18%", height: "100%" }}
            variant="info"
            value={cover}
            onClick={showAddPost}
          >
            Upload Image
          </Button>
          <Modal show={addPost} onHide={closeAddPost}>
            <Modal.Dialog className="w-100 border-0 px-3">
              <Modal.Header closeButton>
                <Modal.Title>Upload Cover Image</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="d-flex justify-content-between  align-items-center">
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      marginBottom: "20px",
                    }}
                  >
                    <img
                      className="w-100 "
                      src={selectedFile}
                      alt="change profile pic"
                    />
                    <input
                      type="file"
                      id="photo"
                      // onChange={e => handleChange(e)}
                      value={cover}
                      onChange={e => setCover(e.target.value)}
                    />
                    {selectedFile && (
                      <>
                        <p>{selectedFile.name}</p>
                        <p className="mb-5">{selectedFile.type}</p>{" "}
                      </>
                    )}
                  </div>
                  <button
                    className="bg-success text-white pointer round-border grey-border p-2 h-100"
                    onClick={e => handleUpload(e)}
                    value={cover}
                    onChange={e => setCover(e.target.value)}
                  >
                    upload
                  </button>
                </div>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        </div>

        <div className="author-info-div">
          <Form.Group controlId="blog-form" className="mt-3 author-form-group">
            <Form.Label>Author Name</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Author Name"
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="blog-form" className="mt-3 author-form-group">
            <Form.Label>Author Surname</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Author Surname"
              value={authorSurname}
              onChange={e => setAuthorSurname(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="blog-form" className="mt-3 author-form-group">
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
