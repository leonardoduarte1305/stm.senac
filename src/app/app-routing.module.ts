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


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "veiculos",
    component: VeiculosComponent
  },
  {
    path: "veiculos/create",
    component: VeiculoCreateComponent
  },
  {
    path: "sedes",
    component: SedesComponent
  },
  {
    path: "sede/create",
    component: SedeCreateComponent
  },
  {
    path: "motoristas",
    component: MotoristasComponent
  },
  {
    path: "motoristas/create",
    component: MotoristaCreateComponent
  },

  {
    path: "itinerarios",
    component: ItinerariosComponent
  },

  {
    path: "itinerarios/create",
    component: ItinerarioCreateComponent
  },

  {
    path: "itinerarios/update/:id",
    component: ItinerarioUpdateComponent
  },

  {
    path: "motoristas/update/:id",
    component: MotoristaUpdateComponent
  }
  ,

  {
    path: "veiculos/update/:id",
    component: VeiculoUpdateComponent
  }
  ,

  {
    path: "sedes/update/:id",
    component: SedeUpdateComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
