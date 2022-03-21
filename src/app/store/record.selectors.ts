import { RecordState } from './record.reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll } from './record.reducers';

export const recordFeatureSelector = createFeatureSelector<RecordState>('records');

export const getAllRecords = createSelector(
  recordFeatureSelector,
  selectAll
);

export const areRecordsLoaded = createSelector(
  recordFeatureSelector,
  state => state.recordLoaded
);



