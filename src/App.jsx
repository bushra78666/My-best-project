import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Details from './Components/Details';
import Home from './Components/Home';
import Edit from './Components/Edit';
import Nav from './Components/Nav';
import Create from './Components/Create';

const App = () => {
  const { search, pathname } = useLocation();
  console.log(search, pathname);

  return (
    <div className="min-h-screen w-full flex relative ">
      {pathname !== '/' || search.length > 0 ? (
        <Link
          to="/"
          className="absolute top-4 left-[15%] px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Home
        </Link>
      ) : null}

      <Nav />
      
      <div className="flex-grow p-3 sm:p-7 overflow-auto  flex">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
