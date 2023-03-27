import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { DataBindingDirective, DataStateChangeEvent } from '@progress/kendo-angular-grid';
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
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridData: unknown[] = trips;
  public gridView: DataResult;
  public formGroup: FormGroup;
  public mySelection: string[] = [];
  public total: AggregateResult;
  public opened = false;
  public filterValue: CompositeFilterDescriptor = { logic: "or", filters: [] };
  public filter: CompositeFilterDescriptor;
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
      editor: "string",
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
          operator: 'eq',
          value: ''
        },
        {
          field: 'is_rescue',
          operator: 'eq',
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
    this.gridData.forEach(trip => {
      // @ts-ignore
      if (trip.bidding_start_timestamp) {
        // @ts-ignore
        const slicedDate = trip.bidding_start_timestamp.slice(0, trip.bidding_start_timestamp.indexOf(' '));
        // @ts-ignore
        trip.bidding_start_timestamp = new Date(slicedDate).setHours(0,0,0,0);
      }
      // @ts-ignore
      trip.is_confirmed = trip.is_confirmed ? 'Confirmed' : 'Not Confirmed';
      // @ts-ignore
      trip.is_rescue = trip.is_rescue ? 'Yes' : 'No';
      // @ts-ignore
      trip.is_covid_eligible_transport_required = trip.is_covid_eligible_transport_required ? 'Yes' : 'No';
    });
    this.gridView = process(this.gridData, this.state);
    this.total = aggregateBy(this.gridView.data, this.aggregates);
    console.log(this.gridView);
  }

  public aggregates: AggregateDescriptor[] = [
    { field: "billing.cost", aggregate: "sum" },
  ];

  // public switchChange(checked: boolean, field: string): void {
  //   // @ts-ignore
  //   const root = { logic: 'and', filters: [], ...this.filter };
  //   const [filter] = flatten(root).filter((x: any) => x.field === field);
  //
  //   if (!filter) {
  //     root.filters.push({
  //       field: field,
  //       operator: "eq",
  //       value: checked ? 1 : 0
  //     });
  //   } else {
  //     filter.value = checked ? 1 : 0;
  //   }
  //
  //   this.filterChange(root);
  // }

  // public filterChange(filter: CompositeFilterDescriptor): void {
  //   this.filter = filter;
  //   this.state.filter = filter;
  //   this.gridView = process(filterBy(this.gridData, filter), this.state);
  // }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridView = process(this.gridData, this.state);
    // this.total = aggregateBy(this.gridView.data, this.aggregates);
  }

  public createFormGroup = (args: any): FormGroup => {
    const item = args.isNew ? {} : args.dataItem;

    this.formGroup = this.formBuilder.group({
      trip_id: [item.trip_id],
      bidding_start_timestamp: [item.bidding_start_timestamp ? new Date(item.bidding_start_timestamp).toISOString() : item.bidding_start_timestamp],
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
    this.gridView = process(filterBy(this.gridData, value), this.state);
    this.filterValue = value;
  }

  // public sortSettings: MultipleSortSettings = {
  //   mode: "multiple",
  //   initialDirection: "desc",
  //   allowUnsort: true,
  //   showIndexes: true,
  // };
}
