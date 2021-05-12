import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  id:number;
  data:object = {};
  products = [];
  productObj:object = {};
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.http.get('https://cars-application-springboot.herokuapp.com/cars').subscribe(
      (res:any) => {
        this.products = res;
        for(let i=0; i<this.products.length; i++) {
          if(this.products[i].id === this.id) {
            this.data = this.products[i];
            break;    
          }
        }
      }
    );
  }

  updateProduct = function(product) {
    this.productObj = {
      "name" : product.value.name,
      "color" : product.value.color
    }
    const url = `${"https://cars-application-springboot.herokuapp.com/cars"}/${this.id}`;
    this.http.put(url, (this.productObj), {headers: this.headers}).toPromise()
      .then(() => {
        this.router.navigate(['/']);
      })
  }

}
