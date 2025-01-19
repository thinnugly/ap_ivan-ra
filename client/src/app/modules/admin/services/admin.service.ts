import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { Item } from '../models/item.model';
import { ItemAssign } from '../models/Item_assign';
import { ItemDeploy } from '../models/deploy.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }

  getUsers(): Observable<any> {
    return this.http.get('api/admin/users', {
      headers: this.createAuthorizationHeader(),
    });
  }

  postActivityConfig(formData: FormData): Observable<any> {
    return this.http.post('api/admin/configuracao', formData, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getActivityConfigs(): Observable<Item[]> {
    return this.http.get<Item[]>('api/admin/configurations', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCountUsers(): Observable<number> {
    return this.http.get<number>('api/admin/countusers', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCountActivitiesConfigurations(): Observable<number> {
    return this.http.get<number>('api/admin/countactivitiesconfigurations', {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteActivityConfig(id: number): Observable<any> {
    return this.http.delete('api/admin/configuracao/' + id, {
      headers: this.createAuthorizationHeader(),
    });
  }

  putActivityConfig(id: number, formData: FormData): Observable<any> {
    return this.http.put('api/admin/configuracao/' + id, formData, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAssignActivities(): Observable<ItemAssign[]> {
    return this.http.get<ItemAssign[]>('api/admin/assignactivities', {
      headers: this.createAuthorizationHeader(),
    });
  }

  postAssignActivity(userActivityDTO: any): Observable<any> {
    return this.http.post('api/admin/assignactivity', userActivityDTO, {
      headers: this.createAuthorizationHeader(),
    });
  }

  putAssignActivity(id: number, userActivityDTO: any): Observable<any> {
    return this.http.put('api/admin/assignactivity/' + id, userActivityDTO, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteAssignActivity(id: number): Observable<any> {
    return this.http.delete('api/admin/assignactivity/' + id, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCountDeployActivity(): Observable<number> {
    return this.http.get<number>('api/admin/countdeployactivitiesbyuserid', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getDeployActivities(): Observable<ItemDeploy[]> {
    return this.http.get<ItemDeploy[]>('api/admin/deployactivities', {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteDeployActivity(id: number): Observable<any> {
    return this.http.delete('api/admin/deletedeployactivity/' + id, {
      headers: this.createAuthorizationHeader(),
    });
  }

  putDeployActivity(id: number, formData: FormData): Observable<any> {
    return this.http.put('api/admin/deployactivities/' + id, formData, {
      headers: this.createAuthorizationHeader(),
    });
  }


}
