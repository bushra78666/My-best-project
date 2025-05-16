import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../Utils/Context';

const Edit = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(ProductContext);
  const { id } = useParams();
  const [product, setproduct] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
    category: '',
  });

  const ChangeHandler = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setproduct(products.filter((p) => p.id == id)[0]);
  }, [id]);

  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 5
    ) {
      alert('Each and every input must have at least 4 characters');
      return;
    }

    const pi = products.findIndex((p) => p.id == id);
    const copyData = [...products];
    copyData[pi] = { ...products[pi], ...product };

    setproducts(copyData);
    localStorage.setItem('products', JSON.stringify(copyData));
    navigate(-1);
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="flex flex-col items-center p-5 w-full max-w-4xl mx-auto"
    >
      <h1 className="mb-5 w-full text-2xl sm:text-3xl text-center sm:text-left">
        Edit Product
      </h1>

      <input
        type="url"
        placeholder="Image Link"
        className="text-base bg-zinc-100 rounded p-3 w-full mb-3"
        name="image"
        onChange={ChangeHandler}
        value={product && product.image}
      />
      <input
        type="text"
        placeholder="Title"
        className="text-base bg-zinc-100 rounded p-3 w-full mb-3"
        name="title"
        onChange={ChangeHandler}
        value={product && product.title}
      />

      <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-3 mb-3">
        <input
          type="text"
          placeholder="Category"
          className="text-base bg-zinc-100 rounded p-3 w-full sm:w-1/2"
          name="category"
          onChange={ChangeHandler}
          value={product && product.category}
        />
        <input
          type="number"
          placeholder="Price"
          className="text-base bg-zinc-100 rounded p-3 w-full sm:w-1/2"
          name="price"
          onChange={ChangeHandler}
          value={product && product.price}
        />
      </div>

      <textarea
        onChange={ChangeHandler}
        name="description"
        placeholder="Enter product description here.."
        value={product && product.description}
        className="text-base bg-zinc-100 rounded p-3 w-full mb-3"
        rows="10"
      ></textarea>

      <div className="w-full text-center sm:text-left">
        <button
          type="submit"
          className="py-2 px-6 border border-blue-200 text-blue-300 rounded"
        >
          Edit Product
        </button>
      </div>
    </form>
  );
};

export default Edit;
