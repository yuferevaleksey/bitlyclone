import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WINDOW } from '@bit-clone-app/common/lib/tokens/window';

@Component({
  selector: 'bit-clone-app-long-link',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LongLinkComponent implements OnInit {
  private data: any;
  constructor(
    private route: ActivatedRoute,
    @Inject(WINDOW) private readonly window: Window
  ) {}

  ngOnInit(): void {
    this.data = this.route.snapshot.data;
    if (this.data?.longLink) {
      this.window.location.href = this.data?.longLink;
    } else {
      // redirect 404
    }
  }
}
