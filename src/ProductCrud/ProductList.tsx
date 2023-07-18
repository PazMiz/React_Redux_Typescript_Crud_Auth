import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../types/store';
import { fetchProducts, createProduct } from './productAPI';
import { Product } from './productsSlice';
import './ProductList.css'; // Import the CSS file for the component

const ProductList: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.list);
  const dispatch: AppDispatch = useDispatch();
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    category: 0,
    image: '',
    desc: '',
    price: 0,
    createdTime: '', // Add this line
    shortDescription: '',
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProducts());
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleAddProduct = async () => {
    try {
      await dispatch(createProduct(newProduct));
      console.log('Product created successfully');
      setNewProduct(newProduct); // Reset the new product form
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <hr />
      <hr />
      <h2>Paz Crud Redux Product List</h2>
      {products.map((product: Product) => (
        <div key={product.id}>
          <p>{product.desc} - {product.category} - ${product.price}</p>
          <img src={product.image} alt={product.desc} style={{ width: '200px', height: '200px' }} />
        </div>
      ))}

      <h2>Add Product</h2>
      <input type="text" name="desc" value={newProduct.desc} onChange={handleChange} placeholder="Description" />
      <input type="number" name="category" value={newProduct.category} onChange={handleChange} placeholder="Category" />
      <input type="number" name="price" value={newProduct.price} onChange={handleChange} placeholder="Price" />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default ProductList;
