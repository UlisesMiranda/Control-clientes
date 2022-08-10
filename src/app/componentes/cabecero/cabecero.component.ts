import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { config } from 'rxjs';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  /* mostrarResponsive_menu = false;//creo esta variable para desplegar menu
  mostrarResponsive_menuConfi = false;//creo esta variable para desplegar menu
 */

  isLoggedIn: boolean;
  loggedInUser: string;
  permitirRegistro: boolean

  constructor(
    private loginService: LoginService,
    private router: Router,
    private configuracionServicio: ConfiguracionService
    ) {

  }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(
      auth => {
        if(auth && auth.email){
          this.isLoggedIn = true
          this.loggedInUser = auth.email
        }
        else {
          this.isLoggedIn = false
        }
      }
    )

    this.configuracionServicio.getConfiguracion().subscribe(configuracion =>{
      this.permitirRegistro = configuracion.permitirRegistro as any;
    })
  }

  logOut(){
    this.loginService.logOut()
    this.isLoggedIn = false
    this.router.navigate(['/login'])
  }

}
