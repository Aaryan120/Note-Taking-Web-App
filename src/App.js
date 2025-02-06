import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Favorite from './pages/Favorite';
import VerifyEmail from './pages/verify-email';
import HomeDashboard from './pages/HomeDashboard';
import OpenRoute from './components/Auth/OpenRoute';
import ForgotPassword from './pages/forgot-password';
import UpdatePassword from './pages/UpdatePassword';

function App() {
  return (
    <div className='h-screen w-screen'>
      <Routes>
        <Route path="/" element=
        {<OpenRoute>
            <Home/>
          </OpenRoute>} ></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>} ></Route>
        <Route path="/verify-email" element={<VerifyEmail/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
        <Route path="reset-password/:id" element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        />
        <Route element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
          }>
            <Route path='/dashboard/home' element={<HomeDashboard/>}></Route>
            <Route path="/dashboard/favorite" element={<Favorite/>}></Route>
          </Route>


      </Routes>
    </div>
  );
}

export default App;
