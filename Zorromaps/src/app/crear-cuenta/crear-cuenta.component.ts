import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
//nuevo 
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-cuenta',
  //standalone: true,
  //imports: [CommonModule], // Aquí se importa CommonModule
  templateUrl: './crear-cuenta.component.html',
  styleUrl: './crear-cuenta.component.css'
  
})
export class CrearCuentaComponent {
  mostrarTerminosCondiciones: boolean = false;

  
  //nuevo en constructor builder, service, toastr
  constructor(private router: Router,
     private builder: FormBuilder, private service: AuthService,  private toastr: ToastrService) {
     }

  //nuevo registerform
    registerform = this.builder.group({
    //id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    nombre: this.builder.control('', Validators.required),
    numeroControl: this.builder.control('',Validators.compose([Validators.required, Validators.minLength(8)])),
    apellidoPaterno: this.builder.control('', Validators.required),
    apellidoMaterno: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    role: this.builder.control(''),
    isactive: this.builder.control(false)
  });


  mostrarTerminos(event: MouseEvent): void {
    event.preventDefault(); // Detener la navegación por defecto
    this.mostrarTerminosCondiciones = true;
  }
  ocultarTerminos(): void {
    this.mostrarTerminosCondiciones = false;
  }
  registrarse(): void {
    if (this.registerform.valid) {
      this.service.RegisterUser(this.registerform.value).subscribe(result => {
        this.toastr.success('Por favor, contacta al administrador para habilitar el acceso.', 'Registrado exitosamente');
        this.router.navigate(['/login']);
      });
    } else {
      this.toastr.warning('Por favor, introduce datos válidos.');
    }
  }  
  
  irALogin(): void {
    // Aquí puedes navegar al componente de inicio de sesión o a la ruta correspondiente
    this.router.navigate(['/login']);
  }
}
