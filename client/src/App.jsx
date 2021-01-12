import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ClassRoom from './components/Course/ClassRoom';
import YogaClasses from './components/YogaClasses';
import MasterClasses from './components/MasterClasses/MasterClasses';
import LiveClasses from './components/LiveClasses/LiveClasses';
import UserProfile from './components/User/UserProfile';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/class-room' component={ClassRoom} exact />
          <Route path='/live-classes' component={LiveClasses} exact />
          <Route path='/master-classes' component={MasterClasses} exact />
          <Route path='/user-profile' component={UserProfile} exact />
          <Route path='/' component={YogaClasses} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
