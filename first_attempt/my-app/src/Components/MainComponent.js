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

import { deleteComment, fetchDishes, fetchComments, fetchPromos, postComment, fetchLeaders, postFeedback } from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => ({
  
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    fetchDishes: () => dispatch(fetchDishes()),
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message))
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
        postComment={props.postComment}
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
    this.props.fetchLeaders();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
              <Route path='/home' render={(props) => <Home {...props} dish = {this.props.dishes.dishes.filter(dish => dish.featured)[0]}
              promotion = {this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
              leader = {this.props.leaders.leaders.filter(leader => leader.featured)[0]}
              dishLoading={this.props.dishes.isLoading}
              dishErrMess={this.props.dishes.errMess}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leaderLoading={this.props.leaders.isLoading}
              leaderErrMess={this.props.leaders.errMess}
               />} />
              <Route exact path='/menu' render={(props) => <Menu {...props} dishes={this.props.dishes.dishes} isLoading={this.props.dishes.isLoading}
              errMess={this.props.dishes.errMess} />} />
              <Route path='/menu/:dishId' render={(props) => <DishWithId {...props} dishes={this.props.dishes} comments={this.props.comments} 
                                                              postComment={this.props.postComment} deleteComment={this.props.deleteComment}/>} />
              <Route exact path='/contactus' render={(props) => <Contact {...props} postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm} />} />
              <Route path='/aboutus' render={(props) => <About {...props} leaders={this.props.leaders.leaders} 
              isLoading={this.props.leaders.isLoading} errMess={this.props.leaders.errMess}/>} />
              <Redirect to="/home" />
        </Switch>
       <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));  