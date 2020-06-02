import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';

import { ProductsActionTypes, LoadProductsSuccess, LoadProductsFail } from './products.actions';
import { mergeMap, map, catchError, filter } from 'rxjs/operators';
import { ProductsService } from '../services/products/products.service';
import { Product } from '@demo-app/data-models';
import { of } from 'rxjs';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

@Injectable()
export class ProductsEffects {

  @Effect()
  loadProducts$ =
    this.actions$.pipe(
      ofType(ProductsActionTypes.LoadProducts),
      mergeMap(() => 
        this.productsService.getProducts().pipe(
          map((products: Product[]) => new LoadProductsSuccess(products)),
          catchError(error => of(new LoadProductsFail(error)))
        )
      )
    );

    @Effect()
    loadFilteredProducts$ = this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) => r.payload.routerState.url.startsWith('/products')),
      map((r: RouterNavigationAction) => r.payload.routerState.root.queryParams['category']),
      mergeMap((category: string) =>
        this.productsService
          .getProducts(category)
          .pipe(
            map((products: Product[]) => new LoadProductsSuccess(products)),
            catchError(error => of(new LoadProductsFail(error)))
          )
      )
    );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}
