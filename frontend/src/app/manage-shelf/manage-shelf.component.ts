import { Component, OnInit, ViewChild } from '@angular/core';
 
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Router } from "@angular/router";
import { AuthenticationService } from '@app/_services';
import { Role } from '../_models/role';
import { User, Poste } from '@app/_models';

export interface ShelfData {
  name: string;
  id: number;

}

const ELEMENT_DATA: ShelfData[] = [
  {id: 0, name: 'Natation',},
  {id: 1, name: 'Tennis',},
  {id: 2, name: 'Musculation',},
  {id: 3, name: 'Yoga'}
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

  constructor( public dialog: MatDialog, private router: Router, private authenticationService: AuthenticationService) { 
    var test = this.router.getCurrentNavigation().extras.state
    console.log(test);
  }

  isAdmin() {
    const currentUser = this.authenticationService.currentUserValue;
    if(currentUser) {
      if (currentUser.role === Role.Admin || currentUser.role === Role.SuperAdmin) {
        return true;
     }
    return false;
    }
  }

  isPoste() {
    const currentUser = this.authenticationService.currentUserValue;
    if(currentUser) {
      if (currentUser.role === Role.User && currentUser.poste === Poste.Natation) {
        return true;
      }
      return false;
    }
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
      if(result.event == 'Add_shelf'){
        this.addRowData(result.data);
      }else if(result.event == 'Update_shelf'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete_shelf'){
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
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
        if (currentUser.role === Role.Admin || currentUser.role === Role.SuperAdmin) {
          this.dataSource = this.dataSource.filter((value,key)=>{
          return value.id != row_obj.id;
        });
        }
     }
  }

  goToStock(element){
    this.router.navigateByUrl('/manage-stock', { state: element });
  }
}
