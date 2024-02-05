import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResultComponent } from './result/result.component';
import { JsonComponent } from './json/json.component';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultComponent,
    JsonComponent,
   
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule, 
    HttpClientModule,
    MonacoEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
