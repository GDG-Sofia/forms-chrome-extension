import { Component } from '@angular/core';

declare var chrome: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chrome-extension';

  openSettings() {
    chrome.tabs.create({
      url: chrome.runtime.getURL('settings/index.html')
    });
  }
}
