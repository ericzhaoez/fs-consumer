import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Review } from '../models';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public user: User = new User();

  constructor(
    private  navCtrl:  NavController,
    private httpClient: HttpClient) {

  const userId = localStorage.getItem("user_id");
    
      if(userId) {
        this.httpClient
          .get("http://localhost:3000/api/users/" + userId)
          .subscribe(
            //If you get problems with this code, change response type to any instead of User
            (response: User) => {
              console.log(response);
    
              //The user variable is defined above as a PUBLIC variable which we can use in this page.
              //We reference user in the html now.
              this.user.id = response.id;
              this.user.firstname = response.firstname;
              this.user.lastname = response.lastname;
              this.user.email = response.email;
            }
          );
      } else {
        //Navigate to login page
        this.navCtrl.navigateForward('login');
      }

  }
}
