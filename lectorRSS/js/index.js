	
	nodo.innerHTML += "<br/> Procesando "+miObjeto.query.count+" noticias<br/><br/>";

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