//const url = 'https://api-2670689.onrender.com/usuario'
const url = 'http://localhost:8282/usuario'
const url_dolar = 'https://www.datos.gov.co/resource/mcec-87by.json'

// fetch(url_dolar)
//   .then(response => response.json())
//   .then(data => {
//     // Supongamos que deseas acceder al nombre y valor del primer objeto
//     const primerObjeto = data[0];
//     const valor = primerObjeto.valor;

//     console.log('Valor:', valor);
//   })
//   .catch(error => console.error('Error fetching data:', error));


function precioDolar() {
    const dolarInput = document.getElementById('precio_dolar');

    // Realizar la petición a la URL utilizando fetch
    fetch(url_dolar, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then(response => {
        // Verificar si la respuesta es un JSON válido
        if (!response.ok) {
            throw new Error('Error en la solicitud de la API');
        }
        return response.json();
    })
    .then(dataArray => {
        // Verificar si hay al menos un objeto en el array
        if (dataArray && dataArray.length > 0) {
            // Tomar el primer objeto del array (asumiendo que eso es lo que necesitas)
            const primerObjeto = dataArray[0];

            // Actualizar el valor del input con el valor del objeto
            dolarInput.value = `${primerObjeto.valor}`;
        } else {
            throw new Error('Formato de respuesta incorrecto o array vacío');
        }
    })
    .catch(error => {
        console.error('Error al obtener el valor del dólar:', error);
        dolarInput.value = 'Error al obtener el valor del dólar';
    });
}
  
// Realiza la solicitud a la URL
// fetch(url_dolar)
//   .then(response => response.json())
//   .then(data => {
//     // Obtiene el valor del atributo "valor" del JSON
//     const valor = data.valor;

//     // Asigna el valor al input
//     document.getElementById('precio_dolar').value = valor;
//     console.log(data);
//   })
//   .catch(error => console.error('Error fetching data:', error));


const listarUsuarios = async() => {
    //Objeto del html donde se deslegará la información
    let objectId = document.getElementById('contenido') 
    let contenido = ''//Contiene filas y celdas que se desplegarán en el tbody

    //Fecth permite reaizar peticiones http a una url
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((res) => res.json())//Obtener respuesta de la petición
    .then(function(data){//Se manipulan los datos obtenidos de la url
        let listaUsuarios = data.msg //msg es el nombre de la lista retorna con json
        console.log(listaUsuarios)
        listaUsuarios.map(function (usuario) {
            //Configurar el objeto para enviarlo por url
            objetoUsuario = Object.keys(usuario).map(key => key + '=' + 
            encodeURIComponent(usuario[key])).join('&');
            console.log(usuario)
            contenido = contenido + `<tr>`+
            `<td>`+usuario.nombre+`</td>`+
            `<td>`+usuario.apellido+`</td>`+
            `<td>`+usuario.tipo_documento+`</td>`+
            `<td>`+usuario.numero_documento+`</td>`+
            `<td>`+usuario.telefono+`</td>`+
            `<td>`+usuario.correo+`</td>`+
            `<td>`+usuario.ciudad+`</td>`+
            `<td>`+usuario.rol+`</td>`+
            `<td>`+usuario.nombre_usuario+`</td>`+
            `<td>`+usuario.estado+`</td>`+
            `<td>`+usuario.precio_dolar+`</td>`+
            `<td><button onclick="redireccionarEditar('${objetoUsuario}')">Editar</button></td>`+
            `<td><button  class="btnEliminar" onclick="eliminarUsuario('${usuario.nombre}')">Eliminar</button></td>`+
            `</tr>`
        })
        objectId.innerHTML = contenido
    })

    /*for(i = 1; i<10; i++){
        contenido = contenido + '<tr>'+
        '<td>nombre</td>'+
        '<td>rol</td>'+
        '<td>estado</td>'
    }
    */

}

const registrarUsuario= () => {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const tipo_documento = document.getElementById('tipo_documento').value;
    const numero_documento = document.getElementById('numero_documento').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    const ciudad = document.getElementById('ciudad').value;
    const nombre_usuario = document.getElementById('nombre_usuario').value;
    const password = document.getElementById('password').value
    const confirmarPassword = document.getElementById('confirmarPassword').value
    const rol = document.getElementById('rol').value
    const estado = document.getElementById('estado').value
    const precio_dolar = document.getElementById('precio_dolar').value

    if(nombre.length == 0){
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido'

    }
    else if(apellido.length == 0){
        document.getElementById('apellidoHelp').innerHTML = 'Dato requerido'

    }
    else if(tipo_documento == ""){
        document.getElementById('tipo_documentoHelp').innerHTML = 'Dato requerido'
    }
    else if(numero_documento == ""){
        document.getElementById('numero_documentoHelp').innerHTML = 'Dato requerido'
    }
    else if(telefono == ""){
        document.getElementById('telefonoHelp').innerHTML = 'Dato requerido'
    }
    else if(correo == ""){
        document.getElementById('correoHelp').innerHTML = 'Dato requerido'
    }
    else if(ciudad == ""){
        document.getElementById('ciudadHelp').innerHTML = 'Dato requerido'
    }
    else if(nombre_usuario == ""){
        document.getElementById('nombre_usuarioHelp').innerHTML = 'Dato requerido'
    }
    else if(password.length == 0){
        document.getElementById('passwordHelp').innerHTML = 'Dato requerido'
    }                                                                   
    else if(rol == ""){
        document.getElementById('rolHelp').innerHTML = 'Dato requerido'
    }
    else if(estado == ""){
        document.getElementById('estadoHelp').innerHTML = 'Dato requerido'
    }
    else if(password != confirmarPassword){
        alert('Las contraseñas no coinciden')
    }
    else if(precio_dolar == ""){
        document.getElementById('precio_dolarHelp').innerHTML = 'Dato requerido'
    }
    else{
        let usuario = {
            nombre: nombre,
            apellido: apellido,
            tipo_documento: tipo_documento,
            numero_documento: numero_documento,
            telefono: telefono,
            correo: correo,
            ciudad: ciudad,
            nombre_usuario: nombre_usuario,
            password: password,
            rol: rol,
            estado: estado,
            precio_dolar:precio_dolar
        }
        
        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(usuario),//Convertir el objeto a JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((res) => res.json())//Obtener respuesta de la petición
        .then(json => {
            alert(json.msg) //Imprimir el mensaje de la transacción
        })
        }
}

const eliminarUsuario = async (nombre) => {
    try {
        const deleteUrl = `${url}`;  // Solo la ruta base, ya que el ID irá en el cuerpo de la solicitud

        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ nombre })  // Incluye el ID en el cuerpo de la solicitud
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar. Código de respuesta: ${response.status}`);
        }

        const json = await response.json();
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Usuario eliminado exitosamente",
            showConfirmButton: false,
            timer: 1500
        });
        console.log(response)

        // Puedes realizar alguna acción adicional después de eliminar, como recargar la lista de donaciones
        // por ejemplo:
        // recargarListaDonaciones();
    } catch (error) {
        console.log('Error al eliminar el usuario:', error.message);
        // Puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario.
        alert('Error al eliminar un usuario. Por favor, inténtalo de nuevo más tarde.');
    }
};

const actualizarUsuario= () => {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const tipo_documento = document.getElementById('tipo_documento').value;
    const numero_documento = document.getElementById('numero_documento').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    const ciudad = document.getElementById('ciudad').value;
    const nombre_usuario = document.getElementById('nombre_usuario').value;
    const password = document.getElementById('password').value
    const confirmarPassword = document.getElementById('confirmarPassword').value
    const rol = document.getElementById('rol').value
    const estado = document.getElementById('estado').value
    const precio_dolar = document.getElementById('precio_dolar').value

    if(nombre.length == 0){
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido'

    }
    else if(apellido.length == 0){
        document.getElementById('apellidoHelp').innerHTML = 'Dato requerido'

    }
    else if(tipo_documento.length == 0){
        document.getElementById('tipo_documentoHelp').innerHTML = 'Dato requerido'

    }
    else if(numero_documento.length == 0){
        document.getElementById('numero_documentoHelp').innerHTML = 'Dato requerido'

    }
    else if(telefono.length == 0){
        document.getElementById('telefonoHelp').innerHTML = 'Dato requerido'

    }
    else if(correo.length == 0){
        document.getElementById('correoHelp').innerHTML = 'Dato requerido'

    }
    else if(ciudad.length == 0){
        document.getElementById('ciudadHelp').innerHTML = 'Dato requerido'

    }
    else if(nombre_usuario.length == 0){
        document.getElementById('nombre_usuarioHelp').innerHTML = 'Dato requerido'

    }
    
    else if(password.length == 0){
        document.getElementById('passwordHelp').innerHTML = 'Dato requerido'
    }                                                                   
    else if(rol == ""){
        document.getElementById('rolHelp').innerHTML = 'Dato requerido'
    }
    else if(estado == ""){
        document.getElementById('estadoHelp').innerHTML = 'Dato requerido'
    }
    else if(precio_dolar == ""){
        document.getElementById('precio_dolarHelp').innerHTML = 'Dato requerido'
    }
    else if(password != confirmarPassword){
        alert('Las contraseñas no coinciden')
    }
    else{
        let usuario = {
            nombre: nombre,
            apellido: apellido,
            tipo_documento: tipo_documento,
            numero_documento: numero_documento,
            telefono: telefono,
            correo: correo,
            ciudad: ciudad,
            nombre_usuario: nombre_usuario,
            password: password,
            rol: rol,
            estado: estado,
            precio_dolar: precio_dolar,
        }
        
        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(usuario),//Convertir el objeto a JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((res) => res.json())//Obtener respuesta de la petición
        .then(json => {
            alert(json.msg) //Imprimir el mensaje de la transacción
        })
        }
}

const redireccionarEditar = (objetoUsuario) => {
    document.location.href='editarUsuario.html?usuario='+objetoUsuario
}

const editarUsuario = () => {
    // Obtener datos de la url
    var urlParams = new URLSearchParams(window.location.search);
    //Asignar valores a cajas de texto
    document.getElementById('nombre').value = urlParams.get('nombre')
    document.getElementById('apellido').value = urlParams.get('apellido')
    document.getElementById('tipo_documento').value = urlParams.get('tipo_documento')
    document.getElementById('numero_documento').value = urlParams.get('numero_documento')
    document.getElementById('telefono').value = urlParams.get('telefono')
    document.getElementById('correo').value = urlParams.get('correo')
    document.getElementById('ciudad').value = urlParams.get('ciudad')
    document.getElementById('nombre_usuario').value = urlParams.get('nombre_usuario')
    document.getElementById('password').value = urlParams.get('password')
    document.getElementById('rol').value = urlParams.get('rol')
    document.getElementById('estado').value = urlParams.get('estado')
    document.getElementById('precio_dolar').value = urlParams.get('precio_dolar')
}

if(document.querySelector('#btnRegistrar')){ //Si objeto exitste
document.querySelector('#btnRegistrar')
.addEventListener('click', registrarUsuario)
}

if(document.querySelector('#btnActualizar')){//Si objeto existe
document.querySelector('#btnActualizar')
.addEventListener('click', actualizarUsuario)
}

if (document.querySelector('#btnEliminar')) {//Si objeto existe
    document.querySelector('#btnEliminar')
        .addEventListener('click', eliminarUsuario)
}