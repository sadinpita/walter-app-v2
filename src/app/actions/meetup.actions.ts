import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Meetup } from './../models/meetup.model'

export const ADD_ENTRY       = '[ENTRY] Add'
export const REMOVE_ENTRY    = '[ENTRY] Remove'
export const EDIT_ENTRY      = '[ENTRY] Edit'
export const SAVE_ENTRY      = '[ENTRY] Save'
export const CANCEL_ENTRY    = '[ENTRY] Cancel'

export class AddEntry implements Action {
    readonly type = ADD_ENTRY

    constructor(public payload: Meetup) {}
}

export class RemoveEntry implements Action {
    readonly type = REMOVE_ENTRY

    constructor(public payload: number) {}
}

export class EditEntry implements Action {
     readonly type = EDIT_ENTRY
 
     constructor(public payload: number) {}
}

export class SaveEntry implements Action {
     readonly type = SAVE_ENTRY
 
     constructor(public payload: number, public payloadNewName: string, public payloadNewTime: string, public newlatevalue: boolean) {}
}

export class CancelEntry implements Action {
     readonly type = CANCEL_ENTRY
 
     constructor(public payload: number) {}
}

export type Actions = AddEntry | RemoveEntry | EditEntry | SaveEntry | CancelEntry