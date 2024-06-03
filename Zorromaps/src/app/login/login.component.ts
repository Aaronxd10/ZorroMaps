import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //nuevo
//variables para login
public email: string ='';
public password: string ='';
public message: string ='';
public type: string ='';
public loadinglogin: boolean = false;

//Para forgot
  public visible = false;
  public emailforgot: string = '';
  public messagemodal: string = '';
  public typemodal: string = '';
  public loadingforgot: boolean = false;
//fin de nuevo


  constructor(private authService: AuthenticateService, private router: Router) {}

   // Función para validar la contraseña
   validarPassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  // Función para validar el formato del correo electrónico
  validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }


  irAHome() {
    this.router.navigate(['/inicio']);
  }

  olvideContrasena(event:Event): void {
    // Redirecciona a la página de restablecimiento de contraseña
    event.preventDefault(); // Detener la acción por defecto del enlace
    this.router.navigate(['/contra-olvidada']);
  }
  iniciarSesion() {
    
    if(this.email === '' || this.password === ''){
      this.message = "Error: Ingresa un correo o una contraseña valida";
      this.type = "danger";
    } else if (!this.validarPassword(this.password)){
      this.message = "Error: Contraseña no cumple con los criterios de seguridad"+
      "Recuerda usar numeros, mayusculas, minusculas y caracter especial";
      this.type="danger";
    } else {
      // Redirige a la pantalla de mapa
      this.loadinglogin = true;
      this.authService.login(this.email, this.password)
      .then(() => {
        this.loadinglogin = false;
        this.router.navigate(['/mapa']);
      })
      //Seccion de errores
      .catch((error) => {
        //correo de email no verificado
        if(error.code === 'auth/email-not-verified'){
          this.message = "Nos haz confirmado tu cuenta. Por favor verifica tu cuenta en tu correo, el email quizas esta en tus no deseados o Span";
          this.type = "danger";
          //contraseña equivocada
        } else if(error.message === 'auth/invalid-credential'){
          this.message = "Contraseña Incorrecta";
          this.type = "danger";
        } else if(error.message === "auth/invalid-email"){
          this.message = "Usa un correo valido";
          this.type = "danger";
        } else {
          this.message = "Error: " + error.message;
          this.type = "danger";
        }
        this.loadinglogin = false;
      })
    }
    //this.router.navigate(['/mapa']);
  }

  registrarse(): void {
    // Redirecciona a la página de registro
    this.router.navigate(['/crear-cuenta']);
  }

  toggleModal() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  forgotpassword() {
    if (this.emailforgot === '') {
      this.messagemodal = "Error: Enter a valid email address";
      this.typemodal = "danger";
    }
    else {
      this.loadingforgot = true;
      this.authService.passwordreset(this.emailforgot)
        .then(() => {
          this.messagemodal = "Password reset email sent.";
          this.typemodal = "success";
          this.loadingforgot = false;
        })
        .catch((error) => {
          this.messagemodal = 'Error: ' + error.message;
          this.typemodal = "danger";
          this.loadingforgot = false;
        });
    }
  }

  

}
