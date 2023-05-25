import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AngularMaterialModule } from "../../angular-material.module";
import { AuthRoutingModule } from "./auth-routing.module";

//import { AdminLogin } from "../components/login/login.component";
// import {  } from "../components/users-create/users-create.component";

@NgModule({
  declarations: [],
  imports: [CommonModule, AngularMaterialModule, FormsModule, AuthRoutingModule]
})
export class AuthModule {}
