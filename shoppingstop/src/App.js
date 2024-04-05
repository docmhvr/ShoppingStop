import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import {Routes, Route} from 'react-router-dom'
import Products from './component/Products';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route exact path='/' Component={Home} />
      <Route exact path='/products' Component={Products} />
    </Routes>
    <Home/>
    </>
  );
}

export default App;
