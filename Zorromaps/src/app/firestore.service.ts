import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  // Método para agregar un documento a una colección
  addDocument(collectionName: string, data: any): Promise<void> {
    const id = this.firestore.createId(); // Crea un ID único para el documento
    return this.firestore.collection(collectionName).doc(id).set(data);
  }

  // Método para obtener todos los documentos de una colección
  getDocuments(collectionName: string): Observable<any[]> {
    return this.firestore.collection(collectionName).valueChanges();
  }
}
