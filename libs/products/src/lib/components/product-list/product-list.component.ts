import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '@demo-app/data-models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() products: Product[];
  @Output() filter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onFilter(category: string) {
    this.filter.emit(category);
  }

}
