import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  products = [];

  fetchData = function() {
    this.http.get('https://cars-application-springboot.herokuapp.com/cars').subscribe(
      (res) => {
        this.products = res;
      }
    );
  }

  deleteProduct = function(id)  {
    if(confirm("Are you sure")) {
      const url = `${"https://cars-application-springboot.herokuapp.com/cars"}/${id}`;
      this.http.delete(url).toPromise()
        .then(() => {
          this.fetchData();
        })
    }
  }

  ngOnInit() {
    this.fetchData();
  }

}
