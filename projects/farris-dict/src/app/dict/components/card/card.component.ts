import { Component, OnInit, HostBinding, Injector } from "@angular/core";
import {
  FrameComponent,
  FARRIS_DEVKIT_FRAME_PROVIDERS,
  FRAME_ID,
  ViewModel,
  BindingData,
  Form,
} from "@farris/devkit";
import { CardViewModel } from "../../viewmodels/card.viewmodel";
import { CardBindingData } from "../../viewmodels/bindingdata/card.bindingdata";
import { CardForm } from "../../viewmodels/form/card.form";
@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
  providers: [
    FARRIS_DEVKIT_FRAME_PROVIDERS,
    { provide: FRAME_ID, useValue: "card" },
    { provide: ViewModel, useClass: CardViewModel },
    { provide: BindingData, useClass: CardBindingData },
    { provide: Form, useClass: CardForm },
  ],
})
export class CardComponent extends FrameComponent implements OnInit {
  @HostBinding("class.f-struct-wrapper")
  cls = true;
  data = {
    id: "001",
    code: "1",
    name: "A",
  };
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit() {}
}
