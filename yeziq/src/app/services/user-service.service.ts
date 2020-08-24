import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/models/user.model';
import { Course } from 'src/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  private usersUrl = 'http://localhost:3000/users/';
  private coursesUrl = 'http://localhost:3000/courses/';
  private user: Observable<User> = null;
  private courses: Observable<Course[]> = null;

  public createUser(userData): Observable<User> {
    this.user = this.http.post<User>(this.usersUrl, userData);
    return this.user;
  }

  public changeTargetLang(userData): Observable<User> {
    this.user = this.http.patch<User>(this.usersUrl + 'changeLang', userData);
    return this.user;
  }

  public login(userData): Observable<User> {
    this.user = this.http.post<User>(this.usersUrl + 'login', userData);
    return this.user;
  }

  public getUser(): Observable<User> {
    return this.user;
  }

  public getCourses(): Observable<Course[]> {
    return this.courses;
  }

  public getCoursesByAuthor(data): Observable<Course[]> {
    this.courses = this.http.post<Course[]>(this.coursesUrl + 'getCourses', data);
    return this.courses;
  }

  public createCourse(data): Observable<any> {
    return this.http.post<any>(this.coursesUrl, data);
  }

  public deleteCourse(id): Observable<any> {
    return this.http.delete<any>(this.coursesUrl + id);
  }

  public resetUser(): void {
    this.user = null;
  }
  
  public getTextFromPdf(data): Observable<string> {
    return this.http.post<string>(this.coursesUrl + 'pdf', data);
  }

  public getTextFromEpub(data): Observable<string> {
    return this.http.post<string>(this.coursesUrl + 'epub', data);
  }
}
