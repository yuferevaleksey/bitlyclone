import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserLinkPageComponent } from '@bit-clone-app/links/lib/components/link-page/user-link-page.component';
import { LongLinkComponent } from '@bit-clone-app/links/lib/components/long-link/long-link.component';
import { AuthGuard } from '@bit-clone-app/common/lib/guards/auth.guard';
import { LinkResolver } from '@bit-clone-app/links/lib/resolvers/link.resolver';

export const routes: Routes = [
  {
    path: '',
    component: UserLinkPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':code',
    component: LongLinkComponent,
    resolve: {
      longLink: LinkResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinksRoutingModule {}
