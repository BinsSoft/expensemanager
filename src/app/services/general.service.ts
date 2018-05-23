import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Global} from '../global.config';
@Injectable()
export class GeneralService {
	httpOptions : object;
	constructor(
		private global : Global,
		private http : HttpClient) {
		this.httpOptions = {
		  headers: new HttpHeaders(this.global.HTTP_HEADER)
		};
	}
	searchUser(term : string) {
		return this.http.get(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/search-user?term='+term)
	}

	createGroup(postData: object)
	{
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/create-group', JSON.stringify(postData), this.httpOptions)
	}
	getUserGroups()
	{	
		let postData = {
			id : this.global.loggedUser['id']
		}		
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/user-groups', JSON.stringify(postData), this.httpOptions)		
	}

	getGroupDetails(id)
	{
		let postData = {
			id : id
		}		
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/groups-details', JSON.stringify(postData), this.httpOptions)		
	}

	saveDeposit(postData)
	{
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/member-deposit-edit', JSON.stringify(postData), this.httpOptions)		
	}

	savePay(postData)
	{
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/save-pay', JSON.stringify(postData), this.httpOptions);
	}

	getGroupExpenseHistory(id) 
	{
		let postData = {
			id : id
		}		
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/group-expense-history', JSON.stringify(postData), this.httpOptions)		
	}

	deleteGroupExpense(id) 
	{
		let postData = {
			id : id
		}		
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/delete-group-expense', JSON.stringify(postData), this.httpOptions)		
	}

	addGroupMember(postData)
	{
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/add-group-member', JSON.stringify(postData), this.httpOptions)			
	}
	deleteGroup(id)
	{
		let postData = {
			id : id
		}		
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/delete-group', JSON.stringify(postData), this.httpOptions)		
	}

	deleteGroupUser(groupId, userId)
	{
		let postData = {
			userId : userId,
			groupId : groupId
		}		
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/delete-group-user', JSON.stringify(postData), this.httpOptions)			
	}

	resetPassword(postData)
	{
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/reset-password', JSON.stringify(postData), this.httpOptions)			
	}
}
