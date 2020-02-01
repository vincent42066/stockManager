import { Component, OnInit, ViewChild } from '@angular/core';
 
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Router } from "@angular/router";
import { AuthenticationService } from '@app/_services';
import { Role } from '../_models/role';
 
export interface StoresData {
  name: string;
  id: number;
}
 
const ELEMENT_DATA: StoresData[] = [
  {id: 0, name: 'Tours'},
  {id: 1, name: 'Bordeaux'},
  {id: 3, name: 'Pierre'},
  {id: 4, name: 'Limoges'}
];

@Component({
  selector: 'app-manage-stores',
  templateUrl: './manage-stores.component.html',
  styleUrls: ['./manage-stores.component.less']
})
export class ManageStoresComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = ELEMENT_DATA;
 
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialog: MatDialog, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
        if (currentUser.role === Role.User) {
          this.router.navigate(['/manage-shelf']);
        }
    }
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
  goToStore(element){
    this.router.navigateByUrl('/manage-users', { state: element });
  }

}
