import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Observable } from 'rxjs';
import * as WorkerActions from '../../actions/worker.actions';
import { Worker } from '../../models/worker.model';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddWorkerDialog } from '../reusable/addworker/addworker.component';

export interface DialogData {
     name: string;
}

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})

export class WorkersComponent implements OnInit {

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
               console.log('data00: ', data);
          });
     }

     openDialog (): void {
          const dialogRef = this.dialog.open(AddWorkerDialog, {
               width: '450px',
               data: {name: this.name}
          });

          dialogRef.afterClosed().subscribe(result => {
               console.log('The dialog was closed');
               this.name = result;
          });
     }

     editWorker (index) {
          this.store.dispatch(new WorkerActions.EditWorker(index));
          // this.workers[index].editing = true;
     }

     delWorker (index) {
          this.store.dispatch(new WorkerActions.RemoveWorker(index));
          this.checkWorkersCount();
     }

     saveWorker (index, newname) {
          this.store.dispatch(new WorkerActions.SaveWorker(index, newname));
          this.checkWorkersCount();
     }

     checkWorkersCount () {
          this.store.select(state => state).subscribe(data => {
               this.workersCount = data.worker.length;
          });
     }

}
