import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { CanActivate, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { ConfiguracionService } from "../servicios/configuracion.service";

@Injectable()
export class ConfiguracionGuard implements CanActivate{
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private configuracionSerivicio: ConfiguracionService
  ){}

  canActivate(): Observable<boolean>{
    return this.configuracionSerivicio.getConfiguracion().pipe(
      map(configuracion => {
        if(configuracion.permitirRegistro){
          return true
        }
        else{
          this.router.navigate(['/login'])
          return false
        }
      })
    )
  }
}


