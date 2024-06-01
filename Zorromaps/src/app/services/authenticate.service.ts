import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  sendEmailVerification, 
  sendPasswordResetEmail,
 } from 'firebase/auth';
 import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private app = initializeApp(environment.firebaseConfig);
  private auth = getAuth(this.app);

  constructor(private router: Router) { }

  register(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, email, password)
    .then((result) => {
      sendEmailVerification(result.user);
    });

  }
}
