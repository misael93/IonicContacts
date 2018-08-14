import { IContactProperties, Contact } from '@ionic-native/contacts';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactsProvider } from '../../providers/contacts/contacts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contacts: Contact[];

  constructor(
    private navCtrl: NavController,
    private _contactsProvider: ContactsProvider
  ) {
    this.initContacts();
  }

  initContacts = () => {
    this._contactsProvider.getContacts()
      .then(contacts => {
        this.contacts = contacts;
        console.log(this.contacts);
      })
      .catch(err => {
        console.log(err);
      });
  }

  searchContacts = (ev: any) => {
    // 
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this._contactsProvider.filter(val)
        .then(contacts => {
          this.contacts = contacts;
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.initContacts();
    }
  }

}
