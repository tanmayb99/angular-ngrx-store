import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ManageRecordComponent } from '../components/manage-record/manage-record.component';
import { recordReducer } from '../store/record.reducers';
import { RecordEffects } from '../store/record.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RecordService } from '../services/record.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('records', recordReducer),
    EffectsModule.forFeature([RecordEffects])
  ],
  entryComponents: [ManageRecordComponent],
  declarations: [HomePage, ManageRecordComponent],
  providers: [RecordService]
})
export class HomePageModule {}
