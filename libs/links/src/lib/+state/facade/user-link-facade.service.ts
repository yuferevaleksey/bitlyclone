import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as LinksActions from '../actions/links.actions';
import * as LinksSelectors from '../selectors/links.selectors';
import { filter, tap } from 'rxjs';

@Injectable()
export class UserLinkFacade {
  public userLinks$ = this.store.pipe(select(LinksSelectors.getUserLinks));

  public selectedLinkStatistic$ = this.store.pipe(
    select(LinksSelectors.getSelectedLinkStatistic)
  );

  public newLinkCode$ = this.store.pipe(
    select(LinksSelectors.newLinkCode),
    filter(Boolean),
    tap(() => this.reloadUserLinks())
  );

  public selectedLinkCode$ = this.store.pipe(
    select(LinksSelectors.selectedLinkCode)
  );

  constructor(private readonly store: Store) {}

  /**
   * Dispatch fetching user links.
   */
  public fetchUserLinks(): void {
    this.store.dispatch(LinksActions.fetchUserLinks());
  }

  /**
   * Dispatch reloading user links.
   */
  public reloadUserLinks(): void {
    this.store.dispatch(LinksActions.reloadUserLinks());
  }

  /**
   * Dispatch getting link statistic action.
   *
   * @param code
   */
  public getLinkStatistic(code: string): void {
    this.store.dispatch(LinksActions.fetchUserLinkStatistic({ code }));
  }

  /**
   * Dispatch generate new short link action.
   *
   * @param linkUrl
   */
  public generateShortLink(linkUrl: string): void {
    this.store.dispatch(LinksActions.generateNewShortLink({ linkUrl }));
  }

  public selectActiveLink(code: string): void {
    this.store.dispatch(LinksActions.setActiveUserLinkCode({ code }));
  }
}
