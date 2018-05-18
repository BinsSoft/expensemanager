import { Component, OnInit } from '@angular/core';
import {GeneralService} from '../../services/general.service';
import { ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {DepositpopupComponent} from './depositpopup/depositpopup.component';
import {AdditemComponent} from '../../createexpancegroup/additem/additem.component';
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
	createdUser : any ;
  constructor(private global : Global, private route: ActivatedRoute, private general : GeneralService, private dialog : MatDialog) {
  		this.authUser = this.global.loggedUser;
  		this.getGroupDetails();
  		
    }

    getGroupDetails()
    {
    	this.route.queryParams.subscribe(params => {
	        this.groupId = params['id'];
	        this.general.getGroupDetails(this.groupId).subscribe((data)=>{
		  		this.groupDetails  = data;
		  		this.adminUser = this.groupDetails['members'].find((m)=> {
		  			return m.admin == 1;
		  		})
		  		this.createdUser = this.groupDetails['members'].find((m)=> {
		  			return m.id == data['createdBy'];
		  		})
		  		//console.log(this.groupDetails);
		  	})

	    });
    }
  ngOnInit() {

  }

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
  openAddMemberDialog() {

		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;

		const dialogRef = this.dialog.open(AdditemComponent, dialogConfig);
		dialogRef.afterClosed().subscribe(data => {
			if(data!= undefined && data.name!='') {
				
				let postData = {
					id : this.groupId,
					user : data
				};
				this.general.addGroupMember(postData).subscribe((response)=>{
					this.getGroupDetails();
				})
			} 
		} );
	}
}
