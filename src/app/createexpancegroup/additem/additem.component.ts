import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormControl } from '@angular/forms';
import {GeneralService} from '../../services/general.service';
@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css'],
  providers : [GeneralService]
})
export class AdditemComponent implements OnInit {

	member : any = {
		id : '',
		name : '',
		deposit : 0
	};
	searchResult : any = [];
	searchTerm : FormControl = new FormControl();
	constructor(
		private generalService : GeneralService,
		private dialogRef: MatDialogRef<AdditemComponent>,
	    @Inject(MAT_DIALOG_DATA) data) {

		this.searchTerm.valueChanges
        .subscribe(data => {

            this.generalService.searchUser(data).subscribe(response =>{
                this.searchResult = response
            })
        })

	}
	selectUser(id)
	{
		let selectUser = this.searchResult.find((item)=>{
			return item.id = id;
		})
		this.member.id  = selectUser.id;
		this.member.name  = selectUser.name;
	}

	ngOnInit() {
	}

	close() {
	    this.dialogRef.close();
	}
	save()
	{
		this.dialogRef.close(this.member)
	}

}
