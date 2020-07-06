import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Form, NgFormControl } from "@farris/devkit";
@Injectable()
export class CardForm extends Form {
  @NgFormControl({
    binding: "id",
  })
  id: FormControl;
  @NgFormControl({
    binding: "code",
    updateOn: "blur",
  })
  code: FormControl;
  @NgFormControl({
    binding: "name",
    updateOn: "blur",
  })
  name: FormControl;
}
