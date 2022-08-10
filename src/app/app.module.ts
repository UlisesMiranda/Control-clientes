import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';
import {AngularFireModule } from '@angular/fire/compat';
import {AngularFirestoreModule,Settings} from '@angular/fire/compat/firestore';
import { AngularFireAuthModule, SETTINGS } from '@angular/fire/compat/auth';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceroComponent } from './componentes/cabecero/cabecero.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { EditarClienteComponent } from './componentes/editar-cliente/editar-cliente.component';
import { LoginComponent } from './componentes/login/login.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { ClienteService } from './servicios/cliente.service';
import { LoginService } from './servicios/login.service';
import { AuthGuard } from './guardianes/auth.guard';
import { ConfiguracionService } from './servicios/configuracion.service';
import { ConfiguracionGuard } from './guardianes/configuracion.guard';

@NgModule({
  declarations: [
    AppComponent,
    CabeceroComponent,
    ClientesComponent,
    ConfiguracionComponent,
    EditarClienteComponent,
    LoginComponent,
    NoEncontradoComponent,
    PiePaginaComponent,
    RegistroComponent,
    TableroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firestore, 'control-clientes'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [ClienteService, LoginService, AuthGuard,
  ConfiguracionService,
  ConfiguracionGuard,
  {provide: SETTINGS, useValue:{}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
