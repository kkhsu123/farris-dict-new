import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DictRoutingModule } from './dict-routing.module';
import { RootComponent } from './components/root/root.component';
import { ListComponent } from './components/list/list.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [RootComponent, ListComponent, CardComponent],
  imports: [
    CommonModule,
    DictRoutingModule
  ]
})
export class DictModule { }
