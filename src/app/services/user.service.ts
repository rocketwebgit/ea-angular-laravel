import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {User} from "../models/user";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Common} from "../common";
import {ErrorHandler} from "../common_modules/error_handler";
import { HttpClient } from '@angular/common/http';

declare let bootbox: any;

@Injectable()
export class UserService {
  private _signUpUrl: string = Common.BASE_URL + '/api/register';
  private _forgotUrl: string = Common.BASE_URL + '/api/forget';
  private _newUserUrl: string = Common.BASE_URL + '/api/newUsers';
  private _approveUserUrl: string = Common.BASE_URL + '/api/approveUser';
  private _dismissUserUrl: string = Common.BASE_URL + '/api/dismissUser';
  private _resetUrl: string = Common.BASE_URL + '/api/resetPassword';
  private _allUserUrl: string = Common.BASE_URL + '/api/v1/users/?include=profile';


  constructor(private http: HttpClient) {
  }

  login(email, password) {
    let url = Common.BASE_URL + '/api/login';
    let body = {email: email, password: password};
    return this.http.post(url, body)
      .map((response: Response) => response.json())
      .do(data => data)
      .catch(ErrorHandler.handleError);
  }

  getTokenStatus(token) {
    let url = Common.BASE_URL + '/api/getTokenStatus?token=' + token;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .do(data => data)
      .catch(ErrorHandler.handleError);
  }

  forgetpassword(email, front_url) {
    let body = {email: email, front_url: front_url};
    return this.http.post(this._forgotUrl, body)
      .map((response: Response) => response.json())
      .do(data => data)
      .catch(ErrorHandler.handleError);
  }

  resetPassword(email, password, md_password) {
    let body = {email: email, password: password, md_password: md_password};

    console.log(body);
    return this.http.post(this._resetUrl, body)
      .map((response: Response) => response.json())
      .do(data => data)
      .catch(ErrorHandler.handleError);
  }

  signup(email, password, role, profile) {
    let front_url = Common.FRONT_URL;
    let body = { email: email, password: password, role: role, profile: profile, front_url: front_url };
    return this.http.post(this._signUpUrl, body)
      .map((response: Response) => response.json())
      .do(data => data)
      .catch(ErrorHandler.handleError);
  }



  approveUser(ids) {
    return this.http.post(this._approveUserUrl + "?token=" + Common.getUser().token, {ids: ids})
      .map((response: Response) => response.json())
      .do(data => data)
      .catch(ErrorHandler.handleError);
  }

  dismissUser(ids) {
    return this.http.post(this._dismissUserUrl + "?token=" + Common.getUser().token, {ids: ids})
      .map((response: Response) => response.json())
      .do(data => data)
      .catch(ErrorHandler.handleError);
  }

  getAllUsers() {
    let url = this._allUserUrl + '&token=' + Common.getUser().token;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .do(data => data)
      .catch(ErrorHandler.handleError);
  }

  deleteUsers(user_ids) {
    let url = Common.BASE_URL + '/api/v1/users/deleteUsers?token=' + Common.getUser().token;
    return this.http.post(url, {ids: user_ids})
      .map((response: Response) => response.json())
      .do(data => data)
      .catch(ErrorHandler.handleError);
  }

  getUser(user_id): Observable<User> {
    return this.http.get(Common.BASE_URL + '/api/v1/users/' + user_id)
      .map((response: Response) => <User> response.json())
      .do(data => data)
      .catch(ErrorHandler.handleError);
  }

  getMe() {
    let url = Common.BASE_URL + '/api/getMe?token=' + Common.getUser().token;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .do(data => data)
      .catch(ErrorHandler.handleError);
  }

  verifyRegister(data) {
    let url = Common.BASE_URL + '/api/verifyRegister';

    return this.http.post(url, data)
      .map((response: Response) => response.json())
      .do(data => data)
      .catch(ErrorHandler.handleError);
  }
}
