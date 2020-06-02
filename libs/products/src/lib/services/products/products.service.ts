import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '@demo-app/data-models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsPath = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProducts(category = null): Observable<Product[]> {
    const url = (category !== null)?
      `${this.productsPath}?category=${category}`:
      this.productsPath;

    return this.http.get<Product[]>(url);
  }
}
