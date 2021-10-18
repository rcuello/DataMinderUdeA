import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.css";
import './App.css';
/*import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";*/

import { BrowserRouter as Router,Switch,  Route } from 'react-router-dom';
//import Login from './components/login/login';
//import Footer from "./components/footer/Footer";
//import Header from "./components/header/Header";
//import Menu from "./components/menu/Menu";

//import RegisterUser from "./components/user/register/register";

//import { Container } from 'reactstrap';
import Index from './pages/Index';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';


function App(){
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/registerUser">
              <RegisterUser/>
            </Route>
            <Route path="/">
              <Index/>
            </Route>
            
          </Switch>

        </Router>
    </div>
  )

}
/*function App() {
  return (
    <div  className="sb-nav-fixed">
    <BrowserRouter>
      <Container>
        <Header />
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <Menu></Menu>
          </div>
          <div id="layoutSidenav_content">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={RegisterUser} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/users" component={Login} />
              <Route component={Login} />
            </Switch>
          </div>
        </div>
        
        <Footer />
      </Container>
    </BrowserRouter>
    </div>
  );
}*/

/*function App() {
  return (
    <div  className="sb-nav-fixed">
    <BrowserRouter>
      <Container>
        <Header />
        <hr />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={RegisterUser} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/users" component={Login} />
          <Route component={Login} />
        </Switch>
        <Footer />
      </Container>
    </BrowserRouter>
    </div>
  );
}*/

export default App;
