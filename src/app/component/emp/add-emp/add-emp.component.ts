import { Component, Inject, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { Emp } from "../../../interface/emp";
import { EmpService } from "../../../services/emp.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-emp",
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    // provideNativeDateAdapter,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./add-emp.component.html",
  styleUrl: "./add-emp.component.css",
})
export class AddEmpComponent implements OnInit {
  title = "Add Employer";
  employerData: any;
  update = false;

  addEmpForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl("", Validators.required),
    doj: new FormControl(new Date(), Validators.required),
    role: new FormControl("", Validators.required),
    salary: new FormControl(0, Validators.required),
  });

  constructor(
    private empService: EmpService,
    private ref: MatDialogRef<AddEmpComponent>,
    private toastService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.employerData = this.data;
    if (this.employerData.code) {
      this.update = true;
      this.empService.getOne(this.employerData.code).subscribe((res: Emp) => {
        let _data = res;
        console.log(_data);
        this.addEmpForm.setValue({
          id: _data.id,
          name: _data.name,
          doj: _data.doj,
          role: _data.role,
          salary: _data.salary,
        });
        this.title = "Update Emp";
      });
    }
  }

  save() {
    if (this.addEmpForm.valid) {
      let data: Emp = {
        id: this.addEmpForm.value.id as number,
        name: this.addEmpForm.value.name as string,
        doj: new Date(this.addEmpForm.value.doj as Date),
        role: this.addEmpForm.value.role as string,
        salary: this.addEmpForm.value.salary as number,
      };

      if (this.update) {
        this.empService.update(data).subscribe((res: any) => {
          this.toastService.success("employee updated successfully", "Updated");
          this.closepopup();
        });
      } else {
        this.empService.create(data).subscribe((res: any) => {
          this.toastService.success("employee added successfully", "Created");
          this.closepopup();
        });
      }
    }
  }

  closepopup() {
    this.ref.close();
  }
}
