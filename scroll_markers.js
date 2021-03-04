// ****************** GLOBALS ******************

var scroll_marker_bank = [];  // holds all saved SB locations
var index = 0;  // indicates location in global bank

// *********************************************

/*
 * Function on hold.
 */
/*
function createScrollMarker(coordinate) {
  // function on hold until further notice
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");
  let colors = ["#FFFF00", "#FF0000", "#00FF00", "#0000FF", "#EBC554"];

  // each SB marker will be random color from above array
  let num_colors = colors.length;
  let random_color = Math.floor(Math.random() * Math.floor(num_colors));

  // TODO: create marker on right-hand-side of screen (near scroll bar)
  // 		-
  context.fillStyle = colors[random_color];
  context.fillRect(coordinate.x, coordinate.y, 10, 10);
  console.log("random_color=", colors[random_color]);
}
*/

// ****************** SB MARKER MANIPULATION ******************

/*
 * Grabs current x and y location of SB.
 *
 * Returns object consisting of x, y location of SB and index of saved location
 * in global array.
 */
function getScrollLocation() {
  // x and y values will be relative to top of viewable window space
  let x = window.scrollX; // location of horizontal SB
  let y = window.scrollY; // location of vertical SB
  let idx = index; // index of marker in global array
  return {
    x,
    y,
    idx
  };
}

/*
 * Adds a SB location to the global bank.
 *
 * Returns SB location if successful and false otherwise.
 */
function addScrollLocation() {
  let success = true;
  let cur_location = getScrollLocation(); // grab current SB location

  // iterate through global bank to see if SB location already saved
  for (let i = 0; i < scroll_marker_bank.length; i++) {
    if ((scroll_marker_bank[i].x == cur_location.x) && (scroll_marker_bank[i].y == cur_location.y)) {
      success = false;
    }
  }

  // only add SB location to bank if it doesn't exist
  if (success) {
    scroll_marker_bank.push(cur_location); // add to global bank
    return cur_location;
  }

  return false;
}

/*
 * Checks if SB marker already exists in global bank.
 *
 * Returns true if obj already exists in the global bank and
 * false otherwise.
 */
function checkIfExists(obj) {
  // logic here is kind of fishy, but it works
  // if new location obj is created, but it is not the EXACT obj of the previous \
  // SAME location then func will return false (even if previous same location \
  // has same x, y location as new location)
  // only returns true upon first addition of location obj to global array
  if (scroll_marker_bank.includes(obj)) {
    return true;
  }

  return false;
}

/*
 * Scrolls to location speficied by loc.
 *
 * Returns null.
 */
function goToLocation(loc) {
  //let div = document.body.getElementsByClassName("div1")[0];
  //let select = div.getElementById(loc);
	console.log("LOC IN GOTOLOCATION=", loc);
  console.log("BANK=", scroll_marker_bank[0].x);
  let loc_in_bank = scroll_marker_bank[loc];
  //console.log("ITEM=", scroll_marker_bank[loc.value]);
  window.scrollTo(loc_in_bank.x, loc_in_bank.y);
}

// ************************************************************

// ****************** HTML MANIPULATION FUNCTIONS ******************

/*
 * Creates div element with class name "div1" and inserts it into body.
 *
 * Returns null.
 */
function addDiv() {
  let div = document.createElement("div"); // create div
  document.body.appendChild(div); // append div to body
  div.className = "div1"; // change class name
  document.body.insertBefore(div, document.body.firstChild); // append to beginning of body
}

/*
 * Creates button element and inserts into "div1."
 *
 * Returns null.
 */
function addButton() {
  let button = document.createElement("button");
  //tton.setAttribute("content", "Test");
  button.textContent = "Save Location";
  let div = document.body.getElementsByClassName("div1")[0];
  div.appendChild(button);
}

/*
 * Creates select element and inserts into "div1."
 *
 * Returns null.
 */
function addSelect() {
  let select = document.createElement("select");
  select.id = "select";
  //select.disabled = true;  // makes the first descriptor opiton unclickable
  let div = document.body.getElementsByClassName("div1")[0];
  div.appendChild(select);
  let option0 = document.createElement("option");
  option0.text = "Select";
  option0.disabled = true;
  option0.selected = true;
  select.add(option0);
}

/*
 * Creates option element and inserts into select element within "div1."
 *
 * Returns null.
 */
function addOption(txt, loc) {
  // add item to select
  let div = document.body.getElementsByClassName("div1")[0];
  let select = div.getElementsByTagName("select")[0];
  let newOption = document.createElement("option");
  newOption.text = txt;
  console.log("LOC.IDX=", loc.idx);
  newOption.value = loc.idx;
  select.add(newOption);
}

// *****************************************************************

// ****************** DRIVER CODE ******************

var ct = 0;  // FIXME: MAY NOT NEED THIS VAR
var flag = 1;
window.onload = function() {
  addDiv();
  addButton();
  var div = document.getElementsByClassName("div1")[0];
  var button = div.getElementsByTagName("button")[0];

  let select = document.querySelector(".div1");

  select.onchange = function() {

    let s = document.getElementById("select");
    goToLocation(+s.value);  // unary "+" turns s.value into int
  };

  button.onclick = function() {

    let loc = addScrollLocation();
    let cur = loc.y;
    let total = document.documentElement.scrollHeight;
    let percent = Math.round((cur / total) * 100);
    let final = percent + "%";

    if (flag == 1) {
      addSelect();
    }

    flag = 0;
    if (checkIfExists(loc)) {  // only add to select if haven't added already
      console.log("LOC=", loc);
      addOption(final, loc);
      index++;
      console.log("INDEX=", index);
    }
    console.log(scroll_marker_bank);
    ct += 1;
  }

};

// *************************************************
