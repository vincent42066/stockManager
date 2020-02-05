import { Component, OnInit, ViewChild } from '@angular/core';
 
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from '@app/_services';
import { Role } from '../_models/role';

export interface UsersData {
  id: number;
  name: string;
  first_name: string;
  poste: string;
  role: Role;
  address: string;
  email: string;
  pwd: string;
  blocked: boolean;
}
 
const ELEMENT_DATA: UsersData[] = [
  {id: 0, name: 'Desnos', first_name: 'Vincent', poste: 'Chef de Rayon', address: '', role: Role.User, email: 'vunssant.DesNeaux@gmail.com', pwd: 'charo_c_charo', blocked: false},
  {id: 1, name: 'Jeanne', first_name: 'Pierre', poste: 'Vendeur', address: '', role: Role.User, email: 'XxPJdu37xX@wanadoo.com', pwd: 'drone_swag', blocked: true},
  {id: 2, name: 'Pohier', first_name: 'Hugo', poste: 'Directeur', address: '', role: Role.Admin, email: 'hugo.pohier@gmail.com', pwd: 'TOEIC_780_bis', blocked: false},
  {id: 3, name: 'Corduan', first_name: 'Geoffrey', poste: 'PDG', address: '', role: Role.SuperAdmin, email: 'jojo.corduan_bleu@gmail.com', pwd: 'TOEIC_780', blocked: false}
];


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.less']
})
export class ManageUsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'first_name', 'email', 'poste', 'role', 'action'];
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
            role: row_obj.role,
            address: row_obj.address,
            email: row_obj.email,
            pwd: row_obj.pwd,
            blocked: row_obj.blocked
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
        value.address = row_obj.address
        value.email = row_obj.email;
        value.pwd = row_obj.pwd;
        value.blocked = row_obj.blocked;
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
