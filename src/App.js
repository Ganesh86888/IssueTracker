import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import { Suspense, lazy } from 'react';
import NavBar from "./components/layout/NavBar";
import {
  BrowserRouter,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import AddIssue from "./components/users/AddIssue";
import UpdateIssue from "./components/users/UpdateIssue";
import ViewForm from "./components/users/ViewForm";
import Profile from "./components/layout/Profile"
const Chart = lazy(() => import('./components/pages/Chart'));
const About=lazy(()=>import('./components/pages/About'));

function App(props) {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/issues" component={Home} />
          <Route exact path="/users/add" component={AddIssue} />
          <Route exact path="/users/edit/:id" component={UpdateIssue} />
          <Route exact path="/viewissues/:id" component={ViewForm} />
          <Route exact path="/profile" component={Profile}/>
          <Route path="/chart" 
                render={() => (<Suspense fallback={<h1>Loading...</h1>}><Chart/></Suspense>)}
              />
              <Route path="/about" 
                render={() => (<Suspense fallback={<h1>Loading...</h1>}><About/></Suspense>)}
              />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;