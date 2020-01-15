import { Component, OnInit, ViewChild } from '@angular/core';
 
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Router } from "@angular/router";

 
export interface StockData {
  name: string;
  id: number;
  stock: number;
}
 
const ELEMENT_DATA: StockData[] = [
  {id: 0, name: 'chaussure', stock: 15,},
  {id: 1, name: 'balles', stock: 15},
  {id: 3, name: 'veste', stock: 15,},
  {id: 4, name: 'parpain', stock: 15}
];
@Component({
  selector: 'app-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['./manage-stock.component.less']
})
export class ManageStockComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'stock', 'action'];
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
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }
 
  addRowData(row_obj){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      name:row_obj.name,
      stock:row_obj.stock
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
        value.stock = row_obj.stock;
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
  goToShelf(element){
    this.router.navigateByUrl('/manage-shelf', { state: element });
  }

}
