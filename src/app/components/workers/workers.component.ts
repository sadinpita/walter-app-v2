import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Observable } from 'rxjs';
import * as WorkerActions from '../../actions/worker.actions';
import * as MeetupActions from '../../actions/meetup.actions';
import { Worker } from '../../models/worker.model';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddWorkerDialog } from '../reusable/addworker/addworker.component';

import { faEdit, faUserSlash, faSave, faUndo, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

export interface DialogData {
     name: string;
}

@Component({
     selector: 'app-workers',
     templateUrl: './workers.component.html',
     styleUrls: ['./workers.component.css']
})

export class WorkersComponent implements OnInit {

     faEdit = faEdit;
     faUserSlash = faUserSlash;
     faSave = faSave;
     faUndo = faUndo;
     faPlusSquare = faPlusSquare;
     name: string;
     workers: Observable<Worker[]>;
     workersCount: number;

     constructor (
          private store: Store<AppState>,
          public dialog: MatDialog)
     {
          this.workers = store.select('worker');
     }

     ngOnInit() {
          this.checkWorkersCount();
          this.store.select(state => state).subscribe(data => {
          });
     }

     openDialog (): void {
          const dialogRef = this.dialog.open(AddWorkerDialog, {
               width: '450px',
               data: {name: this.name}
          });

          dialogRef.afterClosed().subscribe(result => {
               this.name = result;
          });
     }

     editWorker (index, id: number) {
          let radnici = null;
          this.store.select(state => state).subscribe(data => {
               radnici = data.worker
          });
          for (let i = 0; i <= radnici.length - 1; i++) {
               if (id === radnici[i].id) {
                    this.store.dispatch(new WorkerActions.EditWorker(id));
               }
          }
     }

     delWorker (index, id: number) {
          let radnici = null;
          this.store.select(state => state).subscribe(data => {
               radnici = data.worker
          });
          for (let i = 0; i <= radnici.length - 1; i++) {
               if (id === radnici[i].id) {
                    this.store.dispatch(new WorkerActions.RemoveWorker(id));
               }
          }
          this.checkWorkersCount();
     }

     saveWorker (index, newname, id: number) {
          this.store.dispatch(new WorkerActions.SaveWorker(index, newname));
          this.changeNameInMeetups(id, newname);
          this.checkWorkersCount();
     }

     cancelEdit (index) {
          this.store.dispatch(new WorkerActions.CancelEdit(index));
     }

     checkWorkersCount () {
          this.store.select(state => state).subscribe(data => {
               this.workersCount = data.worker.length;
          });
     }

     changeNameInMeetups (id, newname) {
          this.store.dispatch(new MeetupActions.ChangeNames(id, newname));
     }
}

