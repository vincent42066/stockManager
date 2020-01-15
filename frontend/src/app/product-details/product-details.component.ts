import { Component, OnInit, ViewChild } from '@angular/core';
 
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Router } from "@angular/router";

 
export interface StockData {
  name: string;
  id: number;
  stock: number;
  prix: number;
  description: string;
}
 
const ELEMENT_DATA: StockData[] = [
  {id: 0, name: 'chaussure',description:"c'est un article", stock: 15, prix: 17.15},
];
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less']
})
export class ProductDetailsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name','description', 'prix','stock'];
  dataSource = ELEMENT_DATA;
 
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor( public dialog: MatDialog, private router: Router) { 
    var test = this.router.getCurrentNavigation().extras.state
    console.log(test);
  }

  headElements = ['ID', 'Nom', 'prix', 'Quantité'];
  ngOnInit() {
  }
 

  goToStock(element){
    this.router.navigateByUrl('/manage-stock', { state: element });
  }

}
