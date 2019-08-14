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
          this.store.dispatch(new MeetupActions.SaveEntry(index, newname, newtime));
          // this.checkWorkersCount();
     }

     cancelEntry (index) {
          this.store.dispatch(new MeetupActions.CancelEntry(index));
     }

}
