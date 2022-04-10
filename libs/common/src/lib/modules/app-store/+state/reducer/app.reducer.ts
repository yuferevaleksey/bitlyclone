import { Action, createReducer } from '@ngrx/store';
import { AppEntity } from '@bit-clone-app/common/lib/modules/app-store/+state/models/app.entity.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const APP_STATE_FEATURE_KEY = 'appState';

export interface State extends EntityState<AppEntity> {
  error: boolean;
}

export const appAdapter: EntityAdapter<AppEntity> =
  createEntityAdapter<AppEntity>();

export const initialState: State = appAdapter.getInitialState({
  error: false,
});

const appReducer = createReducer(initialState);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}
