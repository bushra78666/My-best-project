import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductContext } from '../Utils/Context';
import Loading from './Loading';
import axios from '../Utils/axios.jsx';

const Home = () => {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = search ? decodeURIComponent(search.split('=')[1]) : null;

  const [filteredProducts, setFilteredProducts] = useState(products);

  const getProductsByCategory = async () => {
    try {
      if (category && category !== 'undefined') {
        const { data } = await axios.get(`/products/category/${category}`);
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    if (!category || category === 'undefined') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
      getProductsByCategory();
    }
  }, [category, products]);

  return products ? (
    <div className="min-h-screen w-full px-4 py-6 sm:px-6 md:px-10 lg:px-16 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts &&
          filteredProducts.map((p) => (
            <Link
              key={p.id}
              to={`/details/${p.id}`}
              className="group border rounded-xl shadow hover:shadow-md transition duration-300 bg-white p-4 flex flex-col items-center justify-center"
            >
              <div
                className="w-full h-40 sm:h-44 md:h-48 bg-contain bg-no-repeat bg-center mb-4 transform group-hover:scale-105 transition"
                style={{
                  backgroundImage: `url(${p.image})`,
                }}
              ></div>
              <h1 className="text-sm sm:text-base md:text-lg text-center text-gray-800 group-hover:text-blue-500 transition">
                {p.title}
              </h1>
            </Link>
          ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Home;
