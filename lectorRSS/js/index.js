
var alimentadores = {
    count : 2,
    lista :[
        {
            nombre: "IDEAL Portada" ,
            url: "http://www.ideal.es/jaen/rss/2.0/portada",
            tipo: "RSS"
        } ,
        {
            nombre: "RTVE Noticias" ,
            url: "http://www.rtve.es/rss/temas_noticias.xml",
            tipo: "RSS"
        }
    ]
};



var windowInicio = '<h1>Formulario de URL</h1> \
					<div class="form-group"> \
						 <div class="form text-center"> \
							<div class="form-group">                \
								<input type="text" name="nombreAlimentador" id="nombreAlimentador" placeholder="Título del alimentador RSS 2.0" size="40"> \
								<input type="text" name="urlAlimentador" id="urlAlimentador" placeholder="http://www.ejemplo.com/fichero.rss" size="40"> \
							</div>    \
							<div class="form-group"> \
								<a href="#" class="btn btn-primary" onclick="cargaJSON()"> Añadir </a> \
								<a href="#" class="btn btn-danger" onclick="limpia()"> Limpiar </a> \
							</div> \
						</div> \
					</div> \
					<h1>Resultados</h1>';
	
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

function addRSS(){
	var nodo = window.document.getElementById("principal");
    ponerActivo("añadir");
    
    var numero_noticias = alimentadores.count;
    var nueva_url = window.document.getElementById("urlAlimentador").value;
    var nueva_nombre = window.document.getElementById("nombreAlimentador").value;
    
    alimentadores.lista[numero_noticias]= {
		url : nueva_url,
		nombre : nuevo_nombre,
		tipo : "RSS"
	}
    alimentadores.count=num_noticias+1;
    nodo.innerHTML = windowAdd;
	
	nodo.innerHTML = "<h4>Alimentador cargado</h4>"
	
}


function cargarWindowInicio() {
    var nodo = window.document.getElementById("principal");
    ponerActivo("inicio");
    nodo.innerHTML = windowInicio;
}
    
function cargarWindowLista(){
    var nodo = window.document.getElementById("principal");
    var resultado="";
    ponerActivo("listar");
    for (i=0 ; i<alimentadores.count ; i++){
		resultado+='<div class="well" onclick="cargaRSS('+i+')">'+alimentadores.lista[i].nombre+'</div>';
	}
	nodo.innerHTML=resultado;
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

function cargaRSS(numero){
	$.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22"+alimentadores.lista[numero].url+"%22&format=json&diagnostics=true&callback=",procesar);
}

function procesar(miObjeto){
	var nodo = window.document.getElementById("principal");
	//nodo.innerHTML ='procesando RSS'+document.getElementById("formulario").value;

	//var nueva_URL = window.document.getElementById("principal");

	var listaNoticias = miObjeto.query.results.item;
	var x;
	var resultado = "<ol>\n";

	for (i = 0; i < miObjeto.query.count ; i++) {
		resultado+= "<li><a href=\""+listaNoticias[i].link+"\">"+listaNoticias[i].title+"</a></li>\n";	
	};
	resultado+= "</ol>\n";
	nodo.innerHTML = resultado;
}
