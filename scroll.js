/*
 * Version 0.1.0
 * Created by River Veek, riverv@uoregon.edu
 *
 * Save locations of the scroll bar on a website or file.
 * This file holds the main logic for the web extension.
 */

// GLOBALS
var scroll_marker_bank = [];
var MARKER_LENGTH = 10;
var MARKER_HEIGHT = 5;
//


/*
 * Returns the location of the scroll bars
 * as a two-item object {x, y}.
 *
 * y cooresponds to the verticle SB, while
 * x corresponds to the horizontal SB (if
 * applicable). The starting state of the window
 * is (0, 0). x and y represent the number of pixels
 * that the SB is offset by.
 *
 * > getScrollLocation();
 * -> {x: 0, y: 1738}
 */
function getScrollLocation() {
	let x = window.scrollX;  // location of horizontal SB
	let y = window.scrollY;  // location of vertical SB

	return {
		x,
		y
	};
}

/*
 * Returns true upon successful add and
 * false otherwise.
 *
 * Adds the current SB location to the global
 * bank of SB markers. Multiple calls will not
 * result in multiple of the same SB location
 * to be added.
 */
function addScrollLocation() {
	let success = true;

	let cur_location = getScrollLocation();  // grab current SB location

	// TODO: fix for loop
	// iterate through global bank to see if SB location already exists
	for (let i = 0; i < scroll_marker_bank.length; i++) {
		if ( (scroll_marker_bank[i].x == cur_location.x) && (scroll_marker_bank[i].y == cur_location.y) ) {
			success = false;
		}
	}

	// only add SB location to bank if it doesn't exist
	if (success) {
		scroll_marker_bank.push(cur_location);  // add to global bank
	}

	return success;
}

/*
 * Takes an integer, index, that corresponds to a location
 * to be deleted.
 *
 * Returns true upon successful deletion and
 * false otherwise.
 *
 * Removes the saved SB location at position index from
 * the scroll_marker_bank (if it exists).
*/
function removeScrollLocation(index) {
	let success = true;

	if ( (index < 0) || (index > scroll_marker_bank.length) || (scroll_marker_bank.length == 0) ) {
		success = false;
	}

	if (success != false) {
		scroll_marker_bank.splice(index, 1);  // removes 1 item at location index
	}

	return success;
}

/*
 * XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 * TODO: FUNCTION ON HOLD UNTIL I
 * FIGURE OUT HOW TO CREATE CANVAS ELEMENT
 *
 * Takes an {x, y} coordinate, returns null.
 *
 * Creates a visual marker showing a saved SB location. Color of marker
 * will be chosen at random. Size will be default to 5 * 10 pixels.
 * XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 */
function createScrollMarker (coordinate) {
	let canvas = document.getElementById("canvas");
	let context = canvas.getContext("2d");
	let colors = ["#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#EBC554"];

	// each SB marker will be random color from above array
	let num_colors = colors.length;
	let random_color = Math.floor(Math.random() * Math.floor(num_colors));

	// TODO: create marker on right-hand-side of screen (near scroll bar)
	// 		-
	// context.fillStyle(colors[random_color]);
	// context.fillRect(coordinate.x, coordinatey.y, MARKER_LENGTH, MARKER_HEIGHT);
	console.log("random_color=", colors[random_color])
}

/*
 * Returns null.
 *
 * Creates a canvas element and appends it to body of web page.
 */
function createOverlay() {
	let canvas = document.createElement("canvas");  // create the canvas element
	document.body.appendChild(canvas);  // append element to body of web page
	canvas.style.position = "fixed";  // position relative to browser window
}
