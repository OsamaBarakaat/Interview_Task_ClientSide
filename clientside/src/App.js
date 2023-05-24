import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Error from './pages/notFound/NotFound';
import Edit from './pages/EditUser/Edit';
import Portfolio from './components/Portfolio/Portfolio';
import AddUser from './pages/AddUser/AddUser';


function App() {
  return (
    <>

      <div className="App">
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='Portfolio' element={<Portfolio />} />
          <Route path='Add' element={<AddUser />} />
          <Route path='Edit/:id' element={<Edit />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
