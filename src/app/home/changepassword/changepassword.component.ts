import { Component, OnInit } from '@angular/core';
import {Global} from '../../global.config';
import {GeneralService} from '../../services/general.service';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
	
	newPassword : any ;
  	authUser : any ;
  	successMessage : string ='';
	constructor(private global : Global, private general :GeneralService) {
		this.authUser = this.global.loggedUser;
	}

	ngOnInit() {
	}

	save()
	{
		let postData = {
			id : this.authUser['id'],
			password : this.newPassword
		};
		this.general.resetPassword(postData).subscribe((response)=>{
			this.newPassword = '';
			this.successMessage = 'Password is updated successfully';
		})
	}

}
