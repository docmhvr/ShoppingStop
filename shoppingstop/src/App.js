import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import {Routes, Route} from 'react-router-dom'
import Products from './component/Products';
import Product from './component/Product';
import Cart from './component/Cart';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route exact path='/' Component={Home} />
      <Route exact path='/Home' Component={Home} />
      <Route exact path='/products' Component={Products} />
      <Route exact path='/products/:id' Component={Product} />
      <Route exact path="/cart" Component={Cart} />
    </Routes>
    </>
  );
}

export default App;
