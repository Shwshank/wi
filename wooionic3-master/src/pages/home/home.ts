import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';
import { ProductDetails } from '../product-details/product-details';
import { ProductsByCategory } from '../products-by-category/products-by-category';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  categories: any[];
  products: any[];
  page: number;
  splash = true;
  triggerAnimation = 'visible';
  items :any[];
  names:any;
  itemname : any[];
  sampleArray: any = [];
  navData: any = {"data1":"data1", "data2":"data2"};


  @ViewChild('productSlides') productSlides: Slides;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

    this.page = 2;

    this.WooCommerce = WC({
     url: "http://mysite.invidev.com/wp",
     consumerKey: "ck_dd37fed9e9e96e9b282d1ac024990fffc24c533f",
     consumerSecret: "cs_7a39f0d7ba84655fc074ad3cc0a627670f796232"
   });

    // this.loadMoreProducts(null);

    this.getCategories();

    // this.WooCommerce.getAsync("products").then( (data) => {
    //   this.products = JSON.parse(data.body).products;
    //   console.log(this.products);
    // }, (err) => {
    //   console.log(err)
    // })

  }

  getCategories(){

    this.WooCommerce.getAsync("products/categories").then((data) => {
      this.categories = JSON.parse(data.body).product_categories;
      console.log(this.categories);

    }, (err)=> {
      console.log(err)
    })
  }


  openProductPage(product){
     this.navCtrl.push(ProductDetails, {"product": product} );
  }

  openCategoryPage(category){
     this.navCtrl.push(ProductsByCategory, {"category": category} );
  }


}
