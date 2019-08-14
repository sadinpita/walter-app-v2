import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Worker } from './../models/worker.model'

export const ADD_WORKER       = '[WORKER] Add'
export const REMOVE_WORKER    = '[WORKER] Remove'
export const EDIT_WORKER      = '[WORKER] Edit'
export const SAVE_WORKER      = '[WORKER] Save'

export class AddWorker implements Action {
    readonly type = ADD_WORKER

    constructor(public payload: Worker) {}
}

export class RemoveWorker implements Action {
    readonly type = REMOVE_WORKER

    constructor(public payload: number) {}
}

export class EditWorker implements Action {
     readonly type = EDIT_WORKER
 
     constructor(public payload: number) {}
}

export class SaveWorker implements Action {
     readonly type = SAVE_WORKER
 
     constructor(public payload: number, public payloadNewName: string) {}
}

export type Actions = AddWorker | RemoveWorker | EditWorker | SaveWorker