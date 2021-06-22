import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Login';
import SignVerification from './pages/SignVerification';
import UserHome from './pages/UserHome';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/AdminDashboard/Dashboard';


function App() {
    return (

        <Router>
            <Switch>
                <Route path="/" exact={true} component={LandingPage} />
                <Route path="/user-signup" exact={true} component={Signup} />
                <Route path="/sign-verification" exact={true} component={SignVerification} />
                <Route path="/user-home" exact={true} component={UserHome} />
                <Route path="/admin-login" exact={true} component={AdminLogin} />
                <Route path="/admin-dashboard" exact={true} component={Dashboard} />
                {/* <Route path="*" component={Error404} /> */}
            </Switch>
        </Router>




    )
}

export default App;