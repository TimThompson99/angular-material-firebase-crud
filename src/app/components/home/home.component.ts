import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface MailChimpResponse {
  result: string;
  msg: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  subForm = new FormGroup({
    emailControl: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    hidden: new FormControl('', [
      Validators.nullValidator
    ])
  })  
  error = '';
  submitted: boolean = false;


  mailchimpEndPoint = 'https://brokencorks.us17.list-manage.com/subscribe/post-json?u=8f8c8bc0b3105da17f8a9f9a1&amp;id=caa2bddc83&';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  get emailControl() {
    return this.subForm.get('emailControl');
  }

  public async checkForm() {
    if (this.emailControl.status === 'VALID') {
      const params = new HttpParams()
      .set('EMAIL', this.subForm.get('emailControl').value)
      .set('NAME', 'Tim')
      .set('b_8f8c8bc0b3105da17f8a9f9a1_caa2bddc83', '');

      const mailChimpUrl = this.mailchimpEndPoint + params.toString();

      this.http.jsonp<MailChimpResponse>(mailChimpUrl, 'c').subscribe(response => {
        if (response.result && response.result !== 'error') {
          this.submitted = true;
        } else {
          this.error = response.msg;
        }
      }, error => {
        console.error(error);
        this.error = 'Sorry, an error occurred';
      })
      
    }
  }  

}
