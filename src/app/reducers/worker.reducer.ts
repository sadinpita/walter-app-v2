import { Action } from '@ngrx/store'
import { Worker } from '../models/worker.model'
import * as WorkerActions from '../actions/worker.actions'

const initialStateWorker: Worker = {
     id: 1, name: 'Sadin', editing: false
}

export function reducerWorker(state: Worker[] = [initialStateWorker], action: WorkerActions.Actions) {

    switch(action.type) {
        case WorkerActions.ADD_WORKER:
            return [...state, action.payload];
        case WorkerActions.REMOVE_WORKER:
          state.splice(action.payload, 1)
          return state;
        case WorkerActions.EDIT_WORKER:
          state[action.payload].editing = true;
          return state;
        case WorkerActions.SAVE_WORKER:
          state[action.payload].editing = false;
          state[action.payload].name = action.payloadNewName;
          return state;
        default:
            return state;
    }
}