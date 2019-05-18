import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addComment, deleteComment } from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => ({
  
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId))
  
  });

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const DishWithId = (props) => {
  console.log('hi');
  return(
      <DishDetail dish={props.dishes.filter((dish) => dish.id === parseInt(props.match.params.dishId,10))[0]} 
        comments={props.comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishId,10))} 
        addComment={props.addComment}
        deleteComment={props.deleteComment}
        />
  );
};

class Main extends Component {
  render() {
    console.log('Hi');
    return (
      <div>
        <Header />
        <Switch>
              <Route path='/home' render={(props) => <Home {...props} dish = {this.props.dishes.filter(dish => dish.featured)[0]}
              promotion = {this.props.promotions.filter(promotion => promotion.featured)[0]}
              leader = {this.props.leaders.filter(leader => leader.featured)[0]}
               />} />
              <Route exact path='/menu' render={(props) => <Menu {...props} dishes={this.props.dishes}/>} />
              <Route path='/menu/:dishId' render={(props) => <DishWithId {...props} dishes={this.props.dishes} comments={this.props.comments} 
                                                              addComment={this.props.addComment} deleteComment={this.props.deleteComment}/>} />
              <Route exact path='/contactus' component={Contact} />
              <Route path='/aboutus' render={(props) => <About {...props} leaders={this.props.leaders} />} />
              <Redirect to="/home" />
        </Switch>
       <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));  