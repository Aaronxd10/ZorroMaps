import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  SpinnerComponent,
  ModalComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalBodyComponent,
  ModalFooterComponent,
  ThemeDirective
} from '@coreui/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    ModalFooterComponent,
    ModalComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    SpinnerComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ModalBodyComponent,
    ThemeDirective,
  ],
  exports: [
    ModalFooterComponent,
    ModalComponent,
    CommonModule,
    FormsModule,
    MatIconModule,
    SpinnerComponent,
    RouterModule,
    ModalHeaderComponent,
    ModalTitleDirective,
    ModalBodyComponent,
    ThemeDirective,
  ]
})
export class SharedModule { }
