import { Component, OnInit } from "@angular/core";
import { filter } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    private _listFilter : string = '';
    
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
        this.products = this.productService.getProducts();
        this.filteredProducts = this.products;
    }
    onRatingClicked(message: string):void {
          this.pageTitle = 'Product list: '+message;
    }
}