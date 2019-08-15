import { Component, OnInit, Inject } from '@angular/core';


import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import * as MeetupActions from '../../../actions/meetup.actions';
import { Observable } from 'rxjs';

import { Worker } from '../../../models/worker.model';
import { DialogData } from '../../meetings/meetings.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-addmeetup',
  templateUrl: './addmeetup.component.html',
  styleUrls: ['./addmeetup.component.css']
})

export class AddMeetupDialog implements OnInit {

     workers = null;
     selectedValue: string;
     currentId: number;

     constructor (
          private store: Store<AppState>,
          public dialogRef: MatDialogRef<AddMeetupDialog>,
          @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
     
     ngOnInit(): void {
          this.store.select(state => state).subscribe(data => {
               this.workers = data.worker
          });
     }

     checkWorker (val) {
          this.currentId = val.id;
     }

     onNoClick (): void {
          this.dialogRef.close();
     }

     addEntry  (workerId: number, time: string, id: any) {
          console.log('addEntry id: ', workerId);
          let workerName = null;
          let workersArr = null;
          let dailyentries = null;

          this.store.select(state => state).subscribe(data => {
               console.log('dataX: ', data);
               dailyentries = data.meetup
               workersArr = data.worker
          });

          for (let i = 0; i <= workersArr.length - 1; i++) {
               console.log('workerId: ', workerId, ' workersArr[i]: ', workersArr[i].id);
               if (workersArr[i].id == workerId) {
                    workerName = workersArr[i].name;
                    console.log('izmijenio sam ime: ', workerName);
               }
          }

          let max = 0;
          for (let i = 0; i <= dailyentries.length - 1; i++) {
               if (dailyentries[i].id > max) {
                    max = dailyentries[i].id;
               }
          }

          let newId = max + 1;
          console.log('newId: ', newId);

          let vrijemeDolaska = time;
          let late: boolean;

          let uslov_h = false;
          let uslov_m = false;

          const prag_dolaska = 31500; // Broj sekundi koji je ustvari 8 sati i 45 minuta (8:45 je prag dolaska na vrijeme).

          let fields = vrijemeDolaska.split(':');

          let hours = fields[0];
          let minutes = fields[1];

          let h = Number(hours);
          let m = Number(minutes);

          let sekunde = (m * 60) + ((h * 60) * 60); // Broj sekundi koje treba uporediti.
          if(sekunde > prag_dolaska)
               late = true;
          else
               late = false;

          if(h >= 0 && h < 24) { // Ovo su pravilno uneseni sati.
               uslov_h = true;
          }

          if(m >= 0 && m < 60) { // Ovo su pravilno unesene minute.
               uslov_m = true;
          }

          this.store.dispatch(new MeetupActions.AddEntry({id: newId, userId: this.currentId, name: workerName, time: time, late: late, editing: false}) )
     }

     
}

