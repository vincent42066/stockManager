import { Component, OnInit, ViewChild } from '@angular/core';
 
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Router } from "@angular/router";

 
export interface ShelfData {
  name: string;
  id: number;
}
 
const ELEMENT_DATA: ShelfData[] = [
  {id: 0, name: 'Natation',},
  {id: 1, name: 'Tennis',},
  {id: 3, name: 'Musculation',},
  {id: 4, name: 'Yoga'}
];
@Component({
  selector: 'app-manage-shelf',
  templateUrl: './manage-shelf.component.html',
  styleUrls: ['./manage-shelf.component.less']
})
export class ManageShelfComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
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
      name:row_obj.name
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }

  goToStock(element){
    this.router.navigateByUrl('/manage-stock', { state: element });
  }
  goToStore(element){
    this.router.navigateByUrl('/manage-users', { state: element });
  }

}
