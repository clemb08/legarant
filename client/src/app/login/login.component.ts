import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog'
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(private router: Router, private loginService: LoginService) { }

  username: string;
  password: string;

  showSpinner: boolean;

  ngOnInit(): void {
  }

  async login() : Promise<void> {
    let id = await this.loginService.loginUser(this.username, this.password).toPromise();
    console.log(id);
    if(id !== 'Unauthorized' && id!== '{ "Error" : { "title": "The parameters are not correct"}}') {
      localStorage.setItem('credential', id);
      this.router.navigate(['/profile', id]);
    } else {
      alert('Bad credentials');
    }
  }

}
