import {useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import { BrowserRouter as Router,Switch,  Route } from 'react-router-dom';

//******** Layouts ********
import AuthLayout from './components/layouts/AuthLayout';
import PublicLayout from "./components/layouts/PublicLayout";
import PrivateLayout from "./components/layouts/PrivateLayout";
//************************************************************ */
import { Auth0Provider } from "@auth0/auth0-react";

//******** Context ********
import { UserContext } from './context/userContext';
//************************************************************ */

import Index from './pages/Index';
import Login        from './pages/auth/Login';
import Register     from './pages/auth/Register';
import RecoveryPwd  from './pages/auth/RecoveryPwd';

import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import User from './pages/admin/User';
import Products from './pages/admin/Products';
import Sales from './pages/admin/Sales';

import PrivateRoute from './components/routing/PrivateRoute';
import Product from "./pages/admin/Product";
import Sale from "./pages/admin/Sale";


//const redirectUri = window.location.origin+"/admin";
const redirectUri="https://arcane-tundra-59317.herokuapp.com/admin";
  //const redirectUri=process.env.REACT_APP_AUTH_REDIRECT_URI;


function App(){
  const [userData, setUserData] = useState({});

  //var user = {username:"admin",role:"admin"};

  //console.log('response con datos del usuario', user);
  //setUserData(user);
  //console.log(redirectUri);

  return (
    <Auth0Provider
    domain="misiontic-dataminder.us.auth0.com"
    clientId="6aqF3InHWeNUJloZMUxUh6jUdgasqTIx"
    redirectUri={redirectUri}
    audience="api-autenticacion-dataminder-mintic">
      <div className="App">
        <UserContext.Provider value={{ userData, setUserData }}>
          <Router>
            <Switch>

              <Route path={["/admin","/admin/users","/admin/products","/admin/sales"]}>
                <PrivateLayout>
                  <Switch>
                    <Route path="/admin/users" exact>
                      <PrivateRoute roleList={["admin"]}>
                        <Users/>
                      </PrivateRoute>
                    </Route>
                    <Route path="/admin/user/:id" exact>
                      <PrivateRoute roleList={["admin"]}>
                        <User/>
                      </PrivateRoute>
                    </Route>
                    <Route path="/admin/user" exact>
                      <PrivateRoute roleList={["admin"]}>
                        <User/>
                      </PrivateRoute>
                    </Route>
                    <Route path="/admin/user/edit/:id" exact>
                      <PrivateRoute roleList={["admin"]}>
                        <User/>
                      </PrivateRoute>
                    </Route>
                    <Route path="/admin/products" exact>
                      <PrivateRoute roleList={["admin","vendedor"]}>
                        <Products/>
                      </PrivateRoute>
                    </Route>
                    <Route path="/admin/product/edit/:id" exact>
                      <PrivateRoute roleList={["admin","vendedor"]}>
                        <Product/>
                      </PrivateRoute>
                    </Route>
                    <Route path="/admin/product/new" exact>
                      <PrivateRoute roleList={["admin","vendedor"]}>
                        <Product/>
                      </PrivateRoute>
                    </Route>
                    <Route path="/admin/sales/new" exact>
                      <PrivateRoute roleList={["admin","vendedor"]}>
                        <Sale/>
                      </PrivateRoute>
                    </Route>
                    <Route path="/admin/sales" exact>
                      <PrivateRoute roleList={["admin","vendedor"]}>
                        <Sales/>
                      </PrivateRoute>
                    </Route>
                    
                    <Route path="/admin" exact>
                      <PrivateRoute roleList={["admin","vendedor"]}>
                        <Dashboard/>
                      </PrivateRoute>
                    </Route>
                  </Switch>
                </PrivateLayout>
              </Route>

              <Route path={["/login","/register","/recovery"]} exact>
              <AuthLayout>
                  <Switch>
                    <Route path='/login'>
                      <Login></Login>
                    </Route>
                    <Route path="/register">
                      <Register></Register>
                    </Route>
                    <Route path="/recovery">
                      <RecoveryPwd></RecoveryPwd>
                    </Route>
                  </Switch>
              </AuthLayout>
              </Route>

              <Route path={["/index2"]}>
                <PublicLayout>
                  <Index></Index>
                </PublicLayout>
              </Route>

              <Route path={["/"]}>
              <AuthLayout>
                  <Switch>
                    <Route path='/'>
                      <Login></Login>
                    </Route>
                  </Switch>
              </AuthLayout>
              </Route>

            </Switch>

          </Router>
          </UserContext.Provider>
      </div>
    </Auth0Provider>
  )

}


export default App;



/*

  return (
    <div className='App'>
      <Auth0Provider
        domain='test-misiontic.us.auth0.com'
        clientId='TNZt6AQEKyfQH5XOyAXnd5rAaDgwJJiu'
        redirectUri='http://localhost:3000/admin/'
        audience='autenticacion-test-misiontic'
      >
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
          <Router>
            <Switch>
              
              <Route path={['/login', '/registro']}>
                <AuthLayout>
                  <Switch>
                    <Route path='/login'>
                      <Login />
                    </Route>
                    <Route path='/registro'>
                      <Registro />
                    </Route>
                  </Switch>
                </AuthLayout>
              </Route>
              
            </Switch>
          </Router>
        </DarkModeContext.Provider>
      </Auth0Provider>
    </div>
  );
}

export default App;
*/