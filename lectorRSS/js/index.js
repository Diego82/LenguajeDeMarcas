	
var windowAdd = '<br/> \
        <div class="form text-center"> \
            <div class="form-group">                \
                <input type="text" name="nombreAlimentador" id="nombreAlimentador" placeholder="Título del alimentador RSS 2.0" size="40"> \
                <input type="text" name="urlAlimentador" id="urlAlimentador" placeholder="http://www.ejemplo.com/fichero.rss" size="40"> \
            </div>    \
            <div class="form-group"> \
                <a href="#" class="btn btn-primary" onclick="cargaJSON()"> Añadir </a> \
                <a href="#" class="btn btn-danger" onclick="limpia()"> Limpiar </a> \
            </div> \
        </div>';

var activo='inicio';

function ponerActivo(nuevo_activo) {
    
    var nodo = window.document.getElementById(activo);
    nodo.removeAttribute("class");
    
    nodo = window.document.getElementById(nuevo_activo);
    nodo.setAttribute("class","active");
    activo = nuevo_activo;
}

function cargaWindowAdd() {
    var nodo = window.document.getElementById("principal");
    ponerActivo("añadir");
    nodo.innerHTML = windowAdd;
}

function cargarWindowInicio() {
    var nodo = window.document.getElementById("principal");
    ponerActivo("inicio");
    nodo.innerHTML = "inicio";
}
    
function cargarWindowLista(){
    var nodo = window.document.getElementById("principal");
    ponerActivo("listar");
    nodo.innerHTML = "lista";
}

function cargarWindowBorrar(){
    var nodo = window.document.getElementById("principal");
    ponerActivo("borrar");
    nodo.innerHTML = "borrar";
}

function cargarWindowCreditos() {
    var nodo = window.document.getElementById("principal");
    ponerActivo("creditos");
    nodo.innerHTML = "creditos";
}


function cargaJSON(){
	$.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22"+document.getElementById("formulario").value+"%22&format=json&diagnostics=true&callback=",procesar);
}

function procesar(miObjeto){
	var nodo = window.document.getElementById("principal");
	nodo.innerHTML ='procesando RSS'+document.getElementById("formulario").value;

	var nueva_URL = window.document.getElementById("principal");

	var listaNoticias = miObjeto.query.results.item;
	var x;
	var resultado = "<ol>\n";

	for (i = 0; i < miObjeto.query.count ; i++) {
		resultado+= "<li><a href=\""+listaNoticias[i].link+"\">"+listaNoticias[i].title+"</a></li>\n";	
	};
	resultado+= "</ol>\n";
	nodo.innerHTML += resultado;
}
