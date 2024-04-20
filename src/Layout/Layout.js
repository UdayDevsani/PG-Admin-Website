import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import AddTenents from '../Pages/AddTenents';
import Home from './Home';
function Layout() {
  return (
    <div>
      <div class="container-scroller">
      <Header />
      <div class="container-fluid page-body-wrapper">
      <Sidebar />
      <div className="main-panel">
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-customer" element={<AddTenents />} />
          </Routes>
          <Footer />
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Layout;
