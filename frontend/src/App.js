import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import './App.css';
import AdminPanel from './components/AdminPanel';
import CryptoMarket from './components/CryptoMarket';
import OrderBook from './components/OrderBook';
import UserPanel from './components/UserPanel';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/admin" component={Admin} />
        <Route path="/admin-panel" component={AdminPanel} />
        <Route path="/crypto-market" component={CryptoMarket} />
        <Route path="/order-book" component={OrderBook} />
        <Route path="/user-panel" component={UserPanel} />
      </Switch>
    </Router>
  );
}

export default App;