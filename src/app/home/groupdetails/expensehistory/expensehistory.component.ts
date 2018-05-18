import { Component, OnInit } from '@angular/core';
import {GeneralService} from '../../../services/general.service';
import { ActivatedRoute,Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {DeleteconfirmComponent} from './deleteconfirm/deleteconfirm.component';
import {Global} from '../../../global.config';
@Component({
  selector: 'app-expensehistory',
  templateUrl: './expensehistory.component.html',
  styleUrls: ['./expensehistory.component.css'],

})
export class ExpensehistoryComponent implements OnInit {
	groupId = '';
	groupDetails : object = {
		name : '',
		id : ''
	};
	authUser : any ;
	adminUser : any ;
	createdUser : any ;
	expenseList : any = [] ;
  constructor(private global : Global, private route: ActivatedRoute,private router : Router, private general : GeneralService, private dialog : MatDialog) {
	this.authUser = this.global.loggedUser;
	this.getHistory();
	
  }
  getHistory()
  {
  	this.route.queryParams.subscribe(params => {
		this.groupId = params['id'];

		this.general.getGroupDetails(this.groupId).subscribe((data)=>{
			this.groupDetails  = data;
			/*this.adminUser = this.groupDetails['members'].find((m)=> {
				return m.admin == 1;
			})
			this.createdUser = this.groupDetails['members'].find((m)=> {
				return m.id == data['createdBy'];
			})*/
			this.general.getGroupExpenseHistory(params['id']).subscribe((response)=>{
				this.expenseList = response;
			})
		})

		

	});
  }
  deleteExpense(id)
  {
  	const dialogConfig = new MatDialogConfig();

	dialogConfig.disableClose = true;
	dialogConfig.autoFocus = true;

	const dialogRef = this.dialog.open(DeleteconfirmComponent, dialogConfig);
	dialogRef.afterClosed().subscribe(data => {
		if(data['status'] == true) {
			this.general.deleteGroupExpense(id).subscribe((response)=>{
				if (response['status'] == true) {
					this.getHistory();
				}
			})
		}
	});
  }

  editExpense(exp)
  {
  	this.global.setExpenseDetails(exp);
  	this.router.navigate(['/pay'],{queryParams : {gId : this.groupId , pbyid:exp['paidBy'], id : exp['id']  }})
  }
  ngOnInit() {
  }

}
