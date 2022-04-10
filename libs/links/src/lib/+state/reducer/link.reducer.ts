import { Action, createReducer, on } from '@ngrx/store';
import { LinksEntity } from '@bit-clone-app/links/lib/+state/models/links.entity.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LinkViewsByDay } from '@bit-clone-app/api';
import * as LinksActions from '../actions/links.actions';
import { UserLink } from '@bit-clone-app/links/lib/types/user-link.interface';
import {
  mapUserLinks,
  updateSelectedUserLink,
} from '@bit-clone-app/links/lib/+state/mappers/links.mapper.utils';
import { setActiveUserLinkCode } from '../actions/links.actions';

export const LINKS_FEATURE_KEY = 'links';
export interface State extends EntityState<LinksEntity> {
  selectedLinkCode: string;
  userLinksLoading: boolean;
  userLinksStatisticLoading: boolean;
  generateShortLinkLoading: boolean;
  userLinks: UserLink[];
  selectedLinkStatistic: LinkViewsByDay[];
  newLinkCode: string;
  error: boolean;
}

export const linkAdapter: EntityAdapter<LinksEntity> =
  createEntityAdapter<LinksEntity>();

export const initialState: State = linkAdapter.getInitialState({
  userLinksLoading: false,
  selectedLinkCode: '',
  userLinksStatisticLoading: false,
  generateShortLinkLoading: false,
  newLinkCode: '',
  userLinks: [],
  selectedLinkStatistic: [],
  error: false,
});

const linkReducer = createReducer(
  initialState,
  on(LinksActions.resetState, () => initialState),
  on(LinksActions.fetchUserLinks, LinksActions.reloadUserLinks, (state) => ({
    ...state,
    userLinksLoading: true,
    userLinks: [],
    statistic: [],
  })),
  on(LinksActions.fetchUserLinksSuccess, (state, { userLinkResponse }) => ({
    ...state,
    userLinksLoading: false,
    userLinks: mapUserLinks(userLinkResponse.body?.userLinks),
    selectedLinkCode: userLinkResponse.body?.userLinks[0].linkCode,
  })),
  on(LinksActions.fetchUserLinksFailed, (state) => ({
    ...state,
    userLinksLoading: false,
    error: true,
  })),
  on(LinksActions.setActiveUserLinkCode, (state, { code }) => ({
    ...state,
    userLinksStatisticLoading: true,
    userLinks: updateSelectedUserLink(state.userLinks, code),
    selectedLinkCode: code,
  })),
  on(LinksActions.fetchUserLinkStatistic, (state) => ({
    ...state,
    userLinksStatisticLoading: true,
  })),
  on(
    LinksActions.fetchUserLinksStatisticSuccess,
    (state, { linkViewsResponse }) => ({
      ...state,
      userLinksStatisticLoading: false,
      selectedLinkStatistic: linkViewsResponse.body?.linkStatistic,
    })
  ),
  on(LinksActions.fetchUserLinksStatisticFailed, (state) => ({
    ...state,
    userLinksStatisticLoading: false,
    error: true,
  })),
  on(LinksActions.generateNewShortLink, (state) => ({
    ...state,
    generateShortLinkLoading: true,
    newLinkCode: '',
  })),
  on(
    LinksActions.generateNewShortLinkSuccess,
    (state, { shortLinkResponse }) => ({
      ...state,
      generateShortLinkLoading: false,
      newLinkCode: shortLinkResponse.body?.linkCode,
    })
  ),
  on(LinksActions.generateNewShortLinkFailed, (state) => ({
    ...state,
    generateShortLinkLoading: false,
    newLinkCode: '',
    error: true,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return linkReducer(state, action);
}
