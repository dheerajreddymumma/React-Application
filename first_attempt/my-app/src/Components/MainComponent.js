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
import { actions } from 'react-redux-form';

import { addComment, deleteComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => ({
  
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => { dispatch(fetchComments())},
    fetchPromos: () => dispatch(fetchPromos())
  });

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const DishWithId = props => {
  return(
      <DishDetail dish={props.dishes.dishes.filter((dish) => dish.id === parseInt(props.match.params.dishId,10))[0]} 
        comments={props.comments.comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishId,10))} 
        addComment={props.addComment}
        deleteComment={props.deleteComment}
        isLoading = {props.dishes.isLoading}
        commentsErrMess={props.comments.errMess}
        errMess={props.dishes.errMess}
        />
  );
};

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
              <Route path='/home' render={(props) => <Home {...props} dish = {this.props.dishes.dishes.filter(dish => dish.featured)[0]}
              promotion = {this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
              leader = {this.props.leaders.filter(leader => leader.featured)[0]}
              dishLoading={this.props.dishes.isLoading}
              dishErrMess={this.props.dishes.errMess}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
               />} />
              <Route exact path='/menu' render={(props) => <Menu {...props} dishes={this.props.dishes.dishes} isLoading={this.props.dishes.isLoading}
              errMess={this.props.dishes.errMess} />} />
              <Route path='/menu/:dishId' render={(props) => <DishWithId {...props} dishes={this.props.dishes} comments={this.props.comments} 
                                                              addComment={this.props.addComment} deleteComment={this.props.deleteComment}/>} />
              <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
              <Route path='/aboutus' render={(props) => <About {...props} leaders={this.props.leaders} />} />
              <Redirect to="/home" />
        </Switch>
       <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));  