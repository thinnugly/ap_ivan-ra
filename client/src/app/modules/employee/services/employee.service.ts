import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service'
import { Item } from '../models/item.model';
import { ItemDeploy } from '../models/deploy.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private refreshNeeded = new BehaviorSubject<boolean>(false);
  refreshNeeded$ = this.refreshNeeded.asObservable();

  triggerRefresh() {
    this.refreshNeeded.next(true);
  }


  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    );
  }

  getActivityConfigs(): Observable<Item[]> {
    return this.http.get<Item[]>("api/employee/assignactivities", {
      headers: this.createAuthorizationHeader()
    });
  }

  getCountActivitiesConfigurations(): Observable<number> {
    return this.http.get<number>("api/employee/countactivitiesconfigurations", {
      headers: this.createAuthorizationHeader()
    });
  }

  getCountDeployActivity(): Observable<number> {
    return this.http.get<number>('api/employee/countdeployactivitiesbyuserid', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getDeployActivities(): Observable<ItemDeploy[]> {
    return this.http.get<ItemDeploy[]>('api/employee/deployactivities', {
      headers: this.createAuthorizationHeader(),
    });
  }

  postDeployActivity(formData: FormData): Observable<any> {
    return this.http.post('api/employee/deployactivities', formData, {
      headers: this.createAuthorizationHeader(),
    });
  }

  putDeployActivity(id: number, formData: FormData): Observable<any> {
    return this.http.put('api/employee/deployactivities/'+id, formData, {
      headers: this.createAuthorizationHeader(),
    });
  }
}
