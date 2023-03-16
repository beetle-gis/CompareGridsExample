import { Component, OnInit, ViewChild } from '@angular/core';
import { DataBindingDirective, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import {
  process,
  State,
  aggregateBy,
  AggregateResult,
  AggregateDescriptor,
  CompositeFilterDescriptor,
  filterBy,
} from "@progress/kendo-data-query";
import { MultipleSortSettings } from "@progress/kendo-angular-grid";
import { trips } from './trips';
import { FormBuilder, FormGroup } from "@angular/forms";
import { FilterExpression } from '@progress/kendo-angular-filter';

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

  public opened = false;

  public filterValue: CompositeFilterDescriptor = { logic: "or", filters: [] };

  public filters: FilterExpression[] = [
    {
      field: "status.name",
      title: "Trip Status",
      editor: "string",
    },
    {
      field: "trip_id",
      title: "Trip Number",
      editor: "string",
    },
    {
      field: "is_confirmed",
      title: "Is Confirmed",
      editor: "string",
    },
    {
      field: "is_rescue",
      title: "Rescue Trip",
      editor: "boolean",
    },
  ];

  public state: State = {
    // Initial filter descriptor
    filter: {
      logic: 'or',
      filters: [{
        field: 'status.name',
        operator: 'contains',
        value: ''
      },
        {
          field: 'trip_id',
          operator: 'contains',
          value: ''
        },
        {
          field: 'is_confirmed',
          operator: 'contains',
          value: ''
        },
        {
          field: 'is_rescue',
          operator: 'contains',
          value: ''
        },
        {
          field: 'bidding_start_timestamp',
          operator: 'contains',
          value: ''
        }]
    }
  };

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

  public clearFilters() {
    this.state.filter = {
      logic: 'and',
      filters: []
    };

    // this.dataStateChange(this.state);
  }

  public onFilter(input: Event): void {
    // const inputValue = (input.target as HTMLInputElement).value;

    // state {
    //   filter: {
    //     logic: "or",
    //       filters: [
    //       {
    //         field: 'status.name',
    //         operator: 'contains',
    //         value: inputValue
    //       },
    //       {
    //         field: 'trip_id',
    //         operator: 'contains',
    //         value: inputValue
    //       },
    //       {
    //         field: 'is_confirmed',
    //         operator: 'contains',
    //         value: inputValue
    //       },
    //       {
    //         field: 'is_rescue',
    //         operator: 'contains',
    //         value: inputValue
    //       },
    //       {
    //         field: 'bidding_start_timestamp',
    //         operator: 'contains',
    //         value: inputValue
    //       }
    //     ]
    //   }}

    this.gridView = process(this.gridData, this.state).data;

    this.dataBinding.skip = 0;
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    console.log(state);
    this.state = state;
    // this.gridView = process(trips, this.state);
    // this.total = aggregateBy(this.gridData.data, this.aggregates);
  }

  public createFormGroup = (args: any): FormGroup => {
    const item = args.isNew ? {} : args.dataItem;

    this.formGroup = this.formBuilder.group({
      trip_id: [item.trip_id],
      bidding_start_timestamp: [item.bidding_start_timestamp],
      /*...*/
    });

    return this.formGroup;
  };

  public open(): void {
    this.opened = true;
  }

  public close(): void {
    this.opened = false;
  }

  public applyFilter(value: CompositeFilterDescriptor): void {
    this.gridView = filterBy(trips, value);
    this.filterValue = value;
  }

  public sortSettings: MultipleSortSettings = {
    mode: "multiple",
    initialDirection: "desc",
    allowUnsort: true,
    showIndexes: true,
  };
}
