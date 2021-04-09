import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  constructor() {}

  add(mess: string) {
    this.messages = [...this.messages, mess];
  }

  clear() {
    this.messages = [];
  }
}
