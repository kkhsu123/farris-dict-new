import { DefaultRepository, NgRepository } from "@farris/devkit";
import { DictEntity } from "./entities/dict.entity";
import { Injectable } from "@angular/core";
@Injectable()
@NgRepository({
  apiUrl: "",
  entityType: DictEntity,
})
export class DictRepository extends DefaultRepository<DictEntity> {}
