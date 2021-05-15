import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  id: string;
  data: any;
  user: User;
  state: string;
  profileForm: FormGroup;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.user = new User();
   }

  ngOnInit(): void {
    this.state = 'view';

    this.route.params.subscribe(params => {
      console.log('The id of this route is: ', params.id);
      this.id = params.id;
    });

    this.userService.getContactById(this.id).toPromise()
    .then((data) => {
      console.log(data);
      this.user = new User(data.name, data.username__c, data.email, data.title, data.homephone, data.mobilephone);
      console.log(this.user);

      this.profileForm = new FormGroup({
        nameForm:new FormControl(this.user.name, Validators.required),
        usernameForm:new FormControl(this.user.username, Validators.required),
        titleForm:new FormControl(this.user.title),
        emailForm:new FormControl(this.user.email, [Validators.required, Validators.email]),
        phoneForm:new FormControl(this.user.phone),
        mobileForm:new FormControl(this.user.mobile)
      });


    })
    .catch((err) => {
      console.log(err);
    })
  }

  editProfile() {
    this.state = 'edit';
    console.log('EDIT');
  }

  cancelEdit() {
    this.state = 'view';
  }

  onSubmit() {

    console.log(this.profileForm.value);
    console.log(this.id);

    this.userService.updateContact(this.id, this.profileForm.value).toPromise()
    .then(() => {
      this.user = {
        id: this.id,
        name: this.profileForm.value.name,
        username: this.profileForm.value.usenrame,
        title: this.profileForm.value.title,
        email: this.profileForm.value.email,
        phone: this.profileForm.value.phone,
        mobile: this.profileForm.value.mobile
      }
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    })
    console.log('submit');
  }

}
