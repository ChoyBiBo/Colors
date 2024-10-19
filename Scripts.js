$(document).ready(function () {

//alert("Hello World");

function getColors(){


fetch("https://api.prolook.com/api/colors/prolook")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    console.log(data["colors"]);

    $.each(data["colors"], function(index, value) {
    $('#colorsUL').append(
        "<li class='listItem'>"+
        "<div class='row'>"+
        "<div class='col'>"+
            value["name"]+
        "</div>"+
        "<div class='col btnHolder'>"+
        "<button  type='button' class='btn btn-primary ' value='"+value["hex_code"]+"' data='"+value["color_code"]+"' name='"+value["name"]+"'>preview</button>"+
        "</div>"+
        "</div>"+
        "</li>"
    )
        //console.log(index + ": " + value["name"] + " "+value["hex_code"]);
});
  })
  .catch(error => {
    console.error('Error:', error);
  });

};



getColors();


function invertHex(hex) {
  var invColor = "#"+(Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
  return invColor;
}

$(document).on('click','.btn',function(e){
    //alert(this.value);
    $("#innerDiv")[0].innerHTML = null
    
    $("#previewHolder").css("background-color", "#"+this.value);
    
    
    $("#innerDiv").append(
        "<p style=color:"+invertHex(this.value)+";>Name: "+this.getAttribute("name")+"</p>"+
        "<p style=color:"+invertHex(this.value)+";>Hex: #"+this.value+"</p>"+
        "<p style=color:"+invertHex(this.value)+";>Color Code: "+this.getAttribute("data")+"</p>"
    );

});




    });
