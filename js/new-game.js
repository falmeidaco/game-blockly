/*
Grid IDs
0 = sky/void
1 = ground
2 = block
3 = enemy
4 = player
5 = ending
*/

var game_grid = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,5],
	[1,1,1,1,1,1,0,1,1,1,1,0,1,0,1,1,1,1,0,1]
],
grid_width = 20;
grid_height = 20;

function getItem(item_index) {
	var element = 'sky';
	switch (item_index) {
		case 0: element = 'sky';
		break;
		case 1: element = 'ground';
		break;
		case 5: element = 'finish';
		break;
	}
	return element;
}

function prepareGameGrid(grid, grid_container, item_width, item_height) {
	var i, j, e,
		width = grid[0].length,
		height = grid.length;

	for (i = 0; i < height; i = i + 1) {
		for (j = 0; j < width; j = j + 1) {
			$('<div>').html('<span>'+j+','+i+'<span>').attr('id', 'grid-item-p-'+j+'-'+i).addClass('grid-item grid-item-' + getItem(grid[i][j])).css({
				'top': (i*item_width),
				'left': (j*item_height)
			}).appendTo(grid_container);
		}
	}
}

function setPlayerPosition(x, y) {
	$('#player').data('px', x);
	$('#player').data('py', y);
}

function getPlayerX() {
	return parseInt($('#player').data('px'));
}

function getPlayerY() {
	return parseInt($('#player').data('py'));
}

function updatePlayerPosition(animation) {
	if (animation) {
		$('#player').animate({
			'top': (getPlayerY() * grid_width),
			'left': (getPlayerX() * grid_height)
		}, 100, 'linear');
	} else {
		$('#player').css({
			'top': (getPlayerY() * grid_width),
			'left': (getPlayerX() * grid_height)
		});
	}
	$('#player').html(getPlayerX() + ',' + getPlayerY());

	if (getPlayerX() === 19 && getPlayerY() === 6) {
		window.alert('Parabéns, você chegou ao final!');
		window.reload();
	}
}

function hasGround(x, y) {
	if (game_grid[y+1][x] == 1) {
		return true;
	} else {
		return false;
	}
}

function hasBlock(x, y) {
	if (game_grid[y][x] == 1) {
		return true;
	} else {
		return false;
	}
}

function checkArea(x, y) {
	if (x < 0) {
		return 'left';
	}
	if (x > 19) {
		return 'right';
	}
	if (y < 0) {
		return 'top';
	}
	if (y > 7) {
		return 'bottom';
	}
	return 'inside';
}

function playerMove(direction) {
	var _x = getPlayerX(),
		_y = getPlayerY();
	if (direction == 'left') {
		if (checkArea(_x - 1, _y) === 'inside') {
			if (!hasBlock(_x - 1, _y)) {
				setPlayerPosition((_x - 1), _y);
				if (!hasGround((_x - 1), _y)) {
					playerMoveDown();
				}
			}
		}
	} else if (direction == 'right') {
		if (checkArea(_x + 1, _y) === 'inside') {
			if (!hasBlock(_x + 1, _y)) {
				setPlayerPosition((_x + 1), _y);
				if (!hasGround((_x + 1), _y)) {
					playerMoveDown();
				}
			}
		}
	} else if (direction == 'down') {
		if (checkArea(_x, _y + 1) === 'inside') {
			if (!hasGround(_x, _y)) {
				setPlayerPosition(_x, _y + 1);
				playerMoveDown();
			}
		} else {
			window.alert("Game Over!");
			location.reload();
		}
	}
	updatePlayerPosition(true);
}

function playerJumpRight() {
	var _x = getPlayerX(),
		_y = getPlayerY();
	if (checkArea(_x + 2, _y - 2) === 'inside') {
		if (!hasBlock(_x + 2, _y - 2)) {
			setPlayerPosition(_x + 2, _y - 2);
			updatePlayerPosition();
			playerMoveDown();
		}
	}
}

function playerJumpLeft() {
	var _x = getPlayerX(),
		_y = getPlayerY();
	if (checkArea(_x - 2, _y - 2) === 'inside') {
		if (!hasBlock(_x - 2, _y - 2)) {
			setPlayerPosition(_x - 2, _y - 2);
			updatePlayerPosition();
			playerMoveDown();
		}
	}
}

function playerMoveRight() {
	playerMove('right');
}

function playerMoveLeft(direction) {
	playerMove('left');
}

function playerMoveDown(direction) {
	playerMove('down');
}

(function(jQuery){
	$(document).ready(function() {
		prepareGameGrid(game_grid, '#game-cenario', grid_width, grid_height);
		setPlayerPosition(0, 6);
		updatePlayerPosition(false);
	});
}($));

/* Define Blockly */

Blockly.Blocks['playerMoveLeft'] = {
	init: function() {
	this.appendDummyInput()
		.appendField('esquerda');
		this.setOutput(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true); 
	}
}
Blockly.JavaScript['playerMoveLeft'] = function(block){
	return 'playerMoveLeft();\n';
}

Blockly.Blocks['playerMoveRight'] = {
	init: function() {
	this.appendDummyInput()
		.appendField('direita');
		this.setOutput(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true); 
	}
}
Blockly.JavaScript['playerMoveRight'] = function(block){
	return 'playerMoveRight();\n';
}

Blockly.Blocks['playerJumpRight'] = {
	init: function() {
	this.appendDummyInput()
		.appendField('pular direita');
		this.setOutput(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true); 
	}
}
Blockly.JavaScript['playerJumpRight'] = function(block){
	return 'playerJumpRight();\n';
}

Blockly.Blocks['playerJumpLeft'] = {
	init: function() {
	this.appendDummyInput()
		.appendField('pular esquerda');
		this.setOutput(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true); 
	}
}
Blockly.JavaScript['playerJumpLeft'] = function(block){
	return 'playerJumpRight();\n';
}

Blockly.Blocks['current_x'] = {
	init: function() {
	this.appendDummyInput()
		.appendField('x atual');
		this.setOutput(true);
	}
}
Blockly.JavaScript['current_x'] = function(block) {
	return [$('#player').data('px'), Blockly.JavaScript.ORDER_MEMBER];
}

Blockly.Blocks['current_y'] = {
	init: function() {
	this.appendDummyInput()
		.appendField('y atual');
		this.setOutput(true);
	}
}
Blockly.JavaScript['current_y'] = function(block) {
	return [$('#player').data('py'), Blockly.JavaScript.ORDER_MEMBER];
}


/* Execute Blocky */
window.onload = function(){
	var workspace = Blockly.inject('blocklyDiv',{media: 'js/media/', toolbox: document.getElementById('toolbox')}), repeat;
	var play = document.getElementById("play");
	function playBlocky() {
		console.log('play step');
		try {
			eval(Blockly.JavaScript.workspaceToCode(workspace));
			setTimeout(function() {
				playBlocky();
			}, 1500);
		} catch (e) {
			console.log("Error in code, type: " + e);
		}
	}	
	/*Blockly.JavaScript.addReservedWords('code');
	clearInterval(repeat);
	repeat = setInterval(function(){
		eval(Blockly.JavaScript.workspaceToCode(workspace));
	}, 1000);
	*/
	play.onclick = function() {
		playBlocky();
	}
}
