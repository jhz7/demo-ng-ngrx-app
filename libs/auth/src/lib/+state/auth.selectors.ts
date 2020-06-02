import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthData } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const getAuthState = createFeatureSelector<AuthData>('auth');

export const getUser = createSelector(
  getAuthState,
  (state: AuthData) => state.user
);

/* export const getSelected = createSelector(
  getAuthEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
 */