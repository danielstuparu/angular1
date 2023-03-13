import { Component, OnDestroy, OnInit } from "@angular/core";
import { filter, Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    private _listFilter : string = '';
    private errorMessage: string = '';
    sub!: Subscription;
    
    get listFiter(): string {
      return this._listFilter;
    }
    set listFilter (value: string){
      this._listFilter = value;
      console.log('In seter: ', value);
      this.filteredProducts = this.performFilter(value);
    }

    filteredProducts : IProduct[] = [];

    products: IProduct[] = [];
    constructor(private productService: ProductService){}

    toogleImage() : void{
      this.showImage = !this.showImage;
    }
    performFilter(filterBy: string): IProduct[] {
          filterBy = filterBy.toLocaleLowerCase();
          return this.products.filter((product: IProduct) => 
                product.productName.toLocaleLowerCase().includes(filterBy));
    }
      
    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
          next: products => {
            this.products = products;
            this.filteredProducts = this.products;
          },
          error: err=> this.errorMessage = err
        });
        
    }
    onRatingClicked(message: string):void {
          this.pageTitle = 'Product list: '+message;
    }
    ngOnDestroy() {
      this.sub.unsubscribe();
    }   
}