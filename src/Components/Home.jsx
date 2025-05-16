import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductContext } from '../Utils/Context';
import Loading from './Loading';
import axios from '../utils/axios';

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
    <>
      <div className="h-auto  p-5 md:p-10 pt-5 flex flex-wrap overflow-x-hidden overflow-y-auto">
        {filteredProducts && filteredProducts.map((p) => (
          <Link
            key={p.id}
            to={`/details/${p.id}`}
            className="mr-3 mb-3 card p-3 border shadow rounded h-[30vh] w-auto sm:h-auto flex justify-center items-center flex-col"
          >
            <div
              className="hover:scale-110 mb-3 w-full h-full bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage: `url(${p.image})`,
              }}
            ></div>
            <h1 className="hover:text-blue-300 text-[15px] sm:text-[25px]">{p.title}</h1>
          </Link>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
