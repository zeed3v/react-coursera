import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
  
      renderDish(dish) {
        if (dish != null) {
            return(
                <div>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
            
        }
      }

      RenderComments(comments) {
        if (comments != null) {
          return (
            <div className='container'>
              <h4>Comments</h4>
              <ul className="list-unstyled">
                  {comments.comments.map((comment) => {
                    return (
                      <div key={comment.id}>
                        <li>
                          <p> { comment.comment } </p>
                          <p> { comment.author }, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))} </p>
                        </li>
                      </div>
                    );
                  })}
              </ul>
            </div>
          );
        } 
        else {
          return (
            <div />
          );
        }
      }
      render(){
          return(
              <div className="container">
                  <div className="row">
                      <div className="col-12 col-md-5 m-1">
                          {this.renderDish(this.props.dish)}
                      </div>
                      <div className="col-md-5 m-1">
                          {this.RenderComments(this.props.dish)}
                      </div>
                  </div>
              </div>
          );
      }
}



export default DishDetail;