var scroll_marker_bank = [];
var index = 0;

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

function getScrollLocation() {
  // x and y values will be relative to top of viewable window space
  let x = window.scrollX; // location of horizontal SB
  let y = window.scrollY; // location of vertical SB
  let idx = index; // index of marker in array
  return {
    x,
    y,
    idx
  };
}

function addScrollLocation() {
  let success = true;

  let cur_location = getScrollLocation(); // grab current SB location

  // TODO: fix for loop
  // iterate through global bank to see if SB location already exists
  for (let i = 0; i < scroll_marker_bank.length; i++) {
    if ((scroll_marker_bank[i].x == cur_location.x) && (scroll_marker_bank[i].y == cur_location.y)) {
      success = false;
    }
  }

  // only add SB location to bank if it doesn't exist
  if (success) {
    scroll_marker_bank.push(cur_location); // add to global bank
  }

  return cur_location;

}

function addDiv() {
  let div = document.createElement("div"); // create div
  document.body.appendChild(div); // append div to body
  div.className = "div1"; // change class name
  document.body.insertBefore(div, document.body.firstChild); // append to beginning of body
}

function addButton() {
  let button = document.createElement("button");
  //tton.setAttribute("content", "Test");
  button.textContent = "Save Location";
  let div = document.body.getElementsByClassName("div1")[0];
  div.appendChild(button);
}

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
  //console.log(test);
  // select.onclick = console.log("Option has been clicked");
  // select.change = console.log("Option has been changed");
}

function addOption(txt, loc) {
  // add item to select
  // console.log("IN addOption()");
  // console.log("loc =", txt);
  let div = document.body.getElementsByClassName("div1")[0];
  let select = div.getElementsByTagName("select")[0];
  let newOption = document.createElement("option");
  newOption.text = txt;
  console.log("LOC.IDX=", loc.idx);
  newOption.value = loc.idx;
  //newOption.onchange = alert("option clicked!");
  //console.log("LOC", loc);
  select.add(newOption);
  //console.log(div.getElementsByTagName("select")[0]);
  //console.log(newOption.text);
  //console.log(select);
}

function checkIfExists(obj) {
  // logic here is kind of fishy, but it works
  // if new location obj is created, but it is not the EXACT obj of the previous SAME location \
  // then func will return false
  // only returns true upon first addition of location obj to global array
  //console.log("In checkIfExists()");
  if (scroll_marker_bank.includes(obj)) {
    //console.log("RETURNING TRUE");
    return true;
  }
  //console.log("RETURNING FALSE");
  return false;
}

function goToLocation(loc) {
  //let div = document.body.getElementsByClassName("div1")[0];
  //let select = div.getElementById(loc);
	console.log("LOC IN GOTOLOCATION=", loc);
  console.log("BANK=", scroll_marker_bank[0].x);
  let loc_in_bank = scroll_marker_bank[loc];
  //console.log("ITEM=", scroll_marker_bank[loc.value]);
  window.scrollTo(loc_in_bank.x, loc_in_bank.y);
}

/*
function addButtonTwo() {
let button = document.createElement("buttonTwo");
  //tton.setAttribute("content", "Test");
  button.textContent = "V";
  let div = document.body.getElementsByClassName("div1")[0];
  div.appendChild(button);
}
*/

/*
chrome.scripting.executeScript({
  file: 'background.js'
});
*/

/*
//backgroundScript.js
chrome.browserAction.onClicked.addListener(
function(tab) {
chrome.tabs.executeScript(tab.id, {
"file": "background.js"
});
});
*/

// TODO: add logic for viewing buttons
// test
var ct = 0;
var flag = 1;
window.onload = function() {
  //createOverlay();
  addDiv();
  addButton();
  var div = document.getElementsByClassName("div1")[0];
  var button = div.getElementsByTagName("button")[0];
  //nsole.log(button);

  let select = document.querySelector(".div1");

  //select.addEventListener('change', function() {
  //  goToLocation
  //});
  select.onchange = function() {
    //console.log("hi there");
    //let sel = div.getElementsByTagName("select")[0];
    //console.log("SEL.VALUE=", select.value);
    //goToLocation(select.value);
    //console.log(select);
    let s = document.getElementById("select");
    // console.log(s);
    goToLocation(+s.value);  // unary "+" turns s.value into int
  };

  button.onclick = function() {

    let loc = addScrollLocation();
    //console.log("LOC", loc);
    let cur = loc.y;
    //console.log(cur);
    let total = document.documentElement.scrollHeight;
    //console.log(total);
    let percent = Math.round((cur / total) * 100);
    let final = percent + "%";

    if (flag == 1) {
      //addButtonTwo();
      addSelect();
      //addOption("test");
    }
    flag = 0;
    if (checkIfExists(loc)) { // only add to select if haven't added already
      //console.log("LOC", loc);
      console.log("LOC=", loc);
      addOption(final, loc);
      index++;
      console.log("INDEX=", index);
    }
    // console outputs
    // console.log(window.scrollX, window.scrollY);
    console.log(scroll_marker_bank);
    ct += 1;
  }

};


// add index field to location object
// make index the id/value of an option
// after cliking object, go to that location
