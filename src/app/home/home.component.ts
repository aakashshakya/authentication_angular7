import { Component, OnInit } from '@angular/core';
import { UserService, AuthenticationService } from '../_services';
import { User } from '../_models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  currentUserSubscription: Subscription;

  users: User[] = [];
  constructor(private userService:UserService,private authenticationService:AuthenticationService, private router:Router) { 
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user=>{
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.getAllUser();
  }

  // ngOnDestroy() {
  //   // unsubscribe to ensure no memory leaks
  //   this.currentUserSubscription.unsubscribe();
  // }

  getAllUser(){
    this.userService.getAll()
    .subscribe(data=>{
      this.users = data;
      console.log(this.users);
    },(error)=>{
      console.log('error occurred:',error)
    })
   
  }

  deleteUser(id:number){
    this.userService.delete(id)
    .subscribe(data=>{
      console.log(data);
      console.log("deleted")
      this.getAllUser();
    },(error)=>{
      console.log("data not deleted",error)
    });
  }
    updateUser(user:User){
        this.router.navigate(['/update-user',user.id])
    }
}


