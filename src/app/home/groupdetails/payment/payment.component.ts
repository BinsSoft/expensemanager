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
	members : any ;
	constructor(private global : Global, private route: ActivatedRoute, private router : Router,  private general : GeneralService,) {
		this.route.queryParams.subscribe(params => {
		this.pay.payBy = params['pbyid'];
		this.pay.groupId = params['gId'];
		var authUser = this.global.loggedUser;
	    this.general.getGroupDetails(params['gId']).subscribe((data)=>{
	  		this.groupDetails  = data;
	  		this.pay.shareMembers = data['members'];
	  		this.pay.addedBy = authUser['id'];
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
		this.general.savePay(this.pay).subscribe((response)=> {
			
			this.router.navigate(['/group-details'],{queryParams : {id : this.pay.groupId}})
			//window.location.href = '#/group-details?id='+this.pay.groupId;
		})
		/*console.log(this.pay);*/
	}
}
