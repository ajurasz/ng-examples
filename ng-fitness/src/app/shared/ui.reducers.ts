import { createSelector, createFeatureSelector } from '@ngrx/store';

import { UiActions, UiActionTypes } from './ui.actions';

export interface State {
  isLoading: boolean;
  exercisesLoaded: boolean;
}

const initialState: State = {
  isLoading: false,
  exercisesLoaded: false
};

export function reducer(state = initialState, action: UiActions): State {
  switch (action.type) {
    case UiActionTypes.START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case UiActionTypes.STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case UiActionTypes.EXERCISES_LOADED:
      return {
        ...state,
        exercisesLoaded: true
      };
    default:
      return state;
  }
}

const getState = createFeatureSelector<State>('ui');

export const getIsLoading = createSelector(getState, state => state.isLoading);
