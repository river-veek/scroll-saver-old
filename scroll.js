/* 
 * Version 0.1.0
 * Created by River Veek, riverv@uoregon.edu
 * 
 * Save locations of the scroll bar on a website or file. 
 * This module holds the main logic for the web extension.
 */


/*
 * Returns the location of the scroll bars 
 * as a two-item object {x, y}. 
 *
 * y cooresponds to the verticle SB, while 
 * x corresponds to the horizontal SB (if 
 * applicable). The starting state of the window 
 * is (0, 0).
 *
 * > getScrollLocation();
 * -> {x: 0, y: 1738}
 */
function getScrollLocation() {
	let x = window.scrollX;
	let y = window.scrollY;
	return {
		x,
		y
	};
}

/*
 * Creates a bank to hold all SB markers.
 * Called upon the first SB marker creation.
 */
function createBank() {
	var bank = [];	
}


