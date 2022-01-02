$(document).ready(function () {
  var player = 1;
  var winner = 0;
  var colors = {};
  colors[-1] = "yellow";
  colors[1] = "red";
  var count = 0;

  jQuery.fn.single_double_click = function (
    single_click_callback,
    double_click_callback,
    timeout
  ) {
    return this.each(function () {
      var clicks = 0,
        self = this;
      jQuery(this).click(function (event) {
        clicks++;
        if (clicks == 1) {
          setTimeout(function () {
            if (clicks == 1) {
              single_click_callback.call(self, event);
            } else {
              double_click_callback.call(self, event);
            }
            clicks = 0;
          }, timeout || 300);
        }
      });
    });
  };

  $(".cell").each(function () {
    $(this).attr("id", count);
    $(this).attr("data-player", 0);
    count++;

    $(this).single_double_click(
      function () {
        if (isValid($(this).attr("id"))) {
          $(this).text("O");
          $(this).attr("data-player", player);
          $(this).attr("data-letter", "1");
          if (checkWin(player)) {
            alert(colors[player] + " has won!");
            winner = player;
          }
          player *= -1;
        }
      },
      function () {
        console.log("hha");
        if (isValid($(this).attr("id"))) {
          $(this).text("T");
          console.log($(this).text());
          $(this).attr("data-player", player);
          $(this).attr("data-letter", "-1");
          if (checkWin(player) == 1) {
            alert("OTTO has won!");
            winner = 1;
          }
          if (checkWin(player) == 2) {
            alert("TOOT has won!");
            winner = 2;
          }
          player *= -1;
        }
      }
    );
  });

  $("#restart").click(function () {
    clearBoard();
  });

  function clearBoard() {
    $(".cell").each(function () {
      $(this).attr("data-player", 0);
      $(this).attr("data-letter", 0);
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
    var chain1 = "";
    var chain2 = "";
    var letter = 1;
    for (var i = 0; i < 24; i += 6) {
      for (var j = 0; j < 6; j++) {
        var cell = $("#" + (i + j));
        if (chain1 == "") {
          if (cell.attr("data-letter") == 1) {
            chain1 += "1";
            console.log(chain1);
          }
        } else {
          if (chain1.length == 4) {
            if (chain1 == "1-1-11") {
              console.log(chain1);
              return 1;
            } else {
              chain1 = "";
            }
          } else {
            if (cell.attr("data-letter") == 1) {
              if (chain1.length < 4) {
                chain1 = "1";
              }
            } else {
              if (cell.attr("data-letter") == 1 && chain1.length == 3) {
                chain1 += "1";
                console.log(chain1);
              } else {
                chain1 += "-1";
                // console.log(chain1);
              }
            }
          }
        }

        if (!chain2) {
          if (cell.attr("data-letter") == letter * -1) {
            chain2 += `${letter * -1}`;
          }
        } else {
          if (chain2.length == 4) {
            if (chain2 == "-111-1") {
              return 2;
            } else {
              chain2 = "";
            }
          } else {
            if (cell.attr("data-letter") == letter * -1) {
              if (chain2.length < 4) {
                chain2 = `${letter * -1}`;
              }
            } else {
              chain2 += cell.attr("data-letter");
            }
          }
        }
      }
      chain1 = "";
      chain2 = "";
    }

    //check columns
    chain1 = 0;
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
