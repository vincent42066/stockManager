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
  {id: 3, name: 'Poitiers'},
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
        if (currentUser.role != Role.SuperAdmin) {
          this.router.navigate(['/manage-shelf']);
        }
    }
  }

  goToShelves(element){
    this.router.navigate(['/manage-shelf']);
  }
}
