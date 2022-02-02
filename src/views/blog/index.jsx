import React, { Component } from "react";
import { Container, Image, Button } from "react-bootstrap";
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
  };
  componentDidMount() {
    this.fetchDataBlog();
    this.fetchPdfData();
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
      const response = await fetch(`http://localhost:3001/posts`);
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

  fetchPdfData = async () => {
    try {
      const { id } = this.props.match.params;
      const res = await fetch(`http://localhost:3001/posts/download/${id}`);
      if (res.ok) {
        const pdfData = res.json();
        console.log(pdfData);
        console.log("PDF DATA");
      } else {
        console.log("Fetching PDF data error!");
      }
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
                  <Button className="w-100 mt-2 shadow-none" variant="info">
                    Get PDF
                  </Button>
                </div>
              </div>
            </div>

            <div
              className="mt-5"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
