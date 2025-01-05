import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Emp } from "../interface/emp";

@Injectable({
  providedIn: "root",
})
export class EmpService {
  apiUrl = "https://46mp7t-3000.csb.app/emp";
  constructor(private http: HttpClient) {}

  /**
   * get All record
   */
  getAll() {
    return this.http.get<Emp[]>(this.apiUrl);
  }

  /**
   * get One record
   */
  getOne(empID: number) {
    return this.http.get<Emp>(this.apiUrl + "/" + empID);
  }

  /**
   * get create record
   */
  create(data: Emp) {
    return this.http.post<Emp>(this.apiUrl, data);
  }

  /**
   * update record
   */
  update(data: Emp) {
    return this.http.put(this.apiUrl + "/" + data.id, data);
  }

  /**
   * remove record
   */
  remove(empID: number) {
    return this.http.delete(this.apiUrl + "/" + empID);
  }
}
