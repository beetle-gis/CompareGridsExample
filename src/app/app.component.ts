import { Component, OnInit, ViewChild } from '@angular/core';
import {
  DataBindingDirective,
} from '@progress/kendo-angular-grid';
import {
  process,
} from "@progress/kendo-data-query";
import { trips } from './trips';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridData: unknown[] = trips;
  public gridView: unknown[];

  public mySelection: string[] = [];

  public ngOnInit(): void {
    this.gridView = this.gridData;
  }

  public onFilter(input: Event): void {
    const inputValue = (input.target as HTMLInputElement).value;

    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'status.name',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'trip_id',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'is_confirmed',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'is_rescue',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'bidding_start_timestamp',
            operator: 'contains',
            value: inputValue
          }
        ]
      }
    }).data;

    this.dataBinding.skip = 0;
  }
}
