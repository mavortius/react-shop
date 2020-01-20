import React, { Suspense } from "react";
import { BrowserRouter as Router, Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Header from "./Header";
import ProductsPage from "./products/ProductsPage";
import ProductPage from "./products/ProductPage";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";
import ContactUsPage from "./contact-us/ContactUsPage";

const AdminPage = React.lazy(() => import("./admin/AdminPage"));

const Routes: React.FC<RouteComponentProps> = (props) => {
  const [loggedIn] = React.useState(true);

  return (
    <div>
      <Header/>
      <TransitionGroup>
        <CSSTransition key={props.location.key} timeout={500} classNames="animate">
          <Switch>
            <Redirect exact from="/" to="/products"/>
            <Route path="/products" exact component={ProductsPage}/>
            <Route path="/products/:id" component={ProductPage}/>
            <Route path="/contactus" component={ContactUsPage}/>
            <Route path="/admin">{loggedIn ? (
              <Suspense fallback={<div className="page-container">Loading...</div>}>
                <AdminPage/>
              </Suspense>
            ) : (
              <Redirect to="/login"/>
            )}</Route>
            <Route path="/login" component={LoginPage}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
};

const RoutesWrapper = () => {
  return (
    <Router>
      <Route component={Routes}/>
    </Router>
  )
};
export default RoutesWrapper
