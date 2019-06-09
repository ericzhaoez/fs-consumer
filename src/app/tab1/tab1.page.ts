import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Rental } from '../models';
import { RentalService } from '../services/rental.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public rentals: Array<Rental>

  public properties: Array<Rental>

  public property: Rental = new Rental();

  constructor(
    private  navCtrl:  NavController,
    private rentalService: RentalService,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
    ) {

      console.log(this.rentalService);
      this.rentalService.getAllRentals();
      this.rentals = this.rentalService.rentals;

      console.log(this.rentalService);
      // this.rentalService.getAllProperties();
      this.properties = this.rentalService.properties;

      const propertyId = localStorage.getItem("property_id");
    
      if(propertyId) {
        this.httpClient
          .get("http://localhost:3000/api/properties/")
          .subscribe(
            (response: any) => {
              console.log(response);
              this.properties = response;

              // this.property.id = response.id;
              // this.property.name = response.name;
              // this.property.location = response.location;
              // this.property.imageUrl = response.imageUrl;
              // this.property.price = response.price;
            }
          );
      } else {
        this.navCtrl.navigateForward('tabs');
      }
    

    }

    goBooking(response: any) {
      const propertyId = response.id;
      localStorage.setItem("property_id", propertyId);
      // Navigate
      this.navCtrl.navigateForward("booking", {
        queryParams: {
          property_id: propertyId
        }
      });
    }


// earlier drafts of this function, now commented out
  //   goBooking(property: any) {
  //     const propertyId = property.id;
  //     localStorage.setItem("property_id", propertyId);
  //     this.navCtrl.navigateForward('booking', 
  //     {queryParams: {q: "property_id", 
  //       propertyId: property.id

  //     }
  //   });
  // }

  // goBooking() {
  //   // const property = { };

  //   this.httpClient
  //   .post("http://localhost:3000/api/properties", this.property)
  //   .subscribe(
  //     (response: any) => {
  //       const propertyId = response.id;
  //       localStorage.setItem("property_id", propertyId);
  //       // Navigate
  //       this.navCtrl.navigateForward("booking", {
  //         queryParams: {
  //           property_id: propertyId
  //         }
  //       });
  //     },
  //     err => {
  //       alert("Property not found - this property may have been recently removed");
  //     }
  //   );
  // }


  goHome() {
    this.navCtrl.navigateForward('tabs');
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(
      (parameters: ParamMap) => {
        console.log(parameters);
        console.log(parameters.get("property_id"));

        const propertyId = parameters.get("property_id");


        this.httpClient
          .get("http://localhost:3000/api/properties/")
          .subscribe(
            (response: any) => {
              console.log(response);
              this.properties = response;
              this.property.id = response.id;
              this.property.name = response.name;
              this.property.location = response.location;
              this.property.imageUrl = response.imageUrl;
              this.property.price = response.price;
            }
          );

          /*
          Express:
            return res.json({
              id: 123,
              name: "",
              email: ""
            })
          */
        

        
      }
    );
  }

}
