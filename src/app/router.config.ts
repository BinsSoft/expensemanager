import {  Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateexpancegroupComponent } from './createexpancegroup/createexpancegroup.component';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { GroupdetailsComponent } from './home/groupdetails/groupdetails.component';
import { PaymentComponent } from './home/groupdetails/payment/payment.component';
import { ExpensehistoryComponent } from './home/groupdetails/expensehistory/expensehistory.component';
export const appRoute : Routes = [
	{
		path : 'home',
		component : HomeComponent
	},
	{
		path : 'signup',
		component : SignupComponent
	},
	{
		path : '',
		component : LoginComponent
	},
	{
		path : 'creategroup',
		component : CreateexpancegroupComponent
	},
	{
		path : 'group-details',
		component : GroupdetailsComponent
	},
	{
		path : 'pay',
		component : PaymentComponent
	},
	{
		path : 'expensehistory',
		component : ExpensehistoryComponent
	},
];