import { Component, OnInit } from '@angular/core';
import {GeneralService} from '../../services/general.service';
import { ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {DepositpopupComponent} from './depositpopup/depositpopup.component';
import {Global} from '../../global.config';
@Component({
  selector: 'app-groupdetails',
  templateUrl: './groupdetails.component.html',
  styleUrls: ['./groupdetails.component.css'],
  providers :[GeneralService]
})
export class GroupdetailsComponent implements OnInit {
	groupId = '';
	groupDetails : object = {
		name : '',
		id : ''
	};
	authUser : any ;
	adminUser : any ;
  constructor(private global : Global, private route: ActivatedRoute, private general : GeneralService, private dialog : MatDialog) {
  		this.authUser = this.global.loggedUser;

  		this.route.queryParams.subscribe(params => {
	        this.groupId = params['id'];
	        this.general.getGroupDetails(this.groupId).subscribe((data)=>{
		  		this.groupDetails  = data;
		  		this.adminUser = this.groupDetails['members'].find((m)=> {
		  			return m.admin == 1;
		  		})
				/*console.log(this.authUser);
		  		console.log(this.adminUser);*/
		  	})
	    });
    }

  ngOnInit() {}

  openDepositPopup(member, group)
  {
  	const dialogConfig = new MatDialogConfig();

	dialogConfig.disableClose = true;
	dialogConfig.autoFocus = true;

	const dialogRef = this.dialog.open(DepositpopupComponent, dialogConfig);
	dialogRef.componentInstance.member  = member;
	dialogRef.componentInstance.group  = group;
	dialogRef.afterClosed().subscribe(data => {
		if(data!= undefined ) {
			window.location.reload();
		} 
	});
  }

}
