import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import { BrowserRouter as Router,Switch,  Route } from 'react-router-dom';

//******** Layouts ********
import AuthLayout from './components/layouts/AuthLayout';
import PublicLayout from "./components/layouts/PublicLayout";
import PrivateLayout from "./components/layouts/PrivateLayout";
//************************************************************ */

import Index from './pages/Index';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminIndex from './pages/admin/AdminIndex';



function App(){
  return (
    <div className="App">
        <Router>
          <Switch>

            <Route path={["/admin","/admin/users"]}>
              <PrivateLayout>
                <Switch>
                  <Route path="/admin">
                    <AdminIndex/>
                  </Route>
                </Switch>
              </PrivateLayout>
            </Route>

            <Route path={["/login","/register"]} exact>
             <AuthLayout>
                <Switch>
                  <Route path='/login'>
                    <Login></Login>
                  </Route>
                  <Route path="/register">
                    <Register></Register>
                  </Route>
                </Switch>
             </AuthLayout>
            </Route>

            <Route path={["/"]}>
              <PublicLayout>
                <Index></Index>
              </PublicLayout>
            </Route>
          </Switch>

        </Router>
    </div>
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