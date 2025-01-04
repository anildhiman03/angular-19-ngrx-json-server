import { Routes } from "@angular/router";
import { EmpListComponent } from "./component/emp/emp-list/emp-list.component";

export const routes: Routes = [
  { path: "", component: EmpListComponent },
  { path: "employee", component: EmpListComponent },
];
