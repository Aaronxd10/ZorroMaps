import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

//nuevo
import { AppModule } from '../app.module';
import { SharedModule } from '../shared/shared.module';
import { AuthenticateService } from '../services/authenticate.service';



@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [CommonModule, SharedModule], // Aquí se importa CommonModule
  templateUrl: './crear-cuenta.component.html',
  styleUrl: './crear-cuenta.component.css',
})
export class CrearCuentaComponent {
//nuevo
//variables
  public username: string ='';
  public email: string ='';
  public password: string ='';
  public repeatpassword: string ='';
  public message: string ='';
  public type: string ='';
  public loadingregister: boolean = false;
//fin de nuevo

  mostrarTerminosCondiciones: boolean = false;
  constructor(private authService: AuthenticateService, private router: Router) { }

  mostrarTerminos(event: MouseEvent): void {
    event.preventDefault(); // Detener la navegación por defecto
    this.mostrarTerminosCondiciones = true;
  }
  ocultarTerminos(): void {
    this.mostrarTerminosCondiciones = false;
  }
  registrarse() {
    // Aquí puedes registrar al usuario
    // Luego de registrar al usuario, puedes redirigirlo a la página de inicio
    if(this.email === '' || this.password === '' || this.repeatpassword === ''){
      this.message = "Error: Ingresa un correo valido o una contraseña";
      this.type = "danger";
    }else if(this.password !== this.repeatpassword){
      this.message = "Error: Contraseñas no coinciden"
    }else {
      this.loadingregister = true;
      this.authService.register(this.email, this.password)
      .then(() => {
        this.message = "Usuario registrado exitosamente!! Por Favor revisa tu email para confirmar la cuenta";
        this.type = "sucess";
        this.loadingregister = false;
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        if(error.message === 'auth/email-already-in-use'){
          this.message = "Correo ya registrado, ingresa otro o ve a Iniciar sesion";
          this.type = "warning";
        }else{
        this.message = "Error: " + error.message;
        this.type = "danger";
        this.loadingregister = false;
        }
      })
    }
  }
  irALogin(): void {
    // Aquí puedes navegar al componente de inicio de sesión o a la ruta correspondiente
    this.router.navigate(['/login']);
  }


 
  


}
