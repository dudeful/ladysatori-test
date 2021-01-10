import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ClassRoom from './components/Course/ClassRoom';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/' component={ClassRoom} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
