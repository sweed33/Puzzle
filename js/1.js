window.onload=function(){
	puzzle=Math.floor(Math.random()*4);
	colocar();
	turno=0;
	movimientos=0;
	seg=0;
	cen=0;
	empezado=0;
}
//coloca imagenes
function colocar(){
	array=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	for (var i = 1; i < 17; i++) {
		aleatorio();
		aniadir(i);
	}
}
//saca valores aleatorios únicos
function aleatorio(){
	var sw=0;
	while(sw==0){
		aleat=Math.floor(Math.random()*16);
		if(array[aleat]==0){//si el numero no salió todavía, se marca en el array
			array[aleat]=1;
			sw=1;
		}
	}
}
//añade imagen con sus propiedades al article
function aniadir(i){
	var padre=document.getElementById("padre");
	var imagen=document.createElement("img");
	imagen.id="img"+i;
	switch(puzzle){
		case 0:
			imagen.src="../img/gollum/"+(aleat+1)+".png";
			break;
		case 1:
			imagen.src="../img/rana/"+(aleat+1)+".png";
			break;
		case 2:
			imagen.src="../img/sorpasso/"+(aleat+1)+".png";
			break;
		case 3:
			imagen.src="../img/egipto/"+(aleat+1)+".png";
			break;
		default:
			break;
	}
	imagen.addEventListener("click", cambiar);//añadimos el escuchador a la imagen para poder hacer click en ella
	padre.appendChild(imagen);
}
//intercambia 2 piezas del puzzle
function cambiar(){
	if(turno==0){
		imagen1=this;
		imagen1.style.border="1px solid red";
		imagen1.style.marginTop = "-10px";
		imagen1.style.marginLeft = "-2px";
		imagen1.style.WebkitFilter="blur(3px)contrast(1.5)";//filtro blur y contraste
		turno=1;
	}else{
		if(empezado==0){//si no ha habido ningún movimiento antes
			intervalo1=setInterval("segundos()",1000);
			intervalo2=setInterval("centesimas()",10);
			empezado=1;
		}
		imagen2=this;
		imagen1.style.border="0px solid red";
		imagen1.style.marginTop = "-5px";
		imagen1.style.marginLeft = "0px";
		imagen1.style.WebkitFilter="none";
		var padre=document.getElementById("padre");
		var clonimagen1=imagen1.cloneNode(true);
		padre.insertBefore(clonimagen1,imagen1);
		padre.insertBefore(imagen1,imagen2);
		padre.insertBefore(imagen2,clonimagen1);
		padre.removeChild(clonimagen1);
		movimientos++;
		document.getElementById("mov").innerHTML="Movimientos: "+movimientos;
		comprobarFin();
		turno=0;
	}
}
//comprueba si todas las piezas están colocadas
function comprobarFin(){
	var sw=0;
	var padre=document.getElementById("padre");
	for (var i=0;i<padre.children.length;i++) {
		var srcArray=padre.children[i].src.split("/");
		var src=srcArray[srcArray.length-1];
		if(src!=(i+1)+".png")sw=1;
	}
	if(sw==0)ponerCompleta();
}
//quita las piezas del puzzle y pone una foto completa
function ponerCompleta(){
	var padre=document.getElementById("padre");
	while (padre.childNodes.length>=1)padre.removeChild(padre.firstChild);//elimina todas las piezas
	var imagen=document.createElement("img");
	switch(puzzle){
		case 0:
			imagen.src="../img/gollum/gollum.png";
			break;
		case 1:
			imagen.src="../img/rana/rana.png";
			break;
		case 2:
			imagen.src="../img/sorpasso/sorpasso.png";
			break;
		case 3:
			imagen.src="../img/egipto/egipto.png";
			break;
		default:
			break;
	}
	imagen.className="fotoFin";
	padre.appendChild(imagen);
	parar();
}

function segundos(){
	seg++;
	return seg;
}

function centesimas(){
	cen++;
	hora();
	return cen;
}
//coloca el reloj
function hora(){
	document.getElementById("seg").innerHTML="Tiempo: "+seg+","+(cen%100)+"s";
}
//para el reloj
function parar(){
	clearInterval(intervalo1);
	clearInterval(intervalo2);
}