import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup,  Validators ,  FormControl} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router} from "@angular/router";
import {Global} from '../../global.config';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers :[AuthService]
})
export class LoginComponent implements OnInit {
	form: FormGroup;
	errorMessage : string = "";
	successMessage : string;
  constructor(
    private cookies : CookieService,
  	private auth : AuthService,
    private global : Global,
    private route : Router) { }

  ngOnInit() {
  	
    this.form = new FormGroup({
    	phoneno : new FormControl('',[Validators.required, Validators.pattern('^[0-9]+$')]),
    	password : new FormControl('',[Validators.required])
    });
  }

  save()
  {
  	let postData = this.form.value;
  	this.auth.signinPost(postData)
  	.subscribe(response  => {
  		let responseData = response;
  		if (responseData['status'] == 0){
	  		this.errorMessage = responseData['message'];
	  	} else{
        this.cookies.set('_u', window.btoa( JSON.stringify(responseData['userdata']) ))
        //window.location.href = '#/home'; 
        this.global.setLoggedUser(responseData['userdata']);
        this.route.navigate(['home']);
     	}
  	})
  }

}
