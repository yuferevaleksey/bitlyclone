import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  LINKS_FEATURE_KEY,
  State,
} from '@bit-clone-app/links/lib/+state/reducer/link.reducer';

export const getLinksState = createFeatureSelector<State>(LINKS_FEATURE_KEY);

export const getUserLinks = createSelector(
  getLinksState,
  (state: State) => state.userLinks
);

export const getSelectedLinkStatistic = createSelector(
  getLinksState,
  (state: State) => state.selectedLinkStatistic
);

export const newLinkCode = createSelector(
  getLinksState,
  (state: State) => state.newLinkCode
);

export const selectedLinkCode = createSelector(
  getLinksState,
  (state: State) => state.selectedLinkCode
);
