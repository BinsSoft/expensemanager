import { Component, OnInit } from '@angular/core';
import {GeneralService} from '../../../services/general.service';
import { ActivatedRoute} from "@angular/router";
import {Global} from '../../../global.config';
@Component({
  selector: 'app-expensehistory',
  templateUrl: './expensehistory.component.html',
  styleUrls: ['./expensehistory.component.css']
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
  constructor(private global : Global, private route: ActivatedRoute, private general : GeneralService) {
	this.authUser = this.global.loggedUser;

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
	})

	//this.general.getGroupExpenseHistory(this.groupId)

});
  }

  ngOnInit() {
  }

}
