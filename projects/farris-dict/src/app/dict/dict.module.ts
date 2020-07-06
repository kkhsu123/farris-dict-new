import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FResponseToolbarModule } from "@farris/ui-response-toolbar";
import { SplitterModule } from "@farris/ui-splitter";
import { AngularDraggableModule } from "@farris/ui-draggable";
import { FarrisSectionModule } from "@farris/ui-section";
import { DatagridModule } from "@farris/ui-datagrid";

import { DictRoutingModule } from "./dict-routing.module";
import { RootComponent } from "./components/root/root.component";
import { ListComponent } from "./components/list/list.component";
import { CardComponent } from "./components/card/card.component";

import { FARRIS_DEVKIT_APP_PROVIDERS } from "@farris/devkit";

@NgModule({
  declarations: [RootComponent, ListComponent, CardComponent],
  imports: [
    CommonModule,
    FormsModule,
    DictRoutingModule,
    FResponseToolbarModule,
    SplitterModule,
    AngularDraggableModule,
    FarrisSectionModule,
    DatagridModule,
  ],
  providers: [FARRIS_DEVKIT_APP_PROVIDERS],
})
export class DictModule {}
