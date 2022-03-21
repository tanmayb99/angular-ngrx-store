import { Record } from '../model/record.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { recordActionTypes } from './record.actions';

export interface RecordState extends EntityState<Record> {
  recordLoaded: boolean;
}

export const adapter: EntityAdapter<Record> = createEntityAdapter<Record>();

export const initialState = adapter.getInitialState({
  recordLoaded: false
});

export const recordReducer = createReducer(
  initialState,
  on(recordActionTypes.recordsLoaded, (state, action) => adapter.addMany(
      action.records,
      {...state, recordsLoaded: true}
    )),
  on(recordActionTypes.createRecord, (state, action) => adapter.addOne(action.record, state)),
  on(recordActionTypes.deleteRecord, (state, action) => adapter.removeOne(action.recordId, state)),
  on(recordActionTypes.updateRecord, (state, action) => adapter.updateOne(action.update, state))
);

export const { selectAll, selectIds } = adapter.getSelectors();
