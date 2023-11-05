<template>
    <div class="row mt-3">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header bg-dark text-white text-center">
            Registrar Estudiante
          </div>
          <div class="card-body">
            <form v-on:submit="guardar">
              <div class="d-grid col-6 mx-auto mb-3">
                <img v-if="this.foto" height="100" :src="this.foto" class="img-thumbnail" alt="" id="fotoimg"/>
                <img v-else height="100" class="img-thumbnail" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-256.png" alt="" id="fotoimg"/>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                <input type="text" v-model="nombre" placeholder="Ingrese su nombre" class="form-control" maxlength="50" id="nombre" required>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                <input type="text" v-model="apellido" placeholder="Ingrese su apellido" class="form-control" maxlength="50" id="apellido" required>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                <input v-on:change="fotoView" type="file" accept="image/png, image/jpeg, image/gif" class="form-control" maxlength="50">
              </div>
              <div class="d-grid col-6 mx-auto mb-3">
                <button class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> Registrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {mostrarAlerta, enviarSolicitud} from '../funciones'

  export default{
    data(){
      return{
        nombre:'',
        apellido:'',
        foto:'',
        url:'http://projectacademia.test/api/v1/estudiantes',
        cargando:false
      }
    },
    methods:{
      guardar(){
        event.preventDefault();
        var miFoto = document.getElementById('fotoimg');
        this.foto = miFoto.src;
        
        if (this.nombre.trim()==='') {
          mostrarAlerta('Ingrese un nombre', 'warning', 'nombre');
        } else if (this.apellido.trim()==='') {
          mostrarAlerta('Ingrese un apellido', 'warning', 'apellido');
        } else {
          var parametros = {
            nombre:this.nombre.trim(),
            apellido:this.apellido.trim(),
            foto:this.foto }
          enviarSolicitud('POST', parametros, this.url, 'Estudiante Guardado!!!');
        }

      },
      fotoView(event){
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function(){
          var miFoto = document.getElementById('fotoimg');
          miFoto.src=reader.result;
          this.foto = miFoto.src;
        }
      }
    }
  }

</script>