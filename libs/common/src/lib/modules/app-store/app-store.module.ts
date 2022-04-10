import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import {
  APP_STATE_FEATURE_KEY,
  reducer,
} from '@bit-clone-app/common/lib/modules/app-store/+state/reducer/app.reducer';
import { AppEffects } from '@bit-clone-app/common/lib/modules/app-store/+state/effects/app.effects';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../../../../../../apps/bit-clone-app/src/environments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(
      { [APP_STATE_FEATURE_KEY]: reducer },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([AppEffects]),
  ],
})
export class AppStoreModule {}
