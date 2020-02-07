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
  {id: 0, name: 'Nike R MAX', category: 'Running', amount: 15, price: 175.00, description: 'Chaussures très idéales pour faire un footing.'},
  {id: 1, name: 'Balle de tennis', category: 'Sports de raquette', amount: 15, price: 5.50, description: ''},
  {id: 3, name: 'Veste Puma', category: 'Running', amount: 15, price: 39.99, description: ''},
  {id: 4, name: 'Gants de boxe', category: 'Sports de combat', amount: 15, price: 20.00, description: ''}
];
@Component({
  selector: 'app-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['./manage-stock.component.less']
})
export class ManageStockComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'category', 'amount', 'price', 'action'];
  dataSource = ELEMENT_DATA;
 
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor( public dialog: MatDialog, private router: Router) { 
    var test = this.router.getCurrentNavigation().extras.state
    console.log(test);
  }

  ngOnInit() {
  }
  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add_item'){
        this.addRowData(result.data);
      }else if(result.event == 'Update_item'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete_item'){
        this.deleteRowData(result.data);
      }
    });
  }
 
  addRowData(row_obj){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      name:row_obj.name,
      category: row_obj.category,
      amount:row_obj.amount,
      price: row_obj.price,
      description: row_obj.description
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
        value.category = row_obj.category;
        value.amount = row_obj.amount;
        value.price = row_obj.price;
        value.description = row_obj.description;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }

  goToDetails(element){
    this.router.navigateByUrl('/product-details', { state: element });
  }
  goToShelves(element){
    this.router.navigateByUrl('/manage-shelf', { state: element });
  }

}
