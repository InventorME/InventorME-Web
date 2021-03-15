import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProfilePage from './navigationBanner/profilePage/ProfilePage';
import ItemsPage from './navigationBanner/itemsPage/ItemsPage';
import SignInPage from './signinPage/SignInPage';
import AboutPage from './navigationBanner/aboutPage/AboutPage';
import CreateAcctPage from './createacctPage/CreateAcctPage';
import { Account } from './util/Accounts';
import Collections from './navigationBanner/collections/Collections';

ReactDOM.render(
   <BrowserRouter>
   <Switch>
     <Account>
      <Route exact path="/" component={App}/>
      <Route path="/items-page" component={ItemsPage}/>
      <Route path="/profile-page" component={ProfilePage}/>
      <Route path= "/about-page" component = {AboutPage}/>
      <Route path = "/signin-page" component = {SignInPage}/>
      <Route path = "/createacct-page" component = {CreateAcctPage}/>
      <Route path="/collections" component={Collections}/>
      </Account>
  </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
