var not;

function left(){
	$('#bulbassauro').css('margin-left', '80px');
}
function right(){
	$('#bulbassauro').css('margin-left', '340px');
}		

Blockly.Blocks['left'] = {
	init: function() {
	this.appendDummyInput()
		.appendField('esquerda');
		this.setOutput(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true); 
	}
}
Blockly.Blocks['right'] = {
	init: function() {
	this.appendDummyInput()
		.appendField('direita');
		this.setOutput(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true); 
	}
}
Blockly.Blocks['string_notice'] = {
	init: function() {
	this.appendDummyInput()
		.appendField('direção');
		this.setOutput(true);
	}
}
Blockly.JavaScript['string_notice'] = function(block){
	not = document.querySelector("#notice");
	return ["document.querySelector(\"#notice\").innerHTML", Blockly.JavaScript.ORDER_MEMBER];
}
Blockly.JavaScript['left'] = function(block){
	return 'left();\n';
}
Blockly.JavaScript['right'] = function(block){
	return 'right();\n';
}
/*Blockly.JavaScript['string_length'] = function(block){
	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
	return [argument0 + '.length', Blockly.JavaScript.ORDER_MEMBER];
}
Blockly.Blocks['string_length'] = {
	init: function() {
	this.appendValueInput('VALUE')
		.setCheck('String')
		.appendField('length of');

	this.setOutput(true);
	this.setPreviousStatement(true);
	this.setNextStatement(true); 
	this.setColour(160);
	this.setTooltip('Returns number of letters in the provided text.');
	this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
	}
};*/
