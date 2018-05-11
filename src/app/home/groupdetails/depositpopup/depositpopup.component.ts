import { Component, OnInit , Inject} from '@angular/core';
import {GeneralService} from '../../../services/general.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
@Component({
  selector: 'app-depositpopup',
  templateUrl: './depositpopup.component.html',
  styleUrls: ['./depositpopup.component.css'],
  providers :[GeneralService]
})
export class DepositpopupComponent implements OnInit {

	member : object;
	group : object ;
	depositAmount : string  ;
	constructor(
		private general : GeneralService,
		private dialogRef: MatDialogRef<DepositpopupComponent>,
	    @Inject(MAT_DIALOG_DATA) data) { 

		//
		

	}

	ngOnInit() {
		this.depositAmount = this.member['deposit'];
	}
	close() {
	    this.dialogRef.close();
	}
	save()
	{
		let adminMember = this.group['members'].find((m)=>{
			return m.admin == 1
		})
		let postData = {
			memberId : this.member['id'],
			admin : {id : adminMember['id'], name : adminMember['name']},
			groupId : this.group['id'],
			deposit : { 
				old : parseInt(this.member['deposit']),
				new : parseInt(this.depositAmount)
			}
		};
		this.general.saveDeposit(postData).subscribe(response=>{
			this.dialogRef.close({
				id :  this.member['id'],
				deposit : this.depositAmount
			})
		})
		//this.dialogRef.close(this.member)
	}
}
