import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

const DishWithId = (props) => {
  console.log('Hey');
  return(
      <DishDetail dish={props.dishes.filter((dish) => dish.id === parseInt(props.match.params.dishId,10))[0]} 
        comments={props.comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishId,10))} />
  );
};

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        comments: COMMENTS,
        promotions: PROMOTIONS,
        leaders: LEADERS
    };
  };

  render() {
    return (
      <div>
        <Header />
        <Switch>
              <Route path='/home' render={(props) => <Home {...props} dish = {this.state.dishes.filter(dish => dish.featured)[0]}
              promotion = {this.state.promotions.filter(promotion => promotion.featured)[0]}
              leader = {this.state.leaders.filter(leader => leader.featured)[0]}
               />} />
              <Route exact path='/menu' render={(props) => <Menu {...props} dishes={this.state.dishes} />} />
              <Route path='/menu/:dishId' render={(props) => <DishWithId {...props} dishes={this.state.dishes} comments={this.state.comments}/>} />
              <Route exact path='/contactus' component={Contact} />
              <Route path='/aboutus' render={(props) => <About {...props} leaders={this.state.leaders} />} />
              <Redirect to="/home" />
        </Switch>
       <Footer />
      </div>
    );
  }
}

export default Main;