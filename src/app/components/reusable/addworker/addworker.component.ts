import { Component, OnInit, Inject } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import * as WorkerActions from '../../../actions/worker.actions';
import { Observable } from 'rxjs';

import { Worker } from '../../../models/worker.model';
import { DialogData } from '../../workers/workers.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addworker',
  templateUrl: './addworker.component.html',
  styleUrls: ['./addworker.component.css']
})

export class AddWorkerDialog implements OnInit {

     constructor(
          private store: Store<AppState>,
          public dialogRef: MatDialogRef<AddWorkerDialog>,
          @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
     
     ngOnInit() {
     }

     onNoClick(): void {
          this.dialogRef.close();
     }

     addWorker(name: string) {
          let radnici = null;

          this.store.select(state => state).subscribe(data => {
               radnici = data.worker
          });

          let newId = radnici.length + 1;

          this.store.dispatch(new WorkerActions.AddWorker({id: newId, name: name, editing: false}) )
     }
}
