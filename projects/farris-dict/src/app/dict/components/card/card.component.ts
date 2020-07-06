import { Component, OnInit, HostBinding } from "@angular/core";
@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent implements OnInit {
  @HostBinding("class.f-struct-wrapper")
  cls = true;
  data = {
    id: "001",
    code: "1",
    name: "A",
  };
  constructor() {}
  ngOnInit() {}
}
