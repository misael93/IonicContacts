import { Contacts, Contact, ContactFindOptions, ContactFieldType } from '@ionic-native/contacts';
import { Injectable } from '@angular/core';

@Injectable()
export class ContactsProvider {

  fields: ContactFieldType[] = [];

  constructor(private _contacts: Contacts) { }

  getContacts(): Promise<Contact[]> {
    return new Promise((resolve, reject) => {
      this._contacts.find(['*'])
        .then(contacts => {
          resolve(contacts);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  filter(search: string): Promise<Contact[]> {
    return new Promise((resolve, reject) => {
      var options = new ContactFindOptions();
      options.filter = search;
      this.fields = ['displayName', 'name', 'phoneNumbers'];
      options.multiple = true;
      this._contacts.find(this.fields, options)
        .then(contacts => {
          resolve(contacts);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

}
