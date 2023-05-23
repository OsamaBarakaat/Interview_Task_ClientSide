import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Error from './pages/notFound/NotFound';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <Home></Home>
      <Routes>
        {/* <Route path="/" component={<Home />} /> */}
        <Route path='Footer' component={<Footer />} />
        <Route path='*' component={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
