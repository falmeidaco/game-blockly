window.onload = function(){
	var workspace = Blockly.inject('blocklyDiv',{media: 'js/media/',toolbox: document.getElementById('toolbox')}), repeat;
	var play = document.getElementById("play");
	play.onclick = function(){
		try {
			Blockly.JavaScript.addReservedWords('code');
			clearInterval(repeat);
			repeat = setInterval(function(){
				eval(Blockly.JavaScript.workspaceToCode(workspace));
			}, 1000);
			
		} catch (e) {
			console.log("Error in code, type: "+e);
		}
	}
}
