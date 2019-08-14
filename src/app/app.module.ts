import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Router.
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
     { path: '',
          redirectTo: '/',
          pathMatch: 'full'
     }
     // { path: '**', component: PageNotFoundComponent }
];

// Angular Material.
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material';

// FontAwesome.
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';

// NgRx.
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';

// Reducers.
import { reducerWorker } from './reducers/worker.reducer';
// import { reducerMeetup } from './reducers/meetup.reducer';

// Components.
import { WorkersComponent } from './components/workers/workers.component';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { AddWorkerDialog } from './components/reusable/addworker/addworker.component';
import { AddmeetupComponent } from './components/reusable/addmeetup/addmeetup.component';
import { SearchPipe } from './filters/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WorkersComponent,
    MeetingsComponent,
    AddWorkerDialog,
    AddmeetupComponent,
    SearchPipe
  ],
  imports: [
     BrowserModule,
     FormsModule,
     BrowserAnimationsModule,
     MatButtonModule,
     MatCheckboxModule,
     MatTabsModule,
     MatInputModule,
     MatDialogModule,
     MatTableModule,
     MatFormFieldModule,
     MatSelectModule,
     FontAwesomeModule,
     RouterModule.forRoot(
          appRoutes,
          { enableTracing: true } // <-- debugging purposes only
     ),
     StoreModule.forRoot({
          worker: reducerWorker
     })
  ],
  exports: [
     AddWorkerDialog
  ],
  entryComponents: [
     AddWorkerDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
