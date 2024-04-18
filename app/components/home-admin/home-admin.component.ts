import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  public mostrarUsuarios: boolean = false;
  public usuarios:any[] = [];
  public value_Form:any;
  public selectedUser: any; // Usuario seleccionado

  constructor(private userService: RestUserService) {

  }

  ngOnInit(): void {
    this.cargar_Lista();
  }

  mostrarSeccionUsuarios() {
    if(this.mostrarUsuarios){
      this.mostrarUsuarios = false;
    }else{
      this.mostrarUsuarios = true;
    }
  }

  cargar_Lista(){
    this.userService.listar_Usuarios().subscribe(
      (res:any) => {
        this.usuarios = res.usuarios
      },
      (error:any) => {
        console.log('Error en la solicitud:', error);
        alert('Ocurrio un error: ' + error.error.message);
      }
    )
  }

  onSubmit(masiv_Us: NgForm){
    let valor = parseInt(this.value_Form);
    if (!isNaN(valor)) {
        // La conversión fue exitosa
        let body = {
          "codigo": valor
        }
        this.userService.archivo_CSV(body).subscribe(
          (res:any) => {
            let mensaje ='Del usuario con codigo: '+ valor + '\n' + res.message; 
            alert(mensaje);
          },
          (error:any) => {
            console.log('Error en la solicitud:', error);
            alert('Ocurrio un error: ' + error.error.message);
          }
        )
    } else {
        // La conversión falló
        let body = {
          "path": this.value_Form
        }
        this.userService.carga_Masiva_Usuarios(body).subscribe(
          (res:any) => {
            if(res.usuarios){
              this.usuarios = res.usuarios;
              alert(res.message);
              masiv_Us.reset();              
            }else{
              alert(res.message);
            }
          },
          (error:any) => {
            console.log('Error en la solicitud:', error);
            alert('Ocurrio un error: ' + error.error.message);
          }
        )
    }
  }

  mostrar_USer_Submit(mostrar_User: NgForm){

  }

  // Función para mostrar los detalles del usuario en un alert
  showAlert(user: any) {
    this.selectedUser = user;
    const userDetails = `
      Código: ${user.codigo}
      Nombres: ${user.nombres}
      Apellidos: ${user.apellidos}
      Género: ${user.genero}
      Facultad: ${user.facultad}
      Carrera: ${user.carrera}
      Correo: ${user.correo}
      Password: ${user.password}
      Rol: ${user.rol}
      No. Publicaciones: ${user.cant_Publicaciones}
    `;
    alert(userDetails);
  }
}
