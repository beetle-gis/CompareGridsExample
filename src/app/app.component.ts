import { Component, OnInit, ViewChild } from '@angular/core';
import {
  DataBindingDirective, DataStateChangeEvent,
} from '@progress/kendo-angular-grid';
import {
  process,
  State,
  aggregateBy,
  AggregateResult,
  AggregateDescriptor,
} from "@progress/kendo-data-query";
import { trips } from './trips';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridData: unknown[] = trips;
  public gridView: unknown[];

  public formGroup: FormGroup;

  public mySelection: string[] = [];

  public total: any;

  constructor(private formBuilder: FormBuilder) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  public ngOnInit(): void {
    this.gridView = this.gridData;
    this.total = aggregateBy(this.gridView, this.aggregates);
  }

  public aggregates: AggregateDescriptor[] = [
    { field: "billing.cost", aggregate: "sum" },
  ];

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

  public dataStateChange(state: DataStateChangeEvent): void {
    console.log(state);
    // this.state = state;
    // this.gridData = process(sampleProducts, this.state);
    // this.total = aggregateBy(this.gridData.data, this.aggregates);
  }

  public createFormGroup = (args: any): FormGroup => {
    const item = args.isNew ? {} : args.dataItem;

    this.formGroup = this.formBuilder.group({
      trip_id: [item.trip_id],
      /*...*/
    });

    return this.formGroup;
  };
}
