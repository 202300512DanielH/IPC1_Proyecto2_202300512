import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public codigo:number = 0;
  public password:string = '';

  constructor(private userService: RestUserService, private route: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(login: NgForm){
    let body = {
      "codigo":this.codigo,
      "password":this.password
    };
    this.userService.login(body).subscribe(
      (res:any) => {
        if(res.usuario){
          alert(res.message);
          let user = res.usuario;
          login.reset();
          if(user.rol === "Administrador"){
            this.route.navigateByUrl('admin/home');
          }else{
            this.route.navigateByUrl('user/home');
          }
        }else{
          alert(res.message);
        }
      },
      (error:any) => {
        console.log('Error en la solicitud:', error);
        alert('Ocurrio un error: ' + error.error.message);
      }
    );
  }

}
