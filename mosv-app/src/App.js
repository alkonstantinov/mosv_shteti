import React from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { AppRoute } from './routes/AppRoute';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoute />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
