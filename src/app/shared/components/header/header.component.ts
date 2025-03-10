import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor (private route: Router) {

  }
  Gohome(){
    this.route.navigate(['/home']);
  }

  GoProducts(){
    this.route.navigate(['/listaProductos']);
  }
  GoClients(){
    this.route.navigate(['/clients']);
  }
}
