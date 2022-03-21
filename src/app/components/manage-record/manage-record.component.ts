import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { validateIBAN } from 'ngx-iban-validator';
import { Record } from 'src/app/model/record.model';
import { UiService } from 'src/app/services/ui.service';
import { createRecord, updateRecord } from 'src/app/store/record.actions';
import { validationMessages } from 'src/app/util/validators';
import * as uuid from 'uuid';

@Component({
  selector: 'app-manage-record',
  templateUrl: './manage-record.component.html',
  styleUrls: ['./manage-record.component.scss'],
})
export class ManageRecordComponent implements OnInit {
  recordForm: FormGroup;
  currentDate = new Date();
  public validationMessages = validationMessages;
  currentRecordId: string;
  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private uiService: UiService,
    private store: Store,
    private navParams: NavParams
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.navParams.get('record')) {
      const record = this.navParams.get('record');
      this.currentRecordId = record.id;
      this.recordForm.patchValue(record);
    }
  }

  initForm() {
    // test iban number : BA393385804800211234
    this.recordForm = this.formBuilder.group({
      accountHolder: [''],
      iban: ['', [Validators.required, validateIBAN]],
      amount: ['', [Validators.required, Validators.min(50), Validators.max(20000000)]],
      date: [this.currentDate.toISOString(), [Validators.required]],
      note: ['']
    });
  }

  submit() {
    const undefineField = this.recordForm.get('iban').errors.ibanInvalid === undefined && this.recordForm.get('iban').invalid;
    if (undefineField || this.recordForm.get('iban').errors.ibanInvalid) {
      return this.uiService.showToaster('Enter valid IBAN code');
    }
    if (this.recordForm.get('amount').invalid) {
      return this.uiService.showToaster('Enter valid amount');
    }
    if (this.currentRecordId) {
      const update: Update<Record> = {
        id: this.currentRecordId,
        changes: {
          ...this.recordForm.value
        }
      };
      this.store.dispatch(updateRecord({ update }));
    } else {
      const record: Record = { id: uuid.v4(), ...this.recordForm.value };
      this.store.dispatch(createRecord({ record }));
    }
    this.close();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
