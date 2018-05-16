import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule,MatDialog, MatDialogConfig} from "@angular/material";
import {  ActivatedRoute,  Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import {Global} from '../global.config';
import {AdditemComponent} from './additem/additem.component';
import {GeneralService} from '../services/general.service';
@Component({
  selector: 'app-createexpancegroup',
  templateUrl: './createexpancegroup.component.html',
  styleUrls: ['./createexpancegroup.component.css'],
  providers :[GeneralService]
})
export class CreateexpancegroupComponent implements OnInit {

	group : any = {
		name : '',
		startdate : '',
		createdBy : '',
		createdOn : new Date(),
		members : []
	};
	formError : number = 0;
	constructor(
		private router : Router,
		private general : GeneralService,
		private global : Global,
		private dialog: MatDialog, private http:HttpClient) {
		//let user = this.global.getLoggedUser();
		let user = this.global.loggedUser;
		this.group['createdBy'] = user['id'];
		this.group.members.push({
			'id' : user['id'],
			'name' : user['name'],
			'admin' : 1,
			'deposit' : 0
		})
	}

	ngOnInit() {

	}
	openDialog() {

		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;

		const dialogRef = this.dialog.open(AdditemComponent, dialogConfig);
		dialogRef.afterClosed().subscribe(data => {
			if(data!= undefined && data.name!='') {
				
				if (data.id == 1) {
					data.admin = 1; 
				} else {
					data.admin = 0;
				}
				this.group.members.push(data)
				this.group.members.sort(function(a,b){
					return a.id < b.id
				})
			} 
		} );
	}
	removeItem(index) {
		this.group.members.splice(index,1);
	}
	setAdmin(index)
	{
		var adminIndex = this.group.members.findIndex(function(i){
			return i.admin == 1;
		})
		this.group.members[adminIndex].admin = 0;
		this.group.members[index].admin = 1;
		this.group.members[index].deposit = 0;
	}
	createGroup() 
	{
		this.group.name = this.group.name.trim();
		if (this.group.name == '') {
			this.formError = 1;
		} else {
			if (this.group.startdate != '') {
				this.group.startdate = this.group.startdate.toISOString();
			} else {
				delete this.group.startdate;
			}
			/*console.log(this.group);*/
			this.general.createGroup(this.group).subscribe((response)=>{
				this.router.navigate(['/home']);
			});
		}
	}
	
}
