import { Component, OnInit } from '@angular/core';

// NgRx.
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Worker } from '../../models/worker.model';
import { Meetup } from '../../models/meetup.model';
import { AppState } from '../../app.state';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddMeetupDialog } from '../reusable/addmeetup/addmeetup.component';

import * as MeetupActions from '../../actions/meetup.actions';

import { faEdit, faUserSlash, faSave, faUndo } from '@fortawesome/free-solid-svg-icons';

export interface DialogData {
     name: string;
     time: string;
}

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})

export class MeetingsComponent implements OnInit {

     faEdit = faEdit;
     faUserSlash = faUserSlash;
     faSave = faSave;
     faUndo = faUndo;

     selectedValueTime = '';
     selectedValueName = '';

     name: string;

     workers: Observable<Worker[]>;
     dailyscrum: Observable<Meetup[]>;

     listOfWorkers = null;

     constructor (
          private store: Store<AppState>,
          public dialog: MatDialog
     ) { 
          this.workers = store.select('worker');
          this.dailyscrum = store.select('meetup');
     }

     ngOnInit() {
          this.store.select(state => state).subscribe(data => {
               this.listOfWorkers = data.worker
          });
     }

     openAddEntryDialog (): void {
          const dialogRef = this.dialog.open(AddMeetupDialog, {
               width: '450px',
               data: {name: this.name}
          });

          dialogRef.afterClosed().subscribe(result => {
               console.log('The dialog was closed');
               this.name = result;
          });
     }

     editEntry (index) {
          this.store.dispatch(new MeetupActions.EditEntry(index));
          // this.workers[index].editing = true;
     }

     delEntry (index) {
          this.store.dispatch(new MeetupActions.RemoveEntry(index));
          // this.checkWorkersCount();
     }

     saveEntry (index, newname, newtime) {
          console.log('saveaj entry: ', index, newname, newtime);

          let dailyentries = null;

          this.store.select(state => state).subscribe(data => {
               dailyentries = data.worker
          });

          let newId = dailyentries.length + 1;
          let vrijemeDolaska = newtime;
          let newlatevalue: boolean;

          let uslov_h = false;
          let uslov_m = false;

          const prag_dolaska = 31500; // Broj sekundi koji je ustvari 8 sati i 45 minuta (8:45 je prag dolaska na vrijeme).

          let fields = vrijemeDolaska.split(':');
          console.log('evo fieldsa save: ', fields);

          let hours = fields[0];
          let minutes = fields[1];

          let h = Number(hours);
          let m = Number(minutes);

          let sekunde = (m * 60) + ((h * 60) * 60); // Broj sekundi koje treba uporediti.
          if (sekunde > prag_dolaska)
               newlatevalue = false;
          else
               newlatevalue = true;

          if (h >= 0 && h < 24) { // Ovo su pravilno uneseni sati.
               uslov_h = true;
          }

          if (m >= 0 && m < 60) { // Ovo su pravilno unesene minute.
               uslov_m = true;
          }

          this.store.dispatch(new MeetupActions.SaveEntry(index, newname, newtime, newlatevalue));
          // this.checkWorkersCount();
     }

     cancelEntry (index) {
          this.store.dispatch(new MeetupActions.CancelEntry(index));
     }

}
