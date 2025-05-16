import React, { useContext, useState } from 'react';
import { nanoid } from 'nanoid';
import { ProductContext } from '../Utils/Context';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(ProductContext);
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 5 ||
      price.trim().length < 1 ||
      description.trim().length < 5
    ) {
      alert('Each and every input must have at least 4 characters');
      return;
    }

    const product = {
      id: nanoid(),
      image,
      title,
      category,
      price,
      description,
    };

    setproducts([...products, product]);
    localStorage.setItem('products', JSON.stringify([...products, product]));
    toast.success('product Added successfully');
    navigate('/');
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="flex flex-col items-center w-full max-w-4xl mx-auto px-4 py-6"
    >
      <h1 className="mb-5 w-full text-2xl sm:text-3xl text-center sm:text-left">
        Add New Product
      </h1>

      <input
        type="url"
        placeholder="Image Link"
        className="text-base bg-zinc-100 rounded p-3 w-full mb-3"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />
      <input
        type="text"
        placeholder="Title"
        className="text-base bg-zinc-100 rounded p-3 w-full mb-3"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-3 mb-3">
        <input
          type="text"
          placeholder="Category"
          className="text-base bg-zinc-100 rounded p-3 w-full sm:w-1/2"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        <input
          type="number"
          placeholder="Price"
          className="text-base bg-zinc-100 rounded p-3 w-full sm:w-1/2"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </div>

      <textarea
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter product description here.."
        value={description}
        className="text-base bg-zinc-100 rounded p-3 w-full mb-3"
        rows="10"
      ></textarea>

      <div className="w-full text-center sm:text-left">
        <button
          type="submit"
          className="py-2 px-6 border border-blue-200 text-blue-300 rounded"
        >
          Add New Product
        </button>
      </div>
    </form>
  );
};

export default Create;
