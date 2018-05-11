import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Global} from '../global.config';
@Injectable()
export class AuthService {
	httpOptions : object;
  constructor(
  	private global : Global,
  	private http:HttpClient) { 
  	this.httpOptions = {
	  headers: new HttpHeaders(this.global.HTTP_HEADER)
	};
  }

  signupPost(postData:any) {
  	return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/auth/signup', JSON.stringify(postData), this.httpOptions)
  }
  signinPost(postData:any) {
  	return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/auth/signin', JSON.stringify(postData), this.httpOptions)	
  }
}
