/* 
 * Version 0.1.0
 * Created by River Veek, riverv@uoregon.edu
 * 
 * Save locations of the scroll bar on a website or file. 
 * This module holds the main logic for the web extension.
 */

// GLOBALS
var scroll_marker_bank = [];
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

	cur_location = getScrollLocation();  // grab current SB location
	
	// TODO: fix for loop
	// iterate through global bank to see if SB location already exists
	for (let i = 0; i < scroll_marker_bank.length; i++) {
		if ((scroll_marker_bank[i].x == cur_location.x) && (scroll_marker_bank[i].y == cur_location.y)) {
			success = false;
		}
	}
	
	// only add SB location to bank if it doesn't exist
	if (success) {
		scroll_marker_bank.push(cur_location);  // add to global bank
	}
	
	return success;
}
