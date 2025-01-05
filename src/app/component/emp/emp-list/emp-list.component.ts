import { Component, OnDestroy, OnInit } from "@angular/core";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";

import { AddEmpComponent } from "../add-emp/add-emp.component";
import { EmpService } from "../../../services/emp.service";
import { Emp } from "../../../interface/emp";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-emp-list",
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    MatTableModule,
  ],
  templateUrl: "./emp-list.component.html",
  styleUrl: "./emp-list.component.css",
})
export class EmpListComponent implements OnInit, OnDestroy {
  empList: Emp[] = [];
  dataSource!: MatTableDataSource<Emp>;
  displayColumns: string[] = ["id", "name", "doj", "role", "salary", "action"];
  subscription = new Subscription();
  constructor(
    private dialog: MatDialog,
    private empService: EmpService,
    private toastService: ToastrService
  ) {}

  addEmp() {
    this.openPopUp(0);
  }

  ngOnInit() {
    this.getEmpList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getEmpList() {
    let list = this.empService.getAll().subscribe((list: Emp[]) => {
      this.empList = list;
      this.dataSource = new MatTableDataSource(this.empList);
    });
    this.subscription.add(list);
  }

  editEmployee(empID: number) {
    this.openPopUp(empID);
  }

  deleteEmployee(empID: number) {
    let removeData = this.empService.remove(empID).subscribe((res) => {
      this.getEmpList();
      this.toastService.success("employer record deleted successfully");
    });
    this.subscription.add(removeData);
  }

  openPopUp(empID: number) {
    this.dialog
      .open(AddEmpComponent, {
        width: "50%",
        exitAnimationDuration: "1000ms",
        enterAnimationDuration: "1000ms",
        data: {
          code: empID,
        },
      })
      .afterClosed()
      .subscribe((o) => {
        this.getEmpList();
      });
  }
}
