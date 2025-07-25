import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import CategoryPage from "./pages/CategoryPage.jsx";
import CartPage from "./pages/CartPage.jsx";

import { useEffect } from "react";
import Navbar from "./components/Navbar";
import LoadingSpinner from './components/LoadingSpinner'

import {Routes,Route,Navigate} from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore.js";
import { useCartStore } from "./stores/useCartStore.js";


function App() {
  
  const {user, checkAuth, checkingAuth}= useUserStore();
  const {getCartItems} = useCartStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  useEffect(()=>{
    getCartItems();
  },[getCartItems])

  if(checkingAuth) return <LoadingSpinner/>

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background gradient */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0 min-h-screen'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
				</div>
			</div>

      <div className='relative z-50 pt-20'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/signup' element={!user ? <SignUpPage/> :  <Navigate to='/'/>}/>
          <Route path='/login' element={!user ?<LoginPage/> : <Navigate to='/'/>}/>
          <Route path='/secret-dashboard' element={user?.role === 'admin' ?<AdminPage/> : <Navigate to='/login'/>}/>
          
          <Route path='/category/:category' element={<CategoryPage />} />
          <Route path='/cart' element={user ? <CartPage />: <Navigate to ='/login'/>} />
        </Routes>
      </div>
    <Toaster/>
      
    </div>
  )
}

export default App
