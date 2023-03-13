import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/components/home/home.component';
import { VeiculoCreateComponent } from './views/components/veiculos/veiculo-create/veiculo-create.component';
import { VeiculosComponent } from './views/components/veiculos/veiculos.component';

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
    path:"veiculo/create",
    component: VeiculoCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
