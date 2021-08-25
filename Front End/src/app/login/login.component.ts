import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login.service';
import { SignupService } from 'src/services/signup.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token : string = null;

  credentials = {
    username: '',
    password : '',
  }



  constructor(private login : LoginService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  public onSignIn (){

    console.log("form is submitted");

    if((this.credentials.username != '' && this.credentials.password != '') &&
    (this.credentials.username != null && this.credentials.password != null) ){
        // console.log("we have to fill the form");
        this.login.generateToken(this.credentials).subscribe(
          (response : any) => {
            // success
            console.log("success");
            console.log(response);

            //login
            this.login.login(response.token);
            

            this.login.getCurrentUser().subscribe(
              (user : any) => {
                this.login.setUser(user);
                console.log(user);
                // redirect : admin dashboard
                if(this.login.getUserRole()=="ADMIN")
                {
                  //admin dashboard
                  window.location.href = "/adminHome";
                  this.toastr.success("Login Success");

                }
                else if(this.login.getUserRole()=="NORMAL")
                {
                  // rdirect : user dashboard
                  window.location.href = "/userHome";
                  this.toastr.success("Login Success");

                }
                else{
                  this.login.logout();
                }

              },
              (error)=>{

              }
            )
          },
          (error) => {
            // fail
            console.log("error");

            console.log(error);
            this.toastr.error("Login Failed!");

          }
        )

        
    }else{
      console.log("fields are empty !!");
      
    }
    
  }

}

