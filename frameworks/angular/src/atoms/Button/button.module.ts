/**
 * DelvUI Angular Button Module
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { IconModule } from '../Icon/icon.module';
import { SpinnerModule } from '../Spinner/spinner.module';

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    SpinnerModule
  ],
  exports: [
    ButtonComponent
  ]
})
export class ButtonModule { }