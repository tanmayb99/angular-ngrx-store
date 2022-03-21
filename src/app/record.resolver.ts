import { areRecordsLoaded } from './store/record.selectors';
import { loadRecords } from './store/record.actions';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, first, tap} from 'rxjs/operators';

@Injectable()
export class RecordResolver implements Resolve<Observable<any>> {

  constructor(private store: Store) {}

  resolve(): Observable<any> {
    return this.store
    .pipe(
        select(areRecordsLoaded),
        tap((recordsLoaded) => {
          if (!recordsLoaded) {
            this.store.dispatch(loadRecords());
          }
        }),
        filter(recordsLoaded => recordsLoaded),
        first()
    );
  }
}
