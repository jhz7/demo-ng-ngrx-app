import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsData, selectAllProducts, selectProductEntities, getSelectedProductId } from './products.reducer';

const getProductsState = createFeatureSelector<ProductsData>('products');

const getProducts = createSelector(
  getProductsState,
  selectAllProducts
);

const getProductEntities = createSelector(
  getProductsState,
  selectProductEntities
)

const getSelecteddProductId = createSelector(
  getProductsState,
  getSelectedProductId
)

const getSelectedProduct = createSelector(
  getProductEntities,
  getSelecteddProductId,
  (productsDictionary, id) => productsDictionary[id]
)

export const productsQuery = { 
  getProducts,
  getProductEntities,
  getSelecteddProductId,
  getSelectedProduct
};