import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { WindowModule, DialogsModule } from "@progress/kendo-angular-dialog";
import { FilterModule } from "@progress/kendo-angular-filter";

import {GridModule, PDFModule, ExcelModule, RowFilterModule} from '@progress/kendo-angular-grid';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { InputsModule } from '@progress/kendo-angular-inputs';

import { AppComponent } from './app.component';
import { PhonePipe } from "./phone.pipe";
import { DatePipe } from "@angular/common";

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
    RowFilterModule,
  ],
  declarations: [
    AppComponent,
    PhonePipe
  ],
  providers: [DatePipe],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
