import { Component, OnInit, ViewChild } from '@angular/core';
 
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from '@app/_services';
import { Role } from '../_models/role';




export interface UsersData {
  name: string;
  first_name: string;
  id: number;
  poste: string;
  role: Role;
}
 
const ELEMENT_DATA: UsersData[] = [
  {id: 0, name: 'Desnos', first_name: 'Vincent', poste: 'Chef de Rayon', role: Role.User},
  {id: 1, name: 'Jeanne', first_name: 'Pierre', poste: 'Vendeur', role: Role.User},
  {id: 2, name: 'Pohier', first_name: 'Hugo', poste: 'Directeur', role: Role.Admin},
  {id: 3, name: 'Corduan', first_name: 'Geoffrey', poste: 'PDG', role: Role.SuperAdmin}
];


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.less']
})
export class ManageUsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'first_name', 'poste', 'role', 'action'];
  dataSource = ELEMENT_DATA;
  
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor( public dialog: MatDialog, private router: Router, private authenticationService: AuthenticationService) { 
    var test = this.router.getCurrentNavigation().extras.state
    console.log(test);
  }
  
  ngOnInit() {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
        if (currentUser.role != Role.SuperAdmin ) 
        {
          if(currentUser.role != Role.Admin)
          {
            this.router.navigate(['/manage-shelf']);
          }
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
      if(result.event == 'Add_user'){
        this.addRowData(result.data);
      }else if(result.event == 'Update_user'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete_user'){
        this.deleteRowData(result.data);
      }
    });
  }
  
  addRowData(row_obj){
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
        if (currentUser.role === Role.Admin) {
          var d = new Date();
          this.dataSource.push({
            id:d.getTime(),
            name:row_obj.name,
            first_name:row_obj.first_name,
            poste:row_obj.poste,
            role: row_obj.role
          });
          this.table.renderRows();
           return true;
        }
    } 
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
        value.first_name = row_obj.first_name;
        value.poste = row_obj.poste;
        value.role = row_obj.role;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }
}
