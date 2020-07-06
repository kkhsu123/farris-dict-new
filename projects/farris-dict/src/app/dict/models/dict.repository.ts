import { DefaultRepository, NgRepository } from "@farris/devkit";
import { DictEntity } from "./entities/dict.entity";
import { Injectable, Injector } from "@angular/core";
import {
  DictMockDataService,
  ResponseInfo,
} from "./services/dict-mock.data.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
@Injectable()
@NgRepository({
  apiUrl: "",
  entityType: DictEntity,
})
export class DictRepository extends DefaultRepository<DictEntity> {
  constructor(injector: Injector, private dataService: DictMockDataService) {
    super(injector);
  }
  getList(): Observable<any> {
    return this.dataService.getAll().pipe(
      map((response: ResponseInfo) => {
        this.entityCollection.loadEntities(
          this.buildEntities(response.returnValue)
        );
        return true;
      })
    );
  }
}
