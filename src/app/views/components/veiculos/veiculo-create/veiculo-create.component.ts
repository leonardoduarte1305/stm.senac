import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Veiculo } from 'src/app/models/veiculo';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { SnackBarComponent } from '../../template/snack-bar/snack-bar.component';



@Component({

  selector: 'app-veiculo-create',
  templateUrl: './veiculo-create.component.html',
  styleUrls: ['./veiculo-create.component.css']
})
export class VeiculoCreateComponent implements OnInit {

  veiculoForm!: FormGroup;

  //PADRÃO PARA ACEITAR A PLACA ANTIGA E NOVA DO MERCOSUL
  //placaPattern = /^[a-zA-Z]{3}\d[a-zA-Z0-9][a-zA-Z0-9]?\d{2}$/;

  veiculo: Veiculo = {
    id: null!,
    modelo: "",
    marca: "",
    placa: "",
    ano: "",
    renavan: "",
    tamanho: ""
  }

  data = new Date;


  ngOnInit(): void {

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


  constructor(
    private router: Router,
    private service: VeiculoService,
    private stick: MatSnackBar
  ) {

  }
  create(): void {
    if (this.veiculoForm.invalid) {
      return;
    }
    /*    
        let x = document.getElementsByTagName('input');
        if (this.veiculo.modelo.trim() === "" || this.veiculo.marca.trim() == "") {
          this.service.message('Deve preencher todos os campos obrigatorios');
          for (let i = 0; x.length - 1 > i; i++) {
            x[i].style.borderBottomColor = 'red';
    
          }
        } else {
          for (let i = 0; x.length - 1 > i; i++) {
            x[i].style.borderBottomColor = 'green';
          }
        }
    */
    if (this.validarRenavam(this.veiculo.renavan) === true) {

   
      this.service.create(this.veiculo).subscribe((resposta) => {
        this.router.navigate(['veiculos'])
        this.service.message("Veículo Criado!")
      }
      )
    }
  }
  cancelar(): void {
    this.router.navigate(['veiculos']);
  }



  open() {
    this.stick.openFromComponent(SnackBarComponent, {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

  validarRenavam(renavan: string): boolean {
    const renavamRegex = /^[0-9]{11}$/;

    return renavamRegex.test(renavan);
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
