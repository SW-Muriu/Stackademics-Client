import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  BASE_URL: string = `${environment.apiUrl}/student`;
  private totalStudents: WritableSignal<number> = signal(0);
  private dataProcessRuns: WritableSignal<number> = signal(0);
  private dataGenerationRuns: WritableSignal<number> = signal(0);
  private studentUploadRuns: WritableSignal<number> = signal(0);

  constructor(private _http: HttpClient) {}

  public postStudent = (studentData: any): Observable<any> => {
    const url = `${this.BASE_URL}/post`;
    return this._http.post<any>(url, studentData);
  };

  public updateStudent = (updateData: any): Observable<any> => {
    const url = `${this.BASE_URL}/update`;
    return this._http.patch<any>(url, updateData);
  };

  public fetchStudents = (filters: any): Observable<any> => {
    let params: HttpParams = this.appendHttpParams(filters);
    return this._http.get<any>(`${this.BASE_URL}/all?` + params.toString());
  };

  public deleteStudent = (deleteData: any): Observable<any> => {
    const url = `${this.BASE_URL}/delete`;
    console.info('deleteData', deleteData);
    return this._http.delete<any>(url, deleteData);
  };

  setTotalStats(
    totalStudents: number,
    totalDataProcessRuns: number,
    totalDataGenerationRuns: number,
    totalStudentUpload: number
  ): void {
    this.totalStudents.set(totalStudents);
    this.dataGenerationRuns.set(totalDataGenerationRuns);
    this.dataProcessRuns.set(totalDataProcessRuns);
    this.studentUploadRuns.set(totalStudentUpload);
  }

  getTotalProcessRuns(): number {
    return this.dataProcessRuns();
  }

  getTotalStudents(): number {
    return this.totalStudents();
  }

  getTotalGenerationRuns(): number {
    return this.dataGenerationRuns();
  }

  getTotalStudentUploadRuns(): number {
    return this.studentUploadRuns();
  }

  //Params set up
  appendHttpParams(filters: any): HttpParams {
    let params: HttpParams = new HttpParams();
    let filterKeys: string[] = Object.keys(filters);
    filterKeys.forEach((key: string) => {
      params = params.append(key, filters[key]);
    });

    return params;
  }
}
