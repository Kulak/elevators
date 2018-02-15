import { Injectable } from '@angular/core';

@Injectable()
export class MessagesService {
  private messages: string[] = []

  constructor() { }

  add(message: string) {
    this.messages.push(message)
  }

  /** 
   * Returns up to 3 most recent messages.
  */
  getMessages(): string[] {
    const len = this.messages.length
    const amount = 3
    let idx = len - amount
    if (idx < 0) {
      idx = 0
    }
    return this.messages.slice(idx, len)
  }

  clear() {
    this.messages = []
  }
}
