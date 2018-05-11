import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class Global
{	
	APPLICATION_NAME =  'expense';
	API_URL = 'http://localhost:8080';
	HTTP_HEADER = {
	  	'Access-Control-Allow-Origin' : "*",
	  	"Access-Control-Allow-Credentials": "true",
	  	"Access-Control-Allow-Methods" : "GET,HEAD,OPTIONS,POST,PUT",
	  	"Access-Control-Allow-Headers": "access-control-allow-origin,content-type",
	    'Content-Type':  'application/json'
	  }
	constructor(
	    private cookies : CookieService) { 
		this.getLoggedUser();
	}
	loggedUser : any ;
	getLoggedUser()  {
		let authUser = this.cookies.get('_u');
		this.loggedUser = JSON.parse( atob(authUser));
		
	}

	setLoggedUser(lUser)  {
		this.loggedUser = lUser; 
	}
}