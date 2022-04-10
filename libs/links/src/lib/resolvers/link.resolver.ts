import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LinksService } from '@bit-clone-app/api';

@Injectable()
export class LinkResolver implements Resolve<Observable<string>> {
  constructor(private readonly linksService: LinksService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string> {
    return this.linksService
      .linksControllerGetLinkByCode(route.paramMap.get('code') as string)
      .pipe(map((response) => response.body?.longLink));
  }
}
