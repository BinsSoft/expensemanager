import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup,  Validators ,  FormControl} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers :[AuthService]
})
export class SignupComponent implements OnInit {
	form: FormGroup;

  constructor(private auth : AuthService) { }

  ngOnInit() {
     this.form = new FormGroup({
      name : new FormControl('',[Validators.required]),
      phoneno : new FormControl('',[Validators.required, Validators.pattern('^[0-9]+$')]),
      password : new FormControl('',[Validators.required])
    });
  }

  pherror : string ="";
  signupSuccess : number  = 0 ;
  save()
  {
  	let postData = this.form.value;
  	this.auth.signupPost(postData)
  	.subscribe(response  => {
  		if (response['status'] == 0){
	  		this.pherror = (response['message']);
	  	} else{
        this.signupSuccess = 1;
      }
  	})
  }

}
