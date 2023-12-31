import { createSlice } from '@reduxjs/toolkit'
import { createProduct,getAllProducts,getOneProduct ,getProductsLookLike ,deleteProduct,updateProduct,getAllProductsByCategory, getAllProductsByBrand} from './ProductThunk'

const initialState = {
    products: [],
    product:[],
    updateProduct:[],
    productByCategory: [],
    productByBrand: []
}

 const productSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers:{

    [getAllProducts.fulfilled]:(state,action)=>{
      state.products = action.payload
    },
    [getAllProducts.rejected]:(state,action)=>{
      state.products = action.payload
    },
    [getAllProductsByCategory.fulfilled]:(state,action)=>{
      state.productByCategory = action.payload
    },
    [getAllProductsByCategory.rejected]:(state,action)=>{
      state.productByBrand = action.payload
    },
    [getAllProductsByBrand.fulfilled]:(state,action)=>{
      state.productByBrand = action.payload
    },
    [getAllProductsByBrand.rejected]:(state,action)=>{
      state.productByCategory = action.payload
    },
    [getProductsLookLike.fulfilled]:(state,action)=>{
      state.products = action.payload
    },
    [getProductsLookLike.rejected]:(state,action)=>{
      state.products = action.payload
    },
    [createProduct.fulfilled]:(state,action)=>{
      state.products = action.payload
    },
    [createProduct.rejected]:(state,action)=>{
      state.products = action.payload
    },
    [getOneProduct.fulfilled]:(state,action)=>{
      state.product = action.payload
    },
    [getOneProduct.rejected]:(state,action)=>{
      state.product = action.payload
    },
    [deleteProduct.fulfilled]:(state,action)=>{
      state.products.data = state?.products?.data?.filter((value)=>value._id !== action.payload.id)
    },
    [deleteProduct.rejected]:(state,action)=>{
      state.products = action.payload
    },
    [updateProduct.fulfilled]:(state,action)=>{
      state.updateProduct = action.payload
    },
    [updateProduct.rejected]:(state,action)=>{
      state.updateProduct = action.payload
    },
  }
})




export default productSlice.reducer