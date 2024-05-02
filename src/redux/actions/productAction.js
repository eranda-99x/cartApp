import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api';

const PRODUCT_URL = 'products.json';
const FETCHING =  'products/fetchProducts';

const fetchProducts = createAsyncThunk(
  FETCHING,
    async () => {
      const response = await axios.get(PRODUCT_URL);
      return response.data;
    },
  );


export { fetchProducts  }