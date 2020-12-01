import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public alertCtrl: AlertController, public dataService: GroceriesServiceProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  showPrompt(item?) {
    let alert = this.alertCtrl.create({
      title: item ? 'Edit Item' : 'Add Item',
      message: item ? 'Please edit item...' : 'Please enter item',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item? item.name : null
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item? item.quantity : null,
          type: "number"
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }, 
        {
          text: 'Save',
          handler: data => {
            if (item !== undefined) {
              this.dataService.editItem(data, item._id);
            } else {
              this.dataService.addItem(data);
            }
          }
        }
      ]
    });
    alert.present();
  }






}