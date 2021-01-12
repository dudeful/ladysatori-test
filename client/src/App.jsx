import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ClassRoom from './components/Course/ClassRoom';
import YogaClasses from './components/YogaClasses';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/class-room' component={ClassRoom} exact />
          <Route path='/' component={YogaClasses} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
