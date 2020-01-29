import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less']
})
export class ProductDetailsComponent implements OnInit {

  elements: any = [
    {id: 1, first: 'Pouma R5', last: '54.99€', handle: '3'},
    {id: 2, first: 'Nique V12', last: '119.99€', handle: '2'},
    {id: 3, first: 'Abidas lvl 2', last: '89.99€', handle: '4'},
  ];

  headElements = ['ID', 'Nom', 'prix', 'Quantité'];
  ngOnInit() {
  }

}
