import './App.css';
import Footer from './components/footer/footer'
import Header from './components/header/header'
import Inicio from './components/inicio/inicio'
import Formulario from './components/formulario/formulario'
import Estadistica from './components/estadistica/estadistica'

import { Provider } from 'react-redux';
import store from './redux/store';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  console.log(store.getState());
  store.subscribe(() => {
    console.log('Cambio de estado: ', store.getState());
  })

  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/">
              <Inicio />
            </Route>
            <Route path="/inicio">
              <Inicio />
            </Route>
            <Route path="/formulario">
              <Formulario />
            </Route>
            <Route path="/estadistica">
              <Estadistica />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Provider>
    </Router>
  );
}

export default App;
