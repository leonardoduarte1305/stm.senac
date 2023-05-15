import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Veiculo } from 'src/app/models/veiculo';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { SnackBarComponent } from '../../template/snack-bar/snack-bar.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-veiculo-update',
  templateUrl: './veiculo-update.component.html',
  styleUrls: ['./veiculo-update.component.css']
})
export class VeiculoUpdateComponent implements OnInit {

  id_veiculo = "";
  veiculoForm!: FormGroup;
  veiculo: Veiculo = {
    id: null!,
    modelo: "",
    marca: "",
    placa: "",
    ano: "",
    renavan: "",
    tamanho: ""
  }


  constructor(
    private router: Router,
    private service: VeiculoService,
    private stick: MatSnackBar,
    private route: ActivatedRoute
  ) {

  }
  data = new Date;

  ngOnInit(): void {
    this.id_veiculo = this.route.snapshot.paramMap.get("id")!;
    this.findById();

    this.veiculoForm = new FormGroup({
      id: new FormControl(null!),
      modelo: new FormControl('', [Validators.required, Validators.pattern(/\S/)]),
      marca: new FormControl('', [Validators.required, Validators.pattern(/\S/)]),
      placa: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{3}\d{4}$/), Validators.pattern(/\S/)]),
      ano: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}$/), Validators.min(1900), Validators.max(this.data.getFullYear() + 1), Validators.pattern(/\S/)]),
      renavam: new FormControl('', [Validators.required, Validators.minLength(11), Validators.pattern(/\S/), Validators.pattern(/^\d{11}$/)]),
      tamanho: new FormControl(''),
    })
  }


  get modelo() {
    return this.veiculoForm.get('modelo')!;
  }


  get marca() {
    return this.veiculoForm.get('marca')!;
  }

  get placa() {
    return this.veiculoForm.get('placa')!;
  }

  get ano() {
    console.log(this.veiculoForm.get('ano')?.value)


    return this.veiculoForm.get('ano')!;

  }

  get renavam() {
    return this.veiculoForm.get('renavam')!;
  }

  get tamanho() {
    return this.veiculoForm.get('tamanho')!;
  }

  findById(): void {
    this.service.findbyId(this.id_veiculo).subscribe(resposta => {
      this.veiculo = resposta;
      console.log(resposta)
    })
  }

  cancelar(): void {
    this.router.navigate(['veiculos']);
  }
  update(): void {
    this.service.update(this.veiculo).subscribe(resposta => {
      this.router.navigate(['veiculos'])
      this.service.message("Veículo Criado!")
    })
  }

  open() {
    this.stick.openFromComponent(SnackBarComponent, {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

  carBrands: string[] = [

    
    "Acura",
    "Alfa Romeo",
    "Aston Martin",
    "Audi",
    "Bentley",
    "BMW",
    "Bugatti",
    "Buick",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Citroen",
    "Dodge",
    "Ferrari",
    "Fiat",
    "Ford",
    "GMC",
    "Honda",
    "Hyundai",
    "Infiniti",
    "jac",
    "Jaguar",
    "Jeep",
    "Kia",
    "Lamborghini",
    "Land Rover",
    "Lexus",
    "Lincoln",
    "Lotus",
    "Maserati",
    "Mazda",
    "McLaren",
    "Mercedes-Benz",
    "Mini",
    "Mitsubishi",
    "Nissan",
    "Opel",
    "Peugeot",
    "Porsche",
    "Ram",
    "Renault",
    "Rolls-Royce",
    "Saab",
    "Subaru",
    "Suzuki",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo"
  ];
  submit() {

  }

  onKeyDown(event: any) {
  
    const currentValue = event.target.value;
    const key = event.key;
    if (currentValue.length === 4 && key !== 'Backspace' && key !== 'Delete' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
      event.preventDefault(); 
    }
  }
}