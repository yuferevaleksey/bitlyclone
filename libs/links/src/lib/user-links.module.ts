import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLinkPageComponent } from './components/link-page/user-link-page.component';
import { LinksRoutingModule } from '@bit-clone-app/links/lib/links-routing.module';
import { UserLinkFacade } from '@bit-clone-app/links/lib/+state/facade/user-link-facade.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LinksEffects } from '@bit-clone-app/links/lib/+state/effects/links.effects';
import * as Links from '../lib/+state/reducer/link.reducer';
import { LongLinkComponent } from './components/long-link/long-link.component';
import { LinkResolver } from '@bit-clone-app/links/lib/resolvers/link.resolver';
import { GenerateLinkFormComponent } from './components/generate-link-form/generate-link-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    LinksRoutingModule,
    StoreModule.forFeature(Links.LINKS_FEATURE_KEY, Links.reducer),
    EffectsModule.forFeature([LinksEffects]),
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  declarations: [
    UserLinkPageComponent,
    LongLinkComponent,
    GenerateLinkFormComponent,
  ],
  providers: [UserLinkFacade, LinkResolver],
})
export class UserLinksModule {}
