$(document).ready(function () {
  var player = 1;
  var winner = 0;
  var colors = {};
  colors[-1] = "yellow";
  colors[1] = "red";
  var count = 0;

  $(".cell").each(function () {
    $(this).attr("id", count);
    $(this).attr("data-player", 0);
    count++;
    $(this).dblclick(function () {
      console.log("hha");
      if (isValid($(this).attr("id"))) {
        $(this).text("T");
        console.log($(this).text());
        $(this).attr("data-player", player);
        if (checkWin(player)) {
          alert(colors[player] + " has won!");
          winner = player;
        }
        player *= -1;
      }
    });
    $(this).click(function () {
      if (isValid($(this).attr("id"))) {
        $(this).text("O");
        $(this).attr("data-player", player);
        if (checkWin(player)) {
          alert(colors[player] + " has won!");
          winner = player;
        }
        player *= -1;
      }
    });
  });

  $("#restart").click(function () {
    clearBoard();
  });

  function clearBoard() {
    $(".cell").each(function () {
      $(this).attr("data-player", 0);
      $(this).text("");
      winner = 0;
    });
  }
  function isValid(n) {
    var id = parseInt(n);
    if (winner !== 0) {
      return false;
    }
    if ($("#" + id).attr("data-player") === "0") {
      if (id >= 18) {
        return true;
      }
      if ($("#" + (id + 6)).attr("data-player") !== "0") {
        return true;
      }
    }
    return false;
  }

  function checkWin(p) {
    //check rows
    var chain = 0;
    for (var i = 0; i < 24; i += 6) {
      for (var j = 0; j < 6; j++) {
        var cell = $("#" + (i + j));
        if (cell.attr("data-player") == p) {
          chain++;
        } else {
          chain = 0;
        }

        if (chain >= 4) {
          return true;
        }
      }
      chain = 0;
    }

    //check columns
    chain = 0;
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 24; j += 6) {
        var cell = $("#" + (i + j));
        if (cell.attr("data-player") == p) {
          chain++;
        } else {
          chain = 0;
        }

        if (chain >= 4) {
          return true;
        }
      }
      chain = 0;
    }

    //check diagonals
    var topLeft = 0;
    var topRight = topLeft + 3;

    for (var i = 0; i < 2; i++) {
      for (var j = 0; j < 3; j++) {
        if (
          $("#" + topLeft).attr("data-player") == p &&
          $("#" + (topLeft + 7)).attr("data-player") == p &&
          $("#" + (topLeft + 14)).attr("data-player") == p &&
          $("#" + (topLeft + 21)).attr("data-player") == p
        ) {
          return true;
        }

        if (
          $("#" + topRight).attr("data-player") == p &&
          $("#" + (topRight + 5)).attr("data-player") == p &&
          $("#" + (topRight + 10)).attr("data-player") == p &&
          $("#" + (topRight + 15)).attr("data-player") == p
        ) {
          return true;
        }

        topLeft++;
        topRight = topLeft + 3;
      }
      topLeft = i * 6 + 6;
      topRight = topLeft + 3;
    }

    return false;
  }
});
