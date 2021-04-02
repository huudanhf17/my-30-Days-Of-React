import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { ToggleComponent } from './toggle/toggle.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { MyTabPanelComponent } from './my-tab-panel/my-tab-panel.component';
import { MyTabGroupComponent } from './my-tab-group/my-tab-group.component';
import { CounterComponent } from './counter/counter.component';
import { TabContentDirective } from './tab-content.directive';

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    AuthorListComponent,
    AuthorDetailComponent,
    ToggleComponent,
    TabsComponent,
    TabGroupComponent,
    TabPanelComponent,
    MyTabPanelComponent,
    MyTabGroupComponent,
    CounterComponent,
    TabContentDirective,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
