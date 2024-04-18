import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.css']
})
export class SigInComponent implements OnInit {
  @ViewChild('carreraSelect') carreraSelect!: ElementRef; // Declara @ViewChild
  public user:User;
  
  facultades: any[] = [
    { nombre: 'Facultad de Humanidades', carreras: ['Bibliotecología', 'Letras', 'Filosofía', 'Arte', 'Pedagogía', 'Derechos Humanos', 'Interculturalidad'] },
    { nombre: 'Facultad de Ciencias Químicas y Farmacia', carreras: ['Químico', 'Química-biología', 'Farmacia', 'Biólogo', 'Nutricionista'] },
    { nombre: 'Facultad de Ciencias Económicas', carreras: ['Contaduría pública y auditoría', 'Economía', 'Administración de empresas'] },
    { nombre: 'Facultad de Arquitectura', carreras: ['Arquitectura', 'Diseño gráfico'] },
    { nombre: 'Facultad de Medicina', carreras: ['Médico y cirujano', 'Enfermería'] },
    { nombre: 'Facultad de Derecho', carreras: ['Ciencias jurídicas y sociales, abogado y notario'] },
    { nombre: 'Facultad de Ingeniería', carreras: ['Civil', 'Química', 'Mecánica', 'Eléctrica', 'Industrial', 'Ciencias y Sistemas'] }
  ];

  selectedFacultad: string = '';
  selectedCarrera: string = '';

  constructor(private userService: RestUserService, private route: Router) {
    this.user = new User(0,'','','','','','','','Usuario',0);
  }

  ngOnInit(): void {
  }

  // Método para obtener la facultad seleccionada
  getSelectedFacultad(): any {
    const selectedFacultad = this.facultades.find(f => f.nombre === this.selectedFacultad);
    return selectedFacultad;
  }

  //Metodo del formulario
  onSubmit(register: NgForm){
    this.user.facultad = this.selectedFacultad;
    this.user.carrera = this.carreraSelect.nativeElement.value;

    this.userService.registrarse(this.user).subscribe(
      (res:any) => {
        if(res.usuario_Logueado !== null){
          alert(res.message);
          register.reset();
          this.route.navigateByUrl('user/home');
        }else{
          alert(res.message);
        }
      },
      (error: any) => {
        console.error('error en la solicitud:', error);
        alert('Ocurrió un error: ' + error.error.message);
      }
    );
  }

  onGenderChange(value: string) {
    // Maneja el cambio de género aquí si es necesario
    this.user.genero = value;
  }
}
