import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {appRoute} from './router.config';
import {Global} from './global.config';
import {GeneralService} from './services/general.service';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddmoreDirective } from './directive/addmore.directive';
import { AdditemComponent } from './createexpancegroup/additem/additem.component';
import { CreateexpancegroupComponent } from './createexpancegroup/createexpancegroup.component';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { GroupdetailsComponent } from './home/groupdetails/groupdetails.component';
import { DepositpopupComponent } from './home/groupdetails/depositpopup/depositpopup.component';
import { PaymentComponent } from './home/groupdetails/payment/payment.component';
import { ExpensehistoryComponent } from './home/groupdetails/expensehistory/expensehistory.component';
import { DeleteconfirmComponent } from './home/deleteconfirm/deleteconfirm.component';
import { ChangepasswordComponent } from './home/changepassword/changepassword.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddmoreDirective,
    AdditemComponent,
    CreateexpancegroupComponent,
    LoginComponent,
    SignupComponent,
    GroupdetailsComponent,
    DepositpopupComponent,
    PaymentComponent,
    ExpensehistoryComponent,
    DeleteconfirmComponent,
    ChangepasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoute,{useHash:true}),
    //LoadingBarRouterModule,

    LoadingBarHttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [CookieService,Global,GeneralService],
  bootstrap: [AppComponent],
  entryComponents: [AdditemComponent,DepositpopupComponent, DeleteconfirmComponent]
})
export class AppModule { }
