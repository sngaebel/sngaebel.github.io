var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
document.getElementsByTagName('head')[0].appendChild(script);

function openNav() {
    if(!document.getElementById("mySidepanel").open) {
        document.getElementById("mySidepanel").style.width = "clamp(20px, 20vw, 250px)";
        document.getElementById("main").style.marginLeft = "clamp(20px, 20vw, 250px)";
        document.getElementById("mySidepanel").open = true;
    }
    else {
        document.getElementById("mySidepanel").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("mySidepanel").open = false;
    }
    
}

function showHiddenRow(row) { 
    $("#" + row).toggle(); 
} 


function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  // Set the sorting direction to ascending:
  dir = table.rows[0].getElementsByTagName("TH")[n].getAttribute("dir");
  /* Make a loop that will continue until
  no switching has been done: */
  for (i=2; i < table.rows.length-1; i+=2) {
    if(!table.rows[i].classList.contains("hiddenRow")){
      table.rows[i].classList.add("hiddenRow");
    }
  }
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 2); i+=2) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 2].getElementsByTagName("TD")[n];
    
      y = y.innerHTML.toLowerCase();
      x = x.innerHTML.toLowerCase();
      if(x.includes("</a>")) {
        x = x.substring(x.indexOf(">")+1, x.indexOf("</"));
      }
      if(y.includes("</a>")) {
        y = y.substring(y.indexOf(">")+1, y.indexOf("</"));
      }

      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (greaterThan(x, y)) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } 
      else if (dir == "desc") {
        if (greaterThan(y, x)) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      switchRows(i, rows);
      switching = true;
    } 
  }
  if(dir == "asc") {
    table.rows[0].getElementsByTagName("TH")[n].dir = "desc";
  }
  else {
    table.rows[0].getElementsByTagName("TH")[n].dir = "asc";
  }
}

function switchRows(i, rows) {
  rows[i].classList.toggle("oddRow");
  rows[i+1].classList.toggle("oddRow");
  rows[i+2].classList.toggle("oddRow");
  rows[i+3].classList.toggle("oddRow");

  rows[i].parentNode.insertBefore(rows[i + 2], rows[i]);
  rows[i + 1].parentNode.insertBefore(rows[i + 3], rows[i + 1]);

}

function greaterThan(x, y) {
  if(x.trim() == "" && y.trim() == "") {
    return false;
  }
  else if(x.trim() == "") {
    return true;
  }
  else if(y.trim() == "") {
    return false;
  }
  else {
    return x > y;
  }

}
