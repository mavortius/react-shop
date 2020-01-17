import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header";
import AdminPage from "./admin/AdminPage";
import ProductsPage from "./products/ProductsPage";
import ProductPage from "./products/ProductPage";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";

const Routes = () => {
  const [loggedIn] = React.useState(true);

  return (
    <Router>
      <div>
        <Header/>
        <Switch>
          <Redirect exact from="/" to="/products"/>
          <Route path="/products" exact component={ProductsPage}/>
          <Route path="/products/:id" component={ProductPage}/>
          <Route path="/admin">{loggedIn ? <AdminPage/> : <Redirect to="/login"/>}</Route>
          <Route path="/login" component={LoginPage}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    </Router>
  )
};
export default Routes
