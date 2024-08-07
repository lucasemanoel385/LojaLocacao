import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client: Client;
  private schedulingSubject: Subject<any> = new Subject<any>();
  private taskSubject: Subject<any[]> = new Subject<any[]>();

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 1000,
      heartbeatIncoming: 1000,
      heartbeatOutgoing: 1000,
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      onConnect: () => {
        this.client.subscribe('/topic/scheduling', (message: Message) => {
          const scheduling = JSON.parse(message.body);
          this.schedulingSubject.next(scheduling);
        });

        this.client.subscribe('/topic/task', (message: Message) => {
          const task = JSON.parse(message.body);
          this.taskSubject.next(task);
        });
        
      }
    });

    this.client.activate();
  }

  public getScheduling(): Observable<any> {
    return this.schedulingSubject.asObservable();
  }

  public getTask(): Observable<any> {
    return this.taskSubject.asObservable();
  }

}
