import { makeAutoObservable } from 'mobx';


interface MessageData {
  _id: string;
  channel: string;
  content?: string;
  createdBy: {
    _id: string;
    username: string;
    tag: string;
    hexColor: string;
  }
  createdAt: number;
  editedAt?: number;
}

export class Message {
  _id: string;
  channel: string;
  content?: string;
  createdAt: number;
  createdBy: {
    _id: string;
    username: string;
    tag: string;
    hexColor: string;
  };
  editedAt?: number;

  constructor(data: MessageData) {
    this._id = data._id;
    makeAutoObservable(this, {_id: false});
    this.channel = data.channel;
    this.content = data.content;
    this.createdAt = data.createdAt;
    this.editedAt = data.editedAt;
    this.createdBy = data.createdBy;
  }
  

}