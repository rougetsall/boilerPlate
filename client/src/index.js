import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { Route, Switch,Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware
} from 'connected-react-router';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import * as serviceWorker from './serviceWorker';
// Import your reducers and routes here
import book from './reducers/book/'
import bookRoutes from './routes/book'
import Welcome from './Welcome';

const history = createBrowserHistory();
const store = createStore(
  combineReducers({
    router: connectRouter(history),
    form,
    book
    /* Add your reducers here */
  }),
  applyMiddleware(routerMiddleware(history), thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={Welcome} strict={true} exact={true}/>
        {/* Add your routes here */}
        {bookRoutes}
          <li>
            <Link to="/login">Login</Link>
          </li>
        <Route render={() => <h1>Not Found</h1>} />
      
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
