import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ProductsState } from '../../+state';
import { Observable } from 'rxjs';
import { Product } from '@demo-app/data-models';
import { LoadProducts } from '../../+state/products.actions';
import { productsQuery } from '../../+state/products.selectors';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]>;
  selectedProducts$: Observable<Product>;

  constructor(
    private store: Store<ProductsState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadProducts());
    this.products$ = this.store.pipe(select(productsQuery.getProducts));
    this.selectedProducts$ = this.store.pipe(select(productsQuery.getSelectedProduct))
  }

  updateUrlFilters(category: string) {
    const navigationExtras: NavigationExtras = {
      replaceUrl: true,
      queryParams: { category }
    }

    this.router.navigate(['/products'], navigationExtras);
  }

}
