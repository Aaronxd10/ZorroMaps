import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from '@coreui/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    SpinnerComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    SpinnerComponent,
    RouterModule,
  ]
})
export class SharedModule { }
