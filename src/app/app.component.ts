import { Component, OnInit, ViewChild } from '@angular/core';
import {DataBindingDirective, DataStateChangeEvent, FilterableSettings} from '@progress/kendo-angular-grid';
import {
  process,
  State,
  aggregateBy,
  AggregateResult,
  AggregateDescriptor,
  CompositeFilterDescriptor,
  filterBy, DataResult,
} from "@progress/kendo-data-query";
import { MultipleSortSettings } from "@progress/kendo-angular-grid";
import { trips } from './trips';
import { FormBuilder, FormGroup } from "@angular/forms";
import { FilterExpression } from '@progress/kendo-angular-filter';
import { DatePipe } from '@angular/common';

const flatten = (filter: any) => {
  const filters = filter.filters;
  if (filters) {
    return filters.reduce(
      (acc: any, curr: any) => acc.concat(curr.filters ? flatten(curr) : [curr]),
      []
    );
  }
  return [];
};

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public checked = false;
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridData: unknown[] = trips;
  public gridView: DataResult;

  public formGroup: FormGroup;

  public mySelection: string[] = [];

  public total: AggregateResult;

  public opened = false;

  public filterValue: CompositeFilterDescriptor = { logic: "or", filters: [] };

  public filterMode: FilterableSettings = "menu, row";

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
    skip: 0,
    take: 20,
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

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  public ngOnInit(): void {
    this.gridView = process(this.gridData, this.state);
    this.total = aggregateBy(this.gridView.data, this.aggregates);

    console.log(this.total);
  }



  public aggregates: AggregateDescriptor[] = [
    { field: "billing.cost", aggregate: "sum" },
  ];

  public clearFilters() {
    this.state.filter = {
      logic: 'or',
      filters: []
    };

    this.dataStateChange({...this.state, skip: 0, take: 20});
  }

  public switchChange(checked: boolean, field: string): void {
    // @ts-ignore
    const root = { logic: 'or', filter: [], ...this.filterValue };
    const [filter] = flatten(root).filter((x: any) => x.field === field);

    if (!filter) {
      root.filters.push({
        field: field,
        operator: "eq",
        value: checked ? 1 : 0
      });
    } else {
      filter.value = checked ? 1 : 0;
    }

    this.filterChange(root);
  }

  public filterChange(filter: CompositeFilterDescriptor): void {
    this.filterValue = filter;
    this.state.filter = filter;
    this.gridView = process(filterBy(trips, filter), this.state);
  }

  public onFilter(input: Event): void {
    const inputValue = (input.target as HTMLInputElement).value;
    this.state.filter = {
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
    this.gridView = process(this.gridData, this.state);

    this.dataBinding.skip = 0;
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    console.log(state);
    // const [filter] = flatten(state.filter).filter((x: any) => x.field === "bidding_start_timestamp");
    // if (filter) {
    //   filter.value = this.datePipe.transform(filter.value, 'yyyy-MM-dd h:mm:ss');
    // }
    this.state = state;
    this.gridView = process(trips, this.state);
    // this.total = aggregateBy(this.gridView.data, this.aggregates);
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
    this.gridView = process(filterBy(trips, value), this.state);
    this.filterValue = value;
  }

  public sortSettings: MultipleSortSettings = {
    mode: "multiple",
    initialDirection: "desc",
    allowUnsort: true,
    showIndexes: true,
  };
}
