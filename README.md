
[![NPM version](https://badge.fury.io/js/ngx-fire-cookie.svg)](http://badge.fury.io/js/ngx-fire-cookie)
# ngx-fire-cookie
firebase with firebase cookie library, support server side render(ssr).


# Why
Because cookie only can use the special key `__session` in the firebase, to use cookie more convenient, we provide an easy way to store data like nomal `Storage`.

## Description

firebase only can use the `_session`, so we parse the data to JSON string, and store that in only one `__session` key.

## Install

```ts
npm install --save ngx-fire-cookie
```

#### AppBrowserModule

```ts
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxFireCookieService } from 'ngx-fire-cookie';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AppModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    NgxFireCookieService  // add service in here
  ]
})
export class AppBrowserModule { }
```

#### AppServerModule

If you using angular universal(ssr), you should import the `ServerService`;
```ts
import { NgxFireCookieServerService, NgxFireCookieService } from 'ngx-fire-cookie';

@NgModule({
  imports: [
    ...
  ],
  providers: [
    ...
    { provide: NgxFireCookieService, useClass: NgxFireCookieServerService }
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule { }

```

# Usage

app.component.ts
```ts

export class AppComponent implements OnInit {

  constructor(
    private cookie: NgxFireCookieService,
  ) {
  }

  ngOnInit(){
    this.cookie.setItem('theme', 'dark');

    console.log(this.cookie.getAll());          // { theme: dark }
    console.log(this.cookie.getItem('theme'));  // dark
    
    this.cookie.removeItem('theme');

    console.log(this.cookie.getItem('theme'));  // undefined
  }

```


## Method


| Name                 | Description | 
| ------------------------ | -------- | 
| `setItem(key: string, data: string)` | set data with key name. | 
| `getItem(key: string)` | return data with key name. | 
| `removeItem(key: string)` | remove data with key name. | 
| `getAll()` | return object with all data.  | 
| `clear()` | clear all data | 

