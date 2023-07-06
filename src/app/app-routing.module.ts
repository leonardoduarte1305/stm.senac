import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/components/home/home.component';
import { ItinerarioCreateComponent } from './views/components/itinerario/itinerario-create/itinerario-create.component';
import { ItinerarioUpdateComponent } from './views/components/itinerario/itinerario-update/itinerario-update.component';
import { ItinerariosComponent } from './views/components/itinerario/itinerarios/itinerarios.component';
import { MotoristaCreateComponent } from './views/components/motorista/motorista-create/motorista-create.component';
import { MotoristasComponent } from './views/components/motorista/motoristas/motoristas.component';
import { SedeCreateComponent } from './views/components/sedes/sede-create/sede-create.component';
import { SedesComponent } from './views/components/sedes/sedes.component';
import { VeiculoCreateComponent } from './views/components/veiculos/veiculo-create/veiculo-create.component';
import { VeiculosComponent } from './views/components/veiculos/veiculos.component';
import { MotoristaUpdateComponent } from './views/components/motorista/motorista-update/motorista-update.component';
import { VeiculoUpdateComponent } from './views/components/veiculos/veiculo-update/veiculo-update.component';
import { SedeUpdateComponent } from './views/components/sedes/sede-update/sede-update.component';
import { LoginComponent } from './views/components/login/login.component';
import { MateriaisComponent } from './views/components/material/materiais/materiais.component';
import { UsuarioComponent } from './views/components/usuario/usuario.component';
import { AuthGuardService } from './views/components/guards/auth-guard.service';


const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: "veiculos",
    component: VeiculosComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: "veiculos/create",
    component: VeiculoCreateComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: "sedes",
    component: SedesComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: "sede/create",
    component: SedeCreateComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: "motoristas",
    component: MotoristasComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: "motoristas/create",
    component: MotoristaCreateComponent,
    canActivate:[AuthGuardService]
  },

  {
    path: "itinerarios",
    component: ItinerariosComponent,
    canActivate:[AuthGuardService]
  },

  {
    path: "itinerarios/create",
    component: ItinerarioCreateComponent,
    canActivate:[AuthGuardService]
  },

  {
    path: "itinerarios/update/:id",
    component: ItinerarioUpdateComponent,
    canActivate:[AuthGuardService]
  },

  {
    path: "motoristas/update/:id",
    component: MotoristaUpdateComponent,
    canActivate:[AuthGuardService]
  }
  ,

  {
    path: "veiculos/update/:id",
    component: VeiculoUpdateComponent,
    canActivate:[AuthGuardService]
  }
  ,

  {
    path: "sedes/update/:id",
    component: SedeUpdateComponent,
    canActivate:[AuthGuardService]
  }
  ,

  {
    path: "",
    component: LoginComponent
  },

  {
    path: "materiais",
    component: MateriaisComponent,
    canActivate:[AuthGuardService]
  }
  ,

  {
    path: "usuarios",
    component: UsuarioComponent,
    canActivate:[AuthGuardService]
  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
