import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';

function App() {
  return (
	<BrowserRouter>
	 	<Routes>
			<Route
				path="/login"
				element={<LoginPage/>}
			/>
	  	</Routes>
	</BrowserRouter>
  );
}

export default App;
