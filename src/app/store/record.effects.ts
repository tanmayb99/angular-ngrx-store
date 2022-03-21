import { recordActionTypes } from './Record.actions';
import { RecordService } from './../services/record.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class RecordEffects {

  loadRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(recordActionTypes.loadRecords),
      concatMap(() => this.recordService.getAllRecords()),
      map(records => recordActionTypes.recordsLoaded({records}))
    )
  );

  createRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(recordActionTypes.createRecord)
    ),
    {dispatch: false}
  );

  deleteRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(recordActionTypes.deleteRecord)
    ),
    {dispatch: false}
  );

  updateRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(recordActionTypes.updateRecord)
    ),
    {dispatch: false}
  );

  constructor(private recordService: RecordService, private actions$: Actions) {}
}
