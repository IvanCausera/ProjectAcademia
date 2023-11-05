import Swal from "sweetalert2";
import axios from "axios";

export function mostrarAlerta(titulo, icono, foco=''){
    if(foco!=''){
        document.getElementById(foco).focus();
    }

    Swal.fire({
        title:titulo,
        icon:icono,
        customClass:{confirmButton:'btn btn-primary', popup:'animated zoonIn'},
        buttonsStyling:false
    });

}

export function enviarSolicitud(metodo, parametros, url, mensaje){
    axios({
        method:metodo,
        url:url,
        data:parametros
    }).then(function(res){
        var estado = res.status;
        if (estado == 200) {
            mostrarAlerta(mensaje,'success');
            window.setTimeout(function(){
                window.location.href='/';
            }, 1000);
        } else {
            mostrarAlerta('Error en la acción', 'error')
        }
    }).catch(function(error){
        mostrarAlerta('Servidor no disponible', 'error')
    });
}


export function confirmar(urlWithSlash, id, titulo, mensaje){
    var urlId = url+id;
    const swalWithBoostrapButton = Swal.mixin({
        customClass:{confirmButton:'btn btn-success me-3', cancelButton:'btn btn-danger'},
    });

    swalWithBoostrapButton.fire({
        title:titulo,
        text:mensaje,
        icon:'question',
        showCancelButton:true,
        confirmButtonText:'<i class="fa-solid fa-check"></i> Sí, eliminar',
        cancelButtonText:'<i class="fa-solid fa-band"></i> Cancelar'
    }).then((res)=>{
        if (res.isConfirmed) {
            enviarSolicitud('DELETE', {id:id}, urlId, 'Eliminado con éxito');
        } else{
            mostrarAlerta('Operación cancelada', 'info');
        }
    });
}