import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ManageRecordComponent } from '../components/manage-record/manage-record.component';
import { Record } from '../model/record.model';
import { loadRecords, recordActionTypes } from '../store/record.actions';
import { getAllRecords } from '../store/record.selectors';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  subscriptions = new Subscription();
  record$: Observable<Record[]>;
  courseToBeUpdated: Record;
  isUpdateActivated = false;
  isAmountSorted = '';
  isDateSorted = '';
  recordList: Record[] = [];
  filterRecordList: Record[] = [];
  holderName = '';
  note = '';

  constructor(
    private modalCtrl: ModalController,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadRecords());
    this.record$ = this.store.select(getAllRecords);
    this.subscriptions.add(
      this.record$.subscribe((data) => {
        this.recordList = data;
      })
    );
  }

  add() {
    this.presentModal();
  }
  update(record) {
    this.presentModal(record);
  }
  delete(id) {
    this.store.dispatch(recordActionTypes.deleteRecord({ recordId: id }));
  }

  async presentModal(record?: Record) {
    this.filterRecordList = [];
    this.isAmountSorted = '';
    this.isDateSorted = '';
    const modal = await this.modalCtrl.create({
      component: ManageRecordComponent,
      componentProps: {
        record
      }
    });
    return await modal.present();
  }

  sorting(field) {
    if (field === 'amount') {
      this.isAmountSorted = !this.isAmountSorted || (this.isAmountSorted === 'desc') ? 'asc' : 'desc';
      this.recordList = this.recordList.sort((a, b) => this.isAmountSorted === 'asc' ? (a[field] - b[field]) : (b[field] - a[field]));
      this.isDateSorted = '';
    } else {
      this.isDateSorted = !this.isDateSorted || (this.isDateSorted === 'desc') ? 'asc' : 'desc';
      this.recordList = this.recordList.sort((a, b) => {
        const a1: any = new Date(a[field]);
        const b1: any = new Date(b[field]);
        return this.isDateSorted === 'asc' ? (a1 - b1) : (b1 - a1);
      });
      this.isAmountSorted = '';
    }
  }

  filter(field, inputValue) {
    this.filterRecordList = this.recordList.filter((data) => data[field].toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    field === 'accountHolder' ? this.note = '' : this.holderName = '';
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
