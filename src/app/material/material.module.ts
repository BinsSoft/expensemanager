import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule,MatIconModule,MatInputModule,MatButtonModule,MatDialogModule,MatGridListModule,MatDividerModule,MatNativeDateModule,MatDatepickerModule,MatAutocompleteModule,MatMenuModule,MatSelectModule,MatCheckboxModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatDividerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  exports : [
  	MatCardModule,
  	MatIconModule,
  	MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatDividerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatSelectModule,
    MatCheckboxModule
  	],
  declarations: []
})
export class MaterialModule { }
