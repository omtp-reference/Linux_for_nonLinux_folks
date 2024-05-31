function getQuery(key) {
    var query = window.location.search.substring(1);
    var key_values = query.split("&");
    var params = {};
    key_values.map(function (key_val) {
      var key_val_arr = key_val.split("=");
      params[key_val_arr[0]] = key_val_arr[1];
    });
    if (typeof params[key] != "undefined") {
      return params[key];
    }
    return "";
  }

  window.onload = function () {
    md = document.createElement("zero-md");
    md.setAttribute("src", getQuery("src"));
    md.setAttribute("no-shadow", "");
    document.getElementById("mdcontainer").append(md);
  };