import React, { Component } from "react";
import { Container, Image, Button, Modal, Form } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import BlogLike from "../../components/likes/BlogLike";
import { parseISO, format } from "date-fns";
//import posts from "../../data/posts.json";
import "./styles.css";
class Blog extends Component {
  state = {
    blog: {},
    loading: true,
    show: false,
  };

  // constructor() {
  //   super();
  //   this.state = {
  //     show: false,
  //   };
  // }
  handleModal() {
    this.setState({ show: !this.state.show });
  }
  componentDidMount() {
    this.fetchDataBlog();
    // console.log(posts)
    // const blog = posts.find((post) => post._id.toString() === id)
    // if (blog) {
    //   this.setState({ blog, loading: false })
    // } else {
    //   this.props.history.push("/404")
    // }
  }

  fetchDataBlog = async () => {
    try {
      const { id } = this.props.match.params;
      console.log("ID", id);
      const response = await fetch(
        process.env.REACT_APP_LOCALHOST_3001 + `posts`
      );
      if (response.ok) {
        const blogData = await response.json();
        console.log("Hell0");
        console.log(blogData);
        const blog = blogData.find(
          singleBlog => singleBlog._id.toString() === id
        );

        if (blog) {
          this.setState({ blog, loading: false });
        } else {
          this.props.history.push("/404");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  downloadPost = e => {
    try {
      // const request= fetch(process.env.REACT_APP_PROD_API_URL + 'blogPost/' + this.props.match.params.id)
      // console.log(request)
      window.location.replace(
        process.env.REACT_APP_LOCALHOST_3001 +
          "posts/download/" +
          this.props.match.params.id
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { loading, blog } = this.state;
    if (loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor posts={blog.author} />
              </div>
              <div className="blog-details-info">
                <div>
                  {" "}
                  {format(parseISO(blog.createdAt), "MMMM do yyyy | HH:mm")}
                </div>
                {/* <div>{blog.createdAt}</div> */}
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
                <div style={{ marginTop: 20 }}>
                  <BlogLike defaultLikes={["123"]} onChange={console.log} />
                  <Button
                    onClick={e => this.downloadPost(e)}
                    className="w-100 mt-2 shadow-none"
                    variant="info"
                  >
                    Get PDF
                  </Button>
                </div>
              </div>
            </div>

            <div
              className="mt-5"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>
            <div className="d-flex justify-content-end">
              <Button
                // onClick={e => this.downloadPost(e)}
                onClick={() => {
                  this.handleModal();
                }}
                className="mt-2 shadow-none d-flex justify-content-end"
                variant="secondary"
              >
                Send Email as PDF
              </Button>
              <Modal
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(5px)",
                }}
                show={this.state.show}
              >
                <Modal.Dialog className="w-100 px-2">
                  <Modal.Header>
                    <Modal.Title>Send Email</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="blog-form" className="mt-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control size="lg" placeholder="Recipient Email" />
                      </Form.Group>
                    </Form>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button
                      onClick={() => {
                        this.handleModal();
                      }}
                      variant="secondary"
                    >
                      Close
                    </Button>
                    <Button variant="primary">Save changes</Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal>
            </div>
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
