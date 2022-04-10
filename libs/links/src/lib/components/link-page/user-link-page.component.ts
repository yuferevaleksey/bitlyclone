import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserLinkFacade } from '@bit-clone-app/links/lib/+state/facade/user-link-facade.service';
import { filter, Observable, of, switchMap, tap } from 'rxjs';
import { LinkViewsByDay, UserLinkData } from '@bit-clone-app/api';
import * as moment from 'moment';
import { UserLink } from '@bit-clone-app/links/lib/types/user-link.interface';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'bit-clone-app-link-page',
  templateUrl: './user-link-page.component.html',
  styleUrls: ['./user-link-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLinkPageComponent implements OnInit {
  public selectedLinkCode$: Observable<string> =
    this.linkFacade.selectedLinkCode$.pipe(
      filter(Boolean),
      tap((code) => this.linkFacade.getLinkStatistic(code))
    );

  public userLinks$: Observable<UserLink[]> = this.linkFacade.userLinks$;

  public selectedLinkStatistic$: Observable<any> =
    this.linkFacade.selectedLinkStatistic$.pipe(
      filter((statistic) => statistic?.length > 0),
      switchMap((statistic: LinkViewsByDay[]) =>
        of(this.prepareOption(statistic))
      )
    );

  public newLinkCode$: Observable<string> = this.linkFacade.newLinkCode$;
  public currentLocation = location.origin;

  constructor(private linkFacade: UserLinkFacade) {}

  public ngOnInit(): void {
    this.linkFacade.fetchUserLinks();
  }

  /**
   * Set current active code.
   *
   * @param code: string
   */
  public selectCode(code: string) {
    this.linkFacade.selectActiveLink(code);
  }

  /**
   *
   * @param linkUrl: string
   */
  public generateShortLink(linkUrl: string) {
    this.linkFacade.generateShortLink(linkUrl);
  }

  /**
   * Track By function for user links list
   * @param index
   * @param el
   */
  public trackByLinkCode(index: number, el: UserLinkData): string {
    return el.linkCode;
  }

  /**
   * Prepare options for Echars graphic
   * @param statistic
   * @private
   */
  private prepareOption(statistic: LinkViewsByDay[]): EChartsOption {
    const xAxisData = statistic.map((item) =>
      moment(item.viewDate).format('YYYY-MM-DD')
    );
    const yAxisData = statistic.map((item) => item.count);
    const code = statistic[0].linkCode;
    const legend = [code];

    return {
      legend: {
        data: legend,
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        min: 1,
      },
      series: [
        {
          name: code,
          type: 'bar',
          data: yAxisData,
          animationDelay: 400,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: 400,
    };
  }
}
