import Brick from './brick.js';

export function buildLevel(game, level) {
	let bricks = [];

	try{
		level.forEach((row, rowIndex) => {
			row.forEach((brick, brickIndex) => {
				if(brick === 1){
					let position = {
						x: 80 * brickIndex / SCALE,
						y: 40 / SCALE + 24 * rowIndex / SCALE
					};
					bricks.push(new Brick(game, position));
				}
			});
		});
	}
	catch(err) {
		//game.gamestate = 6; //gamestate.win
	}

	return bricks;
}

export const level241 = [
	[0,0,0,0,0,1,0,0,0,0]
];
export const level342 = [
	[0,0,0,1,0,0,0,0,0,0]
];

export const level21 = [
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1]
];

/*export const level1 = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,1,1,1,1,1,1,1,1,0],
	[0,1,0,0,0,0,0,0,1,0],
	[0,1,0,1,1,1,1,0,1,0],
	[0,1,0,1,0,0,1,0,1,0],
	[0,1,0,1,0,0,1,0,1,0],
	[0,1,0,1,1,1,1,0,1,0],
	[0,1,0,0,0,0,0,0,1,0],
	[0,1,1,1,1,1,1,1,1,0]
];*/

export const level1 = [
	[1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,1,1,0,0,0,1],
	[1,1,0,0,0,0,0,0,1,1],
	[1,1,1,0,0,0,0,1,1,1],
	[1,1,1,1,0,0,1,1,1,1],
	[1,1,1,1,0,0,1,1,1,1],
	[1,1,1,0,0,0,0,1,1,1],
	[1,1,0,0,0,0,0,0,1,1],
	[1,0,0,0,1,1,0,0,0,1],
	[1,1,0,0,0,0,0,0,1,1],
	[1,1,1,0,0,0,0,1,1,1],
	[1,1,1,1,0,0,1,1,1,1],
	[1,1,1,0,0,0,0,1,1,1],
	[1,1,0,0,0,0,0,0,1,1],
	[1,1,0,0,0,0,0,0,1,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,1,1,0,0,0,0,1,1,1],
	[1,1,1,1,0,0,1,1,1,1]
];

export const level2 = [
	[1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,0,0,1,1,1,1],
	[1,1,1,0,0,0,0,1,1,1],
	[1,1,0,0,0,0,0,0,1,1],
	[1,0,0,0,0,0,0,0,0,1]
];

export const level3 = [
	[0,1,0,1,0,1,0,1,0,1],
	[1,0,1,0,1,0,1,0,1,0],
	[0,1,0,1,0,1,0,1,0,1],
	[1,0,1,0,1,0,1,0,1,0]
];