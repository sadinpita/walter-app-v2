import { Action } from '@ngrx/store'
import { Meetup } from './../models/meetup.model'
import * as MeetupActions from '../actions/meetup.actions'

const initialStateDailyscrum: Meetup = {
     id: 1, name: 'Sadin', time: '08:00', late: false, editing: false
}

export function reducerMeetup(state: Meetup[] = [initialStateDailyscrum], action: MeetupActions.Actions) {

    switch(action.type) {
        case MeetupActions.ADD_ENTRY:
            return [...state, action.payload];
        case MeetupActions.REMOVE_ENTRY:
          state.splice(action.payload, 1)
          return state;
        case MeetupActions.EDIT_ENTRY:
          state[action.payload].editing = true;
          return state;
        case MeetupActions.SAVE_ENTRY:
          state[action.payload].editing = false;
          state[action.payload].name = action.payloadNewName;
          state[action.payload].time = action.payloadNewTime;
          state[action.payload].late = action.newlatevalue;
          return state;
        case MeetupActions.CANCEL_ENTRY:
          state[action.payload].editing = false;
          return state;
        default:
            return state;
    }
}