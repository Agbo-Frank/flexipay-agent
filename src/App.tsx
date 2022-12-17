import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {  RequireAuth } from './components/material';
import { AuthProvider } from './context/auth';

import { 
  AuthRoute,  SettingPage, Users,
  Wallet, Dashboard
} from './pages';
// import ResetPassword from './pages/Auth/ResetPassword';
import VerifyEmail from './pages/auth/verifyEmail';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Navigate to="/dashboard" replace={true} />} />
        <Route path='/user' element={<RequireAuth><Users /></RequireAuth>} />
        <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path='/setting/*' element={<RequireAuth><SettingPage /></RequireAuth>} />
        {/* <Route path='/setting/*' element={<SettingPage />} /> */}
        <Route path='/wallet' element={<RequireAuth><Wallet /></RequireAuth>} />
        <Route path='/auth/*' element={<AuthRoute />} />
        <Route path='/verify/email' element={<VerifyEmail />} />
        {/* <Route path='/reset-password' element={<ResetPassword />} /> */}
        <Route path='*' element={<Navigate to="/dashboard" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App
