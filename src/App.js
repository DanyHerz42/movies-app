import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Login';
import SignVerification from './pages/SignVerification';
import UserHome from './pages/UserHome';


function App() {
    return (

        <Router>
            <Switch>
                <Route path="/" exact={true} component={LandingPage} />
                <Route path="/user-signup" exact={true} component={Signup} />
                <Route path="/sign-verification" exact={true} component={SignVerification} />
                <Route path="/user-home" exact={true} component={UserHome} />
                {/* <Route path="*" component={Error404} /> */}
            </Switch>
        </Router>




    )
}

export default App;