import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import LoginPage from './components/LoginPage'
import PopularPage from './components/PopularPage'
import ProtectedRoute from './components/ProtectedRoute'
import ParticularMoviePage from './components/ParticularMoviePage'
import SearchPage from './components/SearchPage'
import AccountPage from './components/AccountPage'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={PopularPage} />
    <ProtectedRoute exact path="/movies/:id" component={ParticularMoviePage} />
    <ProtectedRoute exact path="/search" component={SearchPage} />
    <ProtectedRoute exact path="/account" component={AccountPage} />
    <Route component={NotFound} />
  </Switch>
)

export default App
