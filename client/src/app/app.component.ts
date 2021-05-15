import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  id: string;

  constructor(private router: Router,private route: ActivatedRoute) {

     this.route.params.subscribe(params => {
      console.log('The id of this route is: ', params.id);
      this.id = params.id;
    });

  }

  toContracts() {
    if(localStorage.getItem('credential')) {
      let id = localStorage.getItem('credential');
      this.router.navigate(['/contracts', id]);
    } else {
      alert("You're not logged in");
    }
  }

  toProfile() {
    if(localStorage.getItem('credential')) {
      let id = localStorage.getItem('credential');
      this.router.navigate(['/profile', id]);
    } else {
      alert("You're not logged in");
    }
  }


  logout() {
    if(localStorage.getItem('credential')) {
      localStorage.removeItem('credential');
      this.router.navigate(['/login']);
    }
  }
}
