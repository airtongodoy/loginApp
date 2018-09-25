import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireList } from 'angularfire2/database';
@Injectable()
export class BaseService {

  mapListKeys<T>(list: AngularFireList<T>): Observable<T[]> {
    return list.snapshotChanges().map(actions =>
            actions.map(action => ({ key: action.key, ...action.payload.exportVal()})));
  }


}
