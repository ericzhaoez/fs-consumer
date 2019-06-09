import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import { User, Review } from '../models';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  public firstname: string;
  public users: Array<User> = new Array();
  public reviews: Array<Review> = new Array();
  
  public setFirstname(firstname: string) {
    this.firstname = firstname;
  }

  public currentUser: User;
  public loggedIn: boolean = true;

  // this line of code imports user from models/user.model
  public user: User = new User();

  public review: Review;

  constructor(
    private navCtrl:  NavController,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
    ) {

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

  let review1 = new Review();
    review1.wordreview = "Pretty nice.";
    review1.rating = 4;
    review1.author = "Alan";
    review1.avatar = "https://www.thewrap.com/wp-content/uploads/2018/09/mcclean.jpg";

  let review2 = new Review();
    review2.wordreview = "Cleaned up everything!";
    review2.rating = 5;
    review2.author = "Jenn";
    review2.avatar = "https://createherstock.com/wp-content/uploads/2018/05/createherstock-downtown-isha-gaines-40-640x360.jpg";

  let review3 = new Review();
    review3.wordreview = "Thank you for staying over!"
    review3.rating = 5;
    review3.author = "Lee";
    review3.avatar = "https://images.thestar.com/F0VhDpMu7NB9Waf6wxVcgPEfbL0=/650x650/smart/filters:cb(1548689313694)/https://www.thestar.com/content/dam/thestar/entertainment/television/analysis/2019/01/25/is-this-the-breakout-year-for-asian-men-in-leading-roles/simu_liu.jpg";

  this.reviews.push(review1);
  this.reviews.push(review2);
  this.reviews.push(review3);

  // this.currentUser = new User();
  // this.currentUser.firstname = "Eric";
  // this.currentUser.lastname = "Zhao";
  // this.currentUser.city = "Toronto";
  // this.currentUser.country = "Canada";
  // this.currentUser.email = "ez.zhao@mail.utoronto.ca"
  // this.currentUser.phone = "+1 647-330-1891";
  // this.currentUser.bookings = 3;

  // let user1 = new User();
  //   user1.firstname = "First";
  //   user1.lastname = "Name";

  // let user2 = new User();
  //   user2.firstname = "Middle";
  //   user2.lastname = "Name";

  // let user3 = new User();
  //   user3.firstname = "Last";
  //   user3.lastname = "Name";

  //   this.users.push(user1);
  //   this.users.push(user2);
  //   this.users.push(user3);

  // this.review1 = new Review();
  // this.review1.wordreview = "Pretty nice.";
  // this.review1.rating = 4;

  // this.review2 = new Review();
  // this.review2.wordreview = "Cleaned up everything!";
  // this.review2.rating = 5;

  // const userId = localStorage.getItem("user_id");
  //   console.log("PROFILE USER ID: ", userId);

  //   if (userId) {
  //     // this.http.get(...);
  //   } else {
  //     // Navigate to login page
  //   }

   }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(
      (parameters: ParamMap) => {
        console.log(parameters);
        console.log(parameters.get("user_id"));

        // http://localhost:8100/profile?user_id=5&param_2=lol
        // ?
        // variable=value
        // &
        // variable2=value

        const userId = parameters.get("user_id");

        // Express:
        // app.get("/api/users/:id", (req, res) ...);
        //this.http.get(`http://localhost:3000/api/users/${userId}`);

        this.httpClient
          .get("http://localhost:3000/api/users/" + userId)
          .subscribe(
            (response: User) => {
              console.log(response);
              this.user.id = response.id;
              this.user.firstname = response.firstname;
              this.user.lastname = response.lastname;
              this.user.email = response.email;
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
  
  goLog() {
    this.navCtrl.navigateForward('login');
  }
  
}
