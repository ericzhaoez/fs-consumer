import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from "@angular/common/http";
import { User } from 'src/app/models';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user: User = new User();
  public email: string = "";
  public password: string = "";

  constructor(
    private  navCtrl:  NavController,
    private httpClient: HttpClient,
    private alertController: AlertController,
    private toastController: ToastController
    ) { }

  // submit() {
  //   console.log("Submitting to the server...");
  //   console.log(this.user);

  //   this.httpClient
  //     .post("http://localhost:3000/api/users/authentication", this.user)
  //     .subscribe(
  //       (response: any) => {
  //         console.log(response);
  //         // this.goLogin();
  //         if (response === Error) {
  //           // this.goAlert();
  //           console.log("Incorrect password");
  //         }
          
  //         else {
  //           this.navCtrl.navigateForward('tabs/tab3', {
  //             queryParams: {
  //               userId: response.id
  //             }
  //           });
  //           this.goToast();
  //         }
  //       });
  //       this.goAlert();

  // }

  submit() {
    const user = {
      email: this.email,
      password: this.password
    };

    this.httpClient
    .post("http://localhost:3000/api/auth", this.user)
    .subscribe(
      (response: any) => {
        const userId = response.id;
        localStorage.setItem("user_id", userId);
        // Navigate
        this.navCtrl.navigateForward("tabs", {
          queryParams: {
            user_id: userId
          }
        });
        this.goToast();
      },
      err => {
        // alert("Failed to login");
        this.goAlert();
      }
    );
  }


  ngOnInit() {
  }
  goHome() {
    this.navCtrl.navigateForward('tabs');
  }

  async goAlert() {
  
    const alert = await this.alertController.create({
      header: 'Login Error',
      message: 'Email or password is not recognized',
      buttons:[
        {
          text: 'OK',
          handler: () => {
            // console.log('OK clicked');
          }
        }
      ]
    });
    return await alert.present();
  }

  async goToast() {
  
    const toast = await this.toastController.create({
      message: 'Login Successful',
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

}




