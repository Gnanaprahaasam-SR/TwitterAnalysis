import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Post from './pages/Post';
import DashBoard from './pages/Dashboard';




function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path='/home/:username' element={<Home/>}/>
      <Route path="/post/:username" element={<Post/>}/>
      <Route path='/data/:username?/:tweetId?' element={<DashBoard/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
