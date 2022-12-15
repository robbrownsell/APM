import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IProduct} from "./product";
import {ProductService} from "./product.service";

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail'
  product: IProduct | undefined

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {
  }


  onBack() {
    this.router.navigate(["/products"])
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.productService.getProducts().subscribe({
      next:(products: IProduct[])=>{
        this.product = products.filter((product:IProduct)=> {
          return product.productId==id;
        }).at(0)
      }
    })
  }

}
