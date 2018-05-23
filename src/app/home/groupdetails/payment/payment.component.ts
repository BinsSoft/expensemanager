import { Component, OnInit } from '@angular/core';
import { NgModel} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { ActivatedRoute, Router} from "@angular/router";
import {GeneralService} from '../../../services/general.service';
import {Global} from '../../../global.config';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
	pay : any = {
		id : '',
		description : '',
    	category : '',
    	shareMembers : [],
    	payDate : new Date(),
    	payBy : '',
    	amount : '',
    	addedBy : ''
	}
	category : any = [
		'Food',
		'Drink',
		'Hotel',
		'Medical',
		'Entertainment',
		'Miscellaneous',
		'Parking',
		'Shopping',
		'Toll',
		'Travel'
	];
	groupDetails : object = {
		name : '',
		id : ''
	};
	members : any = [] ;
	constructor(private global : Global, private route: ActivatedRoute, private router : Router,  private general : GeneralService,) {
		this.route.queryParams.subscribe(params => {
		this.pay.payBy = params['pbyid'];
		this.pay.groupId = params['gId'];
		this.pay.id = params['id'];

		var authUser = this.global.loggedUser;
	    this.general.getGroupDetails(params['gId']).subscribe((data)=>{
	  		this.groupDetails  = data;
	  		for(let m of this.groupDetails['members']) {
	  			this.members.push({
	  				id : m['id'],
	  				name : m['name']
	  			});
	  		}
	  		
	  		this.pay.addedBy = authUser['id'];
		  	if (this.global.expenseDetails && this.pay.id!='') {
		  		this.pay.description = this.global.expenseDetails['description'];
		  		this.pay.category = this.global.expenseDetails['type'];
		  		this.pay.amount = this.global.expenseDetails['amount'];
		  		this.pay.payDate = this.global.expenseDetails['payDate'];
		  		for(let m of this.members) {
		  			var index = this.global.expenseDetails['sharewith'].findIndex((i)=>{
		  				return i.id == m['id']
		  			});
		  			if (index != -1) {
		  				this.pay.shareMembers.push(m);
		  			}
		  		}
		  	} else {
		  		this.pay.shareMembers = this.members;
		  	}
	  	})

	});
	}

	ngOnInit() {
		
	}
  	selectStatus : number =  1;
	selectAll(select: NgModel, values: any) {
		select.update.emit(values); 	
		this.selectStatus = 1;	    
	}

	deselectAll(select: NgModel) {
		select.update.emit([]); 
		this.selectStatus = 0;  
	}
	submitted : boolean = false;
	paySubmit()
	{
		this.submitted = true;
		if(this.pay.description !='' && this.pay.category != '' && this.pay.shareMembers.length >0 && this.pay.payDate !='' && this.pay.amount != '') {
			this.general.savePay(this.pay).subscribe((response)=> {
				
				this.router.navigate(['/group-details'],{queryParams : {id : this.pay.groupId}})
				//window.location.href = '#/group-details?id='+this.pay.groupId;
			})
		}
	}
}
