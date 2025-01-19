import { Injectable } from '@angular/core';
import { StompService } from '@stomp/ng2-stompjs';
import { Subject } from 'rxjs';
import { StorageService } from '../auth/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompService: StompService;
  private notificationsSubject = new Subject<string>();
  private userEmail: any = StorageService.getUser();

  constructor() {
    this.stompService = new StompService({
      url: '/ws',
      headers: {},
      reconnect_delay: 5000,
      debug: true,
      heartbeat_in: 0,
      heartbeat_out: 20000,
    });

    this.stompService.activate();

    if (this.stompService.connected ()) {
      console.log('Conexão WebSocket ativa');
    } else {
      console.log('Conexão WebSocket não ativa');
    }

    this.userEmail = this.userEmail.username;
    this.stompService.watch(`/queue/notifications/${this.userEmail}`).subscribe((message) => {
      const notification = JSON.parse(message.body);
      this.notificationsSubject.next(notification.message);
    });
  }

  getNotifications() {
    return this.notificationsSubject.asObservable();
  }
}
