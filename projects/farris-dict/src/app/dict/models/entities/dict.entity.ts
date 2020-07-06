import { Entity, NgField } from "@farris/devkit";
export class DictEntity extends Entity {
  @NgField({
    dataField: "id",
    primary: true,
  })
  id: string;
  @NgField({
    dataField: "code",
  })
  code: string;
  @NgField({
    dataField: "name",
  })
  name: string;
}
