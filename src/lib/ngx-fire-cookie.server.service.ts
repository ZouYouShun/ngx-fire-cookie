import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';

import { NgxFireCookieService } from './ngx-fire-cookie.service';
import { getCookie } from './utils';

@Injectable()
export class NgxFireCookieServerService extends NgxFireCookieService {

  constructor(
    @Inject(PLATFORM_ID) public platformId: Object,
    @Inject(DOCUMENT) public document: any,
    @Inject(REQUEST) private _req: any,
  ) {
    super(platformId, document);
    this.initServer();
  }

  private initServer() {
    try {
      this._cookies = JSON.parse(getCookie(this.cookieKey, this._req.headers['cookie']));
    } catch (e) {
      this._cookies = {};
    }
  }

}
