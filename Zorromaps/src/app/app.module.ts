import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "../material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";


imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, 
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot(),
]