import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { getCookie } from './utils';

@Injectable()
export class NgxFireCookieService {

  protected cookieKey = '__session';

  protected get cookies() {
    return this._cookies;
  }

  protected set cookies(value) {
    this._cookies = value;

    if (Object.keys(value).length === 0) {
      const d = new Date(); // Create an date object
      d.setTime(d.getTime() - 86400000); // 1000 * 60 * 60 * 24 Set the time to the past. 1000 milliseonds = 1 second
      const expires = 'expires=' + d.toUTCString(); // Compose the expirartion date
      this.document.cookie = `${this.cookieKey} =; ${expires}`;
    } else {
      this.document.cookie = `${this.cookieKey} = ${JSON.stringify(value)}`;
    }
  }

  protected _cookies = {};

  constructor(
    @Inject(PLATFORM_ID) public platformId: Object,
    @Inject(DOCUMENT) public document: any,
  ) {
    this.init();
  }

  getItem(key: string): string {
    return this.cookies[key];
  }

  getAll() {
    return this.cookies;
  }

  clear(): void {
    if (this.isServer()) { return; }
    this.cookies = {};
  }

  removeItem(key: string): void {
    if (this.isServer()) { return; }
    delete this.cookies[key];
    this.cookies = this.cookies;
  }

  setItem(key: string, data: string): void {
    if (this.isServer()) { return; }
    this.cookies = {
      ...this.cookies,
      [key]: encodeURIComponent(data)
    };
  }

  private init() {
    if (this.isServer()) { return; }
    try {
      this._cookies = JSON.parse(getCookie(this.cookieKey, this.document.cookie));
    } catch (e) {
      this._cookies = {};
    }
  }

  private isServer() {
    return isPlatformServer(this.platformId);
  }
}

