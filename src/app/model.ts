// export class Trip {
//   public id = 0;
//   public trip_id = "";
//   status = {
//    id: number,
//      name: string
// },
//   public Discontinued? = false;
//   public UnitsInStock?: number;
//   public UnitPrice = 0;
//   public Category = {
//     CategoryID: 0,
//     CategoryName: "",
//   };
// }

// export class Trip {
//   id: number;
//   trip_id: string,
//   external_trip_id: number,
//   request: {
//   id: number,
//     external_trip_request_id: number,
//     client: {
//     id: number,
//       client_id: string,
//       medicaid_id: number,
//       medicare_id: number,
//       client_medical_records: [],
//       first_name: string,
//       middle_name: string,
//       last_name: string,
//       gender: {
//       id: number
//     },
//     birth_date: Date,
//       location: {
//       id: number
//     },
//     phone: number,
//       phone_ext: number,
//       preferred_location: number,
//       preferred_phone: number,
//       preferred_phone_ext: number,
//       cell_phone: number,
//       primary_language: {
//       id: number,
//         name: string,
//         iso_639_2b_code: string
//     },
//     diagnoses: [],
//       transportation_condition: number,
//       can_sign_driver_log: number,
//       sty_assigned_service_level: number,
//       transportation_preferences: number,
//       is_low_vehicle_required: number,
//       is_high_focus: number,
//       client_preferred_transportation_provider: {
//       id: number,
//         name: string
//     },
//     tri_city_disclaimer_timestamp: number,
//       sty_assigned_transportation_provider: {
//       id: number,
//         name: string
//     },
//     daycare_transportation_provider: number,
//       daycare_a_leg_pick_up_time: number,
//       daycare_b_leg_pick_up_time: number,
//       objectionable_transportation_providers: [],
//       benefit_plans: [
//       {
//         id: number,
//         name: string,
//         type: {
//           id: number
//         },
//         effective_date: Date,
//         expiration_date: Date,
//         service_level: {
//           id: number
//         },
//         transportation_start_date: Date,
//         transportation_end_date: Date,
//         approved_facility: number
//       }
//     ],
//       primary_insurance: {
//       provider: {
//         id: number,
//           name: string,
//           npi: number,
//           payer_id: string,
//           location: {
//           street_address: string,
//             city: string,
//             state: {
//             id: string
//           },
//           zip_code: number
//         },
//         business_phone: number,
//           business_fax: number,
//           alternate_phone: number,
//           alternate_fax: number,
//           contact: {
//           first_name: string,
//             last_name: string,
//             phone: number
//         },
//         edi: {
//           capabilities: {
//             eligibility: number,
//               remittance: number,
//               claim_status: number
//           },
//           is_active: number,
//             is_production_mode: number,
//             is_supported: number,
//             service_place: {
//             id: number
//           },
//           supported_claim_types: number,
//             version: number,
//             sender_id: number,
//             sender_qualifier: string,
//             receiver_id: string,
//             receiver_qualifier: string,
//             icd_status: string,
//             gs_qualifier: string,
//             claim_file_name: string,
//             claim_count_per_file: number
//         },
//         is_quick_reservation_allowed: number
//       },
//       number: string
//     },
//     secondary_insurance: number,
//       notification: number,
//       is_active: number,
//       passenger_type_id: number,
//       is_billing_allowed: number,
//       is_fwa_monitoring: number,
//       fwa_description: number,
//       covid_tracking: number,
//       last_update_timestamp: Date
//   },
//   is_standing_order: number,
//     type: {
//     id: number,
//       name: string
//   },
//   comments: string,
//     status: {
//     id: number
//   },
//   leg_count: number
// },
//   leg: {
//   id: number,
//     original_trip_leg: number,
//     external_trip_id: number,
//     order_number: number,
//     trip_reason: {
//     id: number,
//       name: string
//   },
//   trip_reason_description: string,
//     service_level: {
//     id: number,
//       code: string,
//       name: string,
//       is_for_secondary_provider: number
//   },
//   vehicle_equipment_items: [],
//     escort: {
//     personal_care_attendant_count: number,
//       adult_count: number,
//       child_count: number,
//       child_seat_count: number,
//       animal_count: number
//   },
//   required_vehicle_capacity: {
//     wc_seat_count: number
//   },
//   fare: number,
//     facility_phone: number,
//     facility_phone_ext: number,
//     pick_up: {
//     location: {
//       id: number,
//         location_source: {
//         id: number
//       },
//       time_zone: {
//         id: number,
//           name: string,
//           generalized_name: string,
//           description: string,
//           is_generalized: number
//       },
//       name: string,
//         street_address: string,
//         building: string,
//         apartment: string,
//         city: string,
//         state: {
//         id: string
//       },
//       county: {
//         id: number
//       },
//       zip: number,
//         zip_extension: number,
//         formatted_address: string,
//         coordinates: {
//         lat: number,
//           lng: number
//       }
//     },
//     comments_for_driver: string,
//       doctor_name: string,
//       phone: number,
//       phone_ext: number,
//       alternate_phone: number,
//       alternate_phone_ext: number,
//       time: Date,
//       time_source: {
//       id: number,
//         name: string
//     },
//     is_next_day: number
//   },
//   drop_off: {
//     location: {
//       id: number,
//         location_source: {
//         id: number
//       },
//       time_zone: {
//         id: number,
//           name: string,
//           generalized_name: string,
//           description: string,
//           is_generalized: number
//       },
//       name: string,
//         street_address: string,
//         building: string,
//         apartment: string,
//         city: string,
//         state: {
//         id: string
//       },
//       county: {
//         id: number
//       },
//       zip: number,
//         zip_extension: number,
//         formatted_address: string,
//         coordinates: {
//         lat: number,
//           lng: number
//       }
//     },
//     comments_for_driver: string,
//       doctor_name: string,
//       time: Date,
//       time_source: {
//       id: number
//     },
//     is_next_day: number
//   },
//   mileage: number,
//     is_toll_included: number,
//     route_id: number,
//     procedures: [
//     {
//       id: number,
//       code: {
//         id: number
//       },
//       negotiated_cost: number
//     },
//     {
//       id: number,
//       code: {
//         id: number
//       },
//       negotiated_cost: number
//     },
//     {
//       id: number,
//       code: {
//         id: number
//       },
//       negotiated_cost: number
//     },
//     {
//       id: number,
//       code: {
//         id: number
//       },
//       negotiated_cost: number
//     }
//   ]
// },
//   date: Date,
//   sentry_notes: string,
//   notes_from_provider: string,
//   phone: number,
//   scheduled_pick_up_timestamp: Date,
//   scheduled_pick_up_timestamp_source: {
//   id: number,
//     name: string
// },
//   latest_pick_up_timestamp: Date,
//   scheduled_drop_off_timestamp: Date,
//   scheduled_drop_off_timestamp_source: {
//   id: number,
//     name: string
// },
//   pick_up_arrival_timestamp: Date,
//   pick_up_timestamp: Date,
//   pick_up_delay: Date,
//   drop_off_timestamp: Date,
//   bidding_status: {
//   id: number,
//     name: string
// },
//   bidding_start_timestamp: Date,
//   is_done_by_not_integrated_provider: number,
//   status: {
//   id: number,
//     name: string
// },
//   is_confirmed: number,
//   is_rescue: number,
//   cancel_reason: string,
//   cancel_note: string,
//   reroute_reason: string,
//   reroute_note: string,
//   status_last_change: string,
//   attestation: {
//   status: {
//     id: number
//   },
//   note: string
// },
//   payment_authorization: {
//   status: {
//     id: number
//   },
//   rejection_reason: number,
//     note: string
// },
//   payment: {
//   delivery_cost: number,
//     pick_up_arrival_cost: number,
//     bonus: number,
//     initial_cost: number,
//     cost: number,
//     paid_amount: number,
//     withheld_amount: number,
//     cost_correction_note: string,
//     cost_correction: number,
//     status: {
//     id: number
//   }
// },
//   billing_authorization: {
//   status: {
//     id: number
//   },
//   rejection_reason: number,
//     note: string
// },
//   billing: {
//   status: {
//     id: number
//   },
//   cost: number,
//     paid_amount: number
// },
//   transportation_provider: number,
//   acceptance_by_transportation_provider_status: {
//   id: number,
//     name: string
// },
//   vehicle: string,
//   vehicle_vin: number,
//   vehicle_license_plate_number: number,
//   driver: string,
//   driver_license_number: number,
//   is_covid_eligible_transport_required: number,
//   transportation_provider_covid_eligibility_status_name: string,
//   mta: number,
//   trip_competitive_assignment_status: {
//   id: number
// },
//   competitive_transportation_providers: [],
//   trip_marketplace_status: {
//   id: number
// },
//   notes: []
// }
