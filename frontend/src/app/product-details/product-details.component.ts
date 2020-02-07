import { Component, OnInit, ViewChild } from '@angular/core';
 
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Router } from "@angular/router";

 
export interface StockData {
  id: number;
  name: string;
  category: string;
  amount: number;
  price: number;
  description: string;
}
 
const ELEMENT_DATA: StockData[] = [
  {id: 0, name: 'Nike R MAX', category: 'Running', amount: 15, price: 175.00, description: 'Chaussures très idéales pour faire un footing.'}
];
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less']
})
export class ProductDetailsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'amount', 'description'];
  dataSource = ELEMENT_DATA;
 
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor( public dialog: MatDialog, private router: Router) { 
    var test = this.router.getCurrentNavigation().extras.state
    console.log(test);
  }

  headElements = ['ID', 'Nom', 'Catégorie', 'Prix', 'Quantité', 'Description'];
  ngOnInit() {
  }
 

  goToStock(element){
    this.router.navigateByUrl('/manage-stock', { state: element });
  }

}
