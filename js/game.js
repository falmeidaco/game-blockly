var conterros = 0;
$(document).ready(function(){
	function loop(){
		$("#road").animate({
			marginTop: '0px'
		}, 520, 'linear', function(){
			$("#road").css('margin-top', '-252px')
			loop()
		});
	}
	loop()
	
	setInterval(function(){
		// muda a direcao do bulbassauro
		if(Math.random()>0.5){
			$("#notice").text("Direita");
			$("#car").css('margin-left', '310px')
		}else{
			$("#notice").text("Esquerda");
			$("#car").css('margin-left', '80px')
		}
	}, 6000);
	var date = 0;
	setInterval(function(){
		$("#tempo").text(date.toFixed(2));
		if(date<5)
			date+=0.8
		else{
			// animacao do membro da equipe rocket
			$("#car").animate({
				marginTop: '300px'
			}, 1500, 'linear', function(){
				$("#car").css('margin-top', '-100px')
			});
			
			// contagem de erros e acertos
			if(($("#bulbassauro").css("margin-left")=="80px" && $("#notice").text()=="Esquerda") || ($("#bulbassauro").css("margin-left")=="340px" && $("#notice").text()=="Direita"))
				$("#scores").text(--conterros);
			else
				$("#scores").text(++conterros);
			date = 0;							
		}
	}, 800)
})
