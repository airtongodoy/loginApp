import { NewsPage } from './../news/news';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NewsPage;
  tab2Root = ContactPage;
  tab3Root = AboutPage;

  constructor() {

  }

}
