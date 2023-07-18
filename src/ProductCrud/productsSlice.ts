import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  category: number;
  image: string;
  desc: string;
  price: number;
  createdTime: string;
  shortDescription: string;
}

interface ProductsState {
  list: Product[];
}

const initialState: ProductsState = {
  list: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.list = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.list.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const { id, category, image, desc, price, createdTime, shortDescription } = action.payload;
      const existingProduct = state.list.find((product) => product.id === id);
      if (existingProduct) {
        existingProduct.category = category;
        existingProduct.image = image;
        existingProduct.desc = desc;
        existingProduct.price = price;
        existingProduct.createdTime = createdTime;
        existingProduct.shortDescription = shortDescription;
      }
    },
  },
});

export const { setProducts, addProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
