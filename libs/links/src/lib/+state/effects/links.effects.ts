import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LinksActions from '../actions/links.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  AddLinkResponseResDto,
  LinksService,
  LinkViewsByDayResponseResDto,
  UserLinkResponseResDto,
} from '@bit-clone-app/api';

@Injectable()
export class LinksEffects {
  public fetchUserLinks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LinksActions.fetchUserLinks, LinksActions.reloadUserLinks),
      switchMap(() => this.linksService.linksControllerFindUserLinks()),
      map((userLinkResponse: UserLinkResponseResDto) =>
        LinksActions.fetchUserLinksSuccess({ userLinkResponse })
      ),
      catchError(() => of(LinksActions.fetchUserLinksFailed))
    )
  );

  public fetchLinkStatistic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LinksActions.fetchUserLinkStatistic),
      switchMap(({ code }) =>
        this.linksService.linksControllerGetDayLinkDayStatistic(code)
      ),
      map((linkViewsResponse: LinkViewsByDayResponseResDto) =>
        LinksActions.fetchUserLinksStatisticSuccess({ linkViewsResponse })
      ),
      catchError(() => of(LinksActions.fetchUserLinksStatisticFailed))
    )
  );

  public generateNewShorLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LinksActions.generateNewShortLink),
      switchMap(({ linkUrl }) =>
        this.linksService.linksControllerGenerateShortLink({
          linkUrl,
        })
      ),
      map((shortLinkResponse: AddLinkResponseResDto) =>
        LinksActions.generateNewShortLinkSuccess({ shortLinkResponse })
      ),
      catchError(() => of(LinksActions.generateNewShortLinkFailed))
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly linksService: LinksService
  ) {}
}
