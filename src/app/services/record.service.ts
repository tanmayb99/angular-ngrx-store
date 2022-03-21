import { Record } from '../model/Record.model';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class RecordService {
  recordList: Record[] = [];

  constructor() {
  }

  getAllRecords(): Observable<Record[]> {
    return new Observable((observer: Observer<Record[]>) => {
      observer.next(this.recordList);
    });
  }
}
