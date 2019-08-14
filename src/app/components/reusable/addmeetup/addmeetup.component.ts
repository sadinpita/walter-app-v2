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

     constructor (
          private store: Store<AppState>,
          public dialogRef: MatDialogRef<AddMeetupDialog>,
          @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
     
     ngOnInit(): void {
          this.store.select(state => state).subscribe(data => {
               this.workers = data.worker
               console.log('data: ', data.worker);
          });
     }

     onNoClick (): void {
          this.dialogRef.close();
     }

     addEntry  (name: string, time: string) {
          console.log('addNewEntry: ', name, time);
          let dailyentries = null;

          this.store.select(state => state).subscribe(data => {
               dailyentries = data.worker
          });

          let newId = dailyentries.length + 1;
          let vrijemeDolaska = time;
          let late: boolean;

          let uslov_h = false;
          let uslov_m = false;

          const prag_dolaska = 31500; // Broj sekundi koji je ustvari 8 sati i 45 minuta (8:45 je prag dolaska na vrijeme).

          let fields = vrijemeDolaska.split(':');
          console.log('evo fieldsa: ', fields);

          let hours = fields[0];
          let minutes = fields[1];

          let h = Number(hours);
          let m = Number(minutes);

          let sekunde = (m * 60) + ((h * 60) * 60); // Broj sekundi koje treba uporediti.
          if(sekunde > prag_dolaska)
               late = false;
          else
               late = true;

          if(h >= 0 && h < 24) { // Ovo su pravilno uneseni sati.
               uslov_h = true;
          }

          if(m >= 0 && m < 60) { // Ovo su pravilno unesene minute.
               uslov_m = true;
          }


          this.store.dispatch(new MeetupActions.AddEntry({id: newId, name: name, time: time, late: late, editing: false}) )
     }

     
}

