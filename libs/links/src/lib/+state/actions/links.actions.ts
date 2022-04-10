import { createAction, props } from '@ngrx/store';
import {
  AddLinkResponseResDto,
  LinkViewsByDayResponseResDto,
  UserLinkResponseResDto,
} from '@bit-clone-app/api';
import { HttpErrorResponse } from '@angular/common/http';

export const resetState = createAction('[Link Page] Reset State');

export const fetchUserLinks = createAction('[Link Page] Fetch User Links');
export const reloadUserLinks = createAction('[Link Page] Reload User Links');

export const fetchUserLinksSuccess = createAction(
  '[Link Page] Fetch User Links Success',
  props<{
    userLinkResponse: UserLinkResponseResDto;
  }>()
);

export const fetchUserLinksFailed = createAction(
  '[Link Page] Fetch User Links  Failed',
  props<{ httpError: HttpErrorResponse }>()
);

export const fetchUserLinkStatistic = createAction(
  '[Link Page] Fetch User Links Statistic',
  props<{ code: string }>()
);

export const fetchUserLinksStatisticSuccess = createAction(
  '[Link Page] Fetch User Links Statistic Success',
  props<{
    linkViewsResponse: LinkViewsByDayResponseResDto;
  }>()
);

export const fetchUserLinksStatisticFailed = createAction(
  '[Link Page] Fetch User Links Statistic Failed',
  props<{ httpError: HttpErrorResponse }>()
);

export const generateNewShortLink = createAction(
  '[Link Page] Generate New Short Link',
  props<{ linkUrl: string }>()
);

export const generateNewShortLinkSuccess = createAction(
  '[Link Page] Generate New Short Link Success',
  props<{
    shortLinkResponse: AddLinkResponseResDto;
  }>()
);

export const generateNewShortLinkFailed = createAction(
  '[Link Page] Generate New Short Link Failed',
  props<{ httpError: HttpErrorResponse }>()
);

export const setActiveUserLinkCode = createAction(
  '[Link Page] Set Active User Link Code',
  props<{ code: string }>()
);
