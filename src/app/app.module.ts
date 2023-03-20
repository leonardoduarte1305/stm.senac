import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav'

import { HeaderComponent } from './views/components/template/header/header.component';
import { FooterComponent } from './views/components/template/footer/footer.component';
import { NavComponent } from './views/components/template/nav/nav.component';
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './views/components/home/home.component';
import { VeiculosComponent } from './views/components/veiculos/veiculos.component';
import { MatCardModule } from '@angular/material/card';
import { SedesComponent } from './views/components/sedes/sedes.component';
import { UsuariosComponent } from './views/components/usuarios/usuarios.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { VeiculoCreateComponent } from './views/components/veiculos/veiculo-create/veiculo-create.component';
import { SedeCreateComponent } from './views/components/sedes/sede-create/sede-create.component';
import {MatDialogModule} from '@angular/material/dialog';
import { InfoComponent } from './views/components/template/info/info.component';
import { MotoristasComponent } from './views/components/motorista/motoristas/motoristas.component';
import { MotoristaCreateComponent } from './views/components/motorista/motorista-create/motorista-create.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    VeiculosComponent,
    SedesComponent,
    UsuariosComponent,
    VeiculoCreateComponent,
    SedeCreateComponent,
    InfoComponent,
    MotoristasComponent,
    MotoristaCreateComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
