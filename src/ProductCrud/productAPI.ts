import { AppDispatch } from '../types/store';
import { Product, setProducts, } from './productsSlice';
import { AppThunk, RootState } from '../types/store';
import deleteProduct from './productsSlice';

const BASE_URL = 'http://127.0.0.1:8000/products/';

export const fetchProducts = (): AppThunk => async (dispatch) => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    dispatch(setProducts(data));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = (product: Product): AppThunk<Promise<void>> => async (dispatch) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/products/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    
    // Dispatch an action if needed after successful creation
    // For example: dispatch(addProduct(product));

    // No need to return anything for this specific action
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProductById = async (id: number, product: Product): Promise<Product> => {
  try {
    const response = await fetch(BASE_URL + `${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const updatedProduct = await response.json();
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProductById = async (id: number): Promise<void> => {
  try {
    await fetch(BASE_URL + `${id}/delete/`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
