import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { User, Rental } from '../models';
import { RentalService } from '../services/rental.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  public property: Rental;

  public booking: any = {
    dateFrom: "",
    dateTo: "",
  };

  constructor(
    private navCtrl : NavController,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private toastController: ToastController,
    private rentalService: RentalService
  ) { 


  const propertyId = localStorage.getItem("property_id");
    
  if(propertyId) {
    this.httpClient
      .get("http://localhost:3000/api/properties" + propertyId)
      .subscribe(
        //If you get problems with this code, change response type to any instead of User
        (response: any) => {
          console.log(response);

          //The property variable is defined above as a PUBLIC variable which we can use in this page.
          //We reference property in the html now.
          this.property.id = response.id;
          this.property.name = response.name;
          this.property.location = response.location;
          this.property.imageUrl = response.imageUrl;
          this.property.price = response.price;
        }
      );
  } else {
    //Navigate to login page
    this.navCtrl.navigateForward('tabs');
  }

}

// ngOnInit() {
//   this.activatedRoute.queryParamMap.subscribe(
//       (parameters: ParamMap) => {
//         console.log(parameters);
//         console.log(parameters.get("property_id"));

//         const propertyId = parameters.get("property_id");

//         this.httpClient
//           .get("http://localhost:3000/api/properties/" + propertyId)
//           .subscribe(
//             (response: any) => {
//               console.log(response);
//               this.property.id = response.id;
//               this.property.name = response.name;
//               this.property.location = response.location;
//               this.property.imageUrl = response.imageUrl;
//               this.property.price = response.price;
//             });        
//       });
//   }

  ngOnInit() {

    // let arrow = (data: any) => {
    //   this.property.id = data.params.property_id;
    //   // this.provider.id = data.params.providerId;
    //   console.log(this.property.id);
    //   // console.log(this.provider.id);
    // }
 
    // this.activatedRoute.queryParamMap.subscribe(arrow);

    // const callback = (err, property) => {
    //   if (err) {
    //     alert(err.error.message);
    //     return;
    //   }
    //   console.log(property);
    //   this.property = property;
    // };
 
    // this.rentalService.findPropertybyId(this.property.id, callback);

    // this.activatedRoute.queryParamMap.subscribe(
    //   (parameters: ParamMap) => {
    //     console.log(parameters);
    //     console.log(parameters.get("property_id"));

    //     const propertyId = parameters.get("property_id");


    //     this.httpClient
    //       .get("http://localhost:3000/api/properties/" + propertyId)
    //       .subscribe(
    //         (response: Rental) => {
    //           console.log(response);
    //           this.property.id = response.id;
    //           this.property.name = response.name;
    //           this.property.location = response.location;
    //           this.property.imageUrl = response.imageUrl;
    //           this.property.price = response.price;
    //         }
    //       );

        
    //   }
    // );
  }
  

goBack() {
  this.navCtrl.navigateForward('tabs');
}

submit() {
  console.log("Submitting to the server...");
  console.log(this.booking);

  this.httpClient
    .post("http://localhost:3000/api/properties/:id/bookings", this.booking)
    .subscribe(
      (response: any) => {
        console.log(response);
        this.navCtrl.navigateForward('tabs', {
          // queryParams: {
          //   propertyId: response.id
          // }
        });
        this.goToast();
      },
      (err) => {
        console.log(err);
        // this.goAlert(err.error.message);
      }
    );
}

goHome() {
  this.navCtrl.navigateForward('tabs');
}

async goToast() {
  const toast = await this.toastController.create({
    header: 'Thank you for your submission!',
    duration: 5000,
    position: 'top',
    // buttons: [
    //   {
    //     text: 'Hide',
    //     role: 'cancel',
    //     handler: () => {
    //       console.log('Cancel clicked');
    //     }
    //   }
    // ]
  });
  toast.present();
}

}

