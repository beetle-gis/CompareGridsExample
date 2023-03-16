import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { WindowModule, DialogsModule } from "@progress/kendo-angular-dialog";
import { FilterModule } from "@progress/kendo-angular-filter";

import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { InputsModule } from '@progress/kendo-angular-inputs';

import { AppComponent } from './app.component';
import { PhonePipe } from "./phone.pipe";

import 'hammerjs';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    GridModule,
    ChartsModule,
    InputsModule,
    PDFModule,
    ExcelModule,
    ButtonsModule,
    FilterModule,
    DialogsModule,
  ],
  declarations: [
    AppComponent,
    PhonePipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
