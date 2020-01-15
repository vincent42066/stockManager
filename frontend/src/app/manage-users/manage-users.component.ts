import { Component, OnInit, ViewChild } from '@angular/core';
 
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Router } from "@angular/router";

 
export interface UsersData {
  name: string;
  id: number;
  poste: string;
}
 
const ELEMENT_DATA: UsersData[] = [
  {id: 0, name: 'Vincent Desnos', poste: 'Chef de Rayon'},
  {id: 1, name: 'Pierre Jeanne', poste: 'Vendeur'},
  {id: 3, name: 'Hugo Pohier', poste: 'Directeur'},
  {id: 4, name: 'Geoffrey Corduan', poste: 'Admin'}
];

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.less']
})
export class ManageUsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'poste', 'action'];
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
      poste:row_obj.poste
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

  goToShelf(){
    this.router.navigateByUrl('/manage-shelf');
  }
  goToStores(element){
    this.router.navigateByUrl('/manage-stores', { state: element });
  }


}
