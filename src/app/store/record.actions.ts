import { Record } from '../model/Record.model';
import { createAction, props } from '@ngrx/store';
import {Update} from '@ngrx/entity';


export const loadRecords = createAction(
  '[Records List] Load Records via Service',
);

export const recordsLoaded = createAction(
  '[Records Effect] Records Loaded Successfully',
  props<{records: Record[]}>()
);

export const createRecord = createAction(
  '[Create Record Component] Create Record',
  props<{record: Record}>()
);

export const deleteRecord = createAction(
  '[Records List Operations] Delete Record',
  props<{recordId: string}>()
);

export const updateRecord = createAction(
  '[Records List Operations] Update Record',
  props<{update: Update<Record>}>()
);

export const recordActionTypes = {
  loadRecords,
  recordsLoaded,
  createRecord,
  deleteRecord,
  updateRecord
};


