window.onload= function(){

	 qtddDePoltronas=400; //Variável usada para determinar, dinamicamente, a quantidade de poltronas do cinema.
	 criarPoltronas();//Inicia a criação dos elementos poltronas, no documento.

	 document.querySelector("#reservar").onclick=function(){	 	
	 	reservar();//Dispara a função reservar caso o botão reservar seja clicado.
	 } 

	 document.querySelector("#limpar").onclick=function(){
	 	limpar();//Dispara a função limpar caso o botão limpar seja clicado
	 } 


//CRIA POLTRONAS NO DOCUMENTO HTML DINAMICAMENTE.
	function criarPoltronas(){
		//As poltronas estão divididas em 2 corredores, posicionadas dentro de 2 divs
		var divEsquerda	=document.getElementById("esquerda");
		var divDireita	=document.getElementById("direita");
		var newElemImg = new Array();//Matriz para armazenar as imagens das poltronas
		var aux=0;//Auxilia na criação de titulos com enumerações das poltronas para futuras confirmações
		
		//Criação e inserção de um novo elemento em um outro; nesse caso, um div.
		for(var i=0;i<qtddDePoltronas;i++){
			newElemImg[i]  = document.createElement("img");
			newElemImg[i].src="poltornas/livre.jpg";
			newElemImg[i].id="img"+i;
			newElemImg[i].setAttribute("class","livre");		
		//Inserção do title:
		aux=(i+1);
			if(i<(qtddDePoltronas/2)){
				newElemImg[i].title="Corredor:A - Poltrona:"+aux;
				divEsquerda.appendChild(newElemImg[i]);
			}

			else if(i>=(qtddDePoltronas/2)){
				newElemImg[i].title="Corredor:B - Poltrona:"+aux;
				divDireita.appendChild(newElemImg[i]);
			}

		}

		onclicking(newElemImg);
		tela=document.createElement("div");
		tela.id="tela";
		tela.innerHTML="T e l a";
		document.body.appendChild(tela);

	}

//MANIPULA OS EVENTOS DE CLIQUE DO MOUSE
	function onclicking(elemImg){
		for(var i=0;i<qtddDePoltronas;i++){

				elemImg[i].onclick=function(e){

					if(e.target.getAttribute("class")=="livre"){
						//Se uma poltrona clicada, tiver a classe livre, troque a imagem e passe-a para a classe selecionada
						e.target.src="poltornas/selecionada.jpg";
						e.target.setAttribute("class","selecionada");
					}

					else if(e.target.getAttribute("class")=="selecionada"){
						//Se a imagem já estiver previamente selecionada, troque a imagem e passe-a para a classe reservada
						e.target.src="poltornas/reservada.jpg";
						e.target.setAttribute("class","reservada");
					}	
				}
		}
	}

//VERIFICA OS REQUISITOS PARA SE FAZER RESERVA DE POLTRONA(s)
	function reservar(){	
		var id;
		var cont=0;
		var arrayDeId=new Array();//Matriz para gerenciar a quantidade de poltronas reservadas
		var polt="";

		for(var i=0;i<qtddDePoltronas;i++){
			//Dentro do laço que corresponde a quantidade de poltronas diponíveis no cinema...
			id="img"+i;
			if(document.getElementById(id).getAttribute("class")=="reservada"){
				//verifica-se se alguma poltrona já encontra-se na classe reservada.
				polt+=document.getElementById(id).title+"\n";//apresenta o título e pula-se uma linha
				arrayDeId[cont]=document.getElementById(id).id;//adiciona-se o id de da imagem em questão, na matriz.
				cont++;//O contador irá determinar se há ou não poltronas a serem reservadas.
			}
		}

			if(cont>0){
				//Caso haja poltronas a serem reservadas...
				if(confirm("Reservando "+ cont +" poltrona(s),\n"+ polt+ "\nDeseja continuar ?")==false){
					//Pede confirmação, se a resposta for não, limpa e sai da função.
					limpar();return;
				}else{
					//Se a resposta da confirmação for sim, entra-se num laço do tamanho de cont.
					for(var i=0;i<cont;i++){
						//Muda-se a poltrona de classe e de imagem.
						document.getElementById(arrayDeId[i]).setAttribute("class","bloqueada");						
						document.getElementById(arrayDeId[i]).src="poltornas/reservadaR.jpg";
					}limpar();//Deseleciona as demais poltronas
						
				}
				alert("Tenha uma ótima sessão!");
			}	
	}

//TORNA TODAS AS POLTRONAS LIVRES, EXCETOS AS JÁ CONFIRMADAS
	function limpar(){
			for(i=0;i<qtddDePoltronas;i++){
						imagem=document.getElementById("img"+i);
						if(imagem.getAttribute("class")=="selecionada"||imagem.getAttribute("class")=="reservada"){
							imagem.setAttribute("class","livre");//Muda a classe					
							imagem.src="poltornas/livre.jpg";//Muda a imagem
						}			
			}		
	}

}