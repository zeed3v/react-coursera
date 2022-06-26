import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      isCommentOpen: false
    };
    this.toggleComment = this.toggleComment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleComment() {
    this.setState({
      isCommentOpen: !this.state.isCommentOpen
    })
  }

  handleSubmit(values) {
    this.toggleComment();
    alert(JSON.stringify(values));
  }

  render() {
    return (
        <div>
            <Button color="secondary" outline onClick={this.toggleComment}>
                <span className="fa fa-pencil fa-lg">Submit Comment</span>
            </Button>
            <Modal isOpen={this.state.isCommentOpen} toggle={this.toggleComment}>
                <ModalHeader toggle={this.toggleComment}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label md={12} htmlFor="rating">Rating</Label>
                            <Col md={12}>
                                <Control.select model=".rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label md={12} htmlFor="author">Your Name</Label>
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors className="text-danger" model=".author" show="touched" 
                                    messages={{
                                        required: 'Required ',
                                        minLength: 'Must be greater than 3 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label md={12} htmlFor="comment">Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6" 
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        <Button type="submit" value="submit" color="primary">Submit</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
    );
  }
  }

  function RenderDish({ dish }) {
    if (dish == null) return ( <div></div> );

    return (
      <Card>
        <CardImg top src={ dish.image } alt={ dish.name } />
        <CardBody>
          <CardTitle>{ dish.name }</CardTitle>
          <CardText>{ dish.description }</CardText>
        </CardBody>
      </Card>
    );
  }

  function RenderComments({ comments }) {
    if (comments == null) return ( <div></div> );

    return(
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          <div>
            {comments.map((comment) => {
              return(
                <div>
                  <li key = {comment.id}>
                    <p>{comment.comment}</p>
                    <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                  </li>
                </div>
              );
            })}
          </div>
        </ul>
        <CommentForm />
      </div>
  );
  }
 
  const DishDetail = (props) => {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{ props.dish.name }</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{ props.dish.name }</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={ props.dish } />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={ props.comments } />
          </div>
        </div>
      </div>
    );
  }

export default DishDetail;