import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),   {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '745628972767-3mlbmn5lcps4d1joe97ftckonu6gtio8.apps.googleusercontent.com'
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('clientId')
        }
      ],
      // providers: [
      //   {
      //     id: FacebookLoginProvider.PROVIDER_ID,
      //     provider: new FacebookLoginProvider('337362629218518'),
      //   },
      //   {
      //     id: GoogleLoginProvider.PROVIDER_ID,
      //     provider: new GoogleLoginProvider(
      //       '745628972767-6hdrglvtjp8fi8ohq9m2qqkjv4r7st4q.apps.googleusercontent.com'
      //     )
      //   }
      // ],
      onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
  },]
};
