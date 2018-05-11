import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { CookieService } from 'ngx-cookie-service';
import {GeneralService} from '../services/general.service';
import {Global} from '../global.config';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers :[GeneralService]
})
export class HomeComponent implements OnInit {
  groups : any = [];
  user : any  ;
  constructor(
    private global : Global,
    private general : GeneralService,
    private dialog: MatDialog) { 
    this.user  = this.global.loggedUser;
  }
	
  ngOnInit() {
    this.general.getUserGroups().subscribe((response)=>{
      this.groups = response;
    })  
  }

  

}

