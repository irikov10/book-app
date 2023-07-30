import { Component, ElementRef } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  styles: [ `li > a.active { background: darkblue; padding: 5px 15px; border-radius: 30px; }` ]
})
export class HeaderComponent {
  
  constructor(public userService: UserService) {}
}
