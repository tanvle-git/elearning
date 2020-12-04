import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Detail from './pages/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path='/detail/:id' component={Detail} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
