import { Component, OnInit } from '@angular/core';
import { User } from '../_models';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-userupdate',
  templateUrl: './userupdate.component.html',
  styleUrls: ['./userupdate.component.css']
})
export class UserupdateComponent implements OnInit {
    user:User;
    editForm: FormGroup;
    loading = false;
    submitted = false;

  constructor(
    private route:ActivatedRoute, 
    private userService:UserService,
    private formBuilder:FormBuilder,
    private location: Location,
    private router:Router) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
      // username: ['', Validators.required],
      // password: ['', [Validators.required, Validators.minLength(6)]]
  });
    this.getUser();
  }

  getUser():void{
    //Route parameters are always strings. 
    // The JavaScript (+) operator converts the string to a number, 
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getById(id)
    .subscribe(data=>{
      this.editForm.patchValue(data);
    })
  }

  goBack():void{
    this.location.back();
  }

  onSubmit(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.update(id,this.user)
    .subscribe(()=>{
      this.router.navigate(['/'])
    })
    // console.log("updated");
  }
}
