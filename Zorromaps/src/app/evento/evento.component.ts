import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthenticateService } from '../services/authenticate.service';
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Importa AngularFireDatabase


@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
})
export class EventoComponent {
  @ViewChild('busquedaInput') busquedaInput!: ElementRef<HTMLInputElement>;
    //nuevo
//variables para login
public email: string ='';
public password: string ='';
public message: string ='';
public type: string ='';
public loadinglogin: boolean = false;
public passwordVisible1: boolean = false;

Eventos: any[] = [];

//fin de nuevo

  constructor(private authService: AuthenticateService, private router: Router, private db: AngularFireDatabase) { }


  irARegister() {
    this.router.navigate(['/crear-cuenta']);
  }

  iniciarSesion(): void {
    // Redirige a la pantalla del mapa
    if(this.email === '' || this.password === ''){
      this.message = "Error: Ingresa un correo o una contraseña valida";
      this.type = "danger";
    }  else {
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
  
  togglePasswordVisibility1() {
    this.passwordVisible1 = !this.passwordVisible1;
  }

  ngAfterViewInit() {
    this.buscar()
  }

  buscar() {
    const termino = this.busquedaInput.nativeElement.value;
    if (termino) {
      const evento = this.Eventos.find(e => e.name.toLowerCase() === termino.toLowerCase());
      if (evento) {
        // Aquí puedes hacer lo que necesites con el evento encontrado
        this.message = "Evento encontrado:" + evento;
        this.iniciarSesion;
      } else {
        this.message ="Evento no encontrado";
      }
    } else {
      this.message = "Por favor, introduzca un término de búsqueda";
    }
  }

  buscarEventos(event: any) {
    const termino = (event.target as HTMLInputElement).value;
    if (termino) {
      this.db.list('/Evento').valueChanges().subscribe((data: any[]) => {
        this.Eventos = data;
      });
    } else {
      this.Eventos = [];
    }
  }
}
