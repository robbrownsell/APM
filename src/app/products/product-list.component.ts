import {Component, OnDestroy, OnInit} from "@angular/core";
import {IProduct} from "./product";
import {ProductService} from "./product.service";
import {Subscription} from "rxjs";


@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
  }
)
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = "Product List";
  imageWidth = 50;
  imageMargin = 2;
  showImage: boolean = false;
  sub!: Subscription;
  private errorMessage: string = "";


  constructor(private productService: ProductService) {}

  private _listFilter: string = '';

  get listFilter(): string {
    return this._listFilter
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log(`In setter ${value}`)
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];

  products: IProduct[] = [];

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLowerCase().includes(filterBy));
  }

  ngOnInit(): void {
    console.log('on init');
    this.sub = this.productService.getProducts().subscribe({
        next: products => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error: err => this.errorMessage = err
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  onRatingClicked(message: string): void {
    this.pageTitle = `Product List ${message}`
  }
}
