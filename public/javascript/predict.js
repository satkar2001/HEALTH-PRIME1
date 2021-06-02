var myClarifaiApiKey = 'f1aeb73cc9044ab1b6a7a13a351dba88';
var myWolframAppId = 'GXL8UX-8LAU88JXUR';

var app = new Clarifai.App({apiKey: myClarifaiApiKey});

/*
  Purpose: Pass information to other helper functions after a user clicks 'Predict'
  Args:
    value - Actual filename or URL
    source - 'url' or 'file'
    */
function predict_click(value, source) {
  var preview = $(".food-photo");
  var file    = document.querySelector("input[type=file]").files[0];
  var loader  = "https://s3.amazonaws.com/static.mlh.io/icons/loading.svg";
  var reader  = new FileReader();

  // load local file picture
  reader.addEventListener("load", function () {
    preview.attr('style', 'background-image: url("' + reader.result + '");');
    doPredict({ base64: reader.result.split("base64,")[1] });
  }, false);

  if (file) {
    reader.readAsDataURL(file);
     $('#concepts').html('..');
    //  <img src="' + loader + '" class="loading" />

  } else { alert("No file selcted!"); }
}


function doPredict(value) {
  app.models.predict(Clarifai.FOOD_MODEL, value).then(function(response) {
      if(response.rawData.outputs[0].data.hasOwnProperty("concepts")) {
        var tag = response.rawData.outputs[0].data.concepts[0].name;
        // var url = 'http://api.wolframalpha.com/v2/query?input='+tag+'%20nutrition%20facts&appid='+myWolframAppId;
        // var url1=`https://api.nal.usda.gov/fdc/v1/foods/search?query=${tag}&pageSize=2&api_key=MAL4YsqO8moG9bu05XHmrSU2KqXlvROukfwnxOeo`;
        // var url=`https://api.edamam.com/api/food-database/v2/parser?ingr=${tag}&app_id=5a4c5ffe&app_key=7cfc9d2e37a9b26303ee09dbee6d8d86`;
        $(function() {
          $.ajax({
          url: `https://api.nal.usda.gov/fdc/v1/foods/search?query=${tag}&pageSize=1&api_key=MAL4YsqO8moG9bu05XHmrSU2KqXlvROukfwnxOeo`,
          type: "get",
          dataType: "json",
          success: function(data) {
            console.log(data);
          renderItem(data);
          }
          });
         });
         function renderItem(data) {
          //  if(!data){
          //  }
          //  else{

          const br=$('<p/>').text('');
          const tg=$('<p/>').text('food name:' +tag );
          const cal = $('<p/>').text(data.foods[0].foodNutrients[0].nutrientName +': '+ data.foods[0].foodNutrients[0].value);
          const prot=$('<p/>').text(data.foods[0].foodNutrients[1].nutrientName +': '+ data.foods[0].foodNutrients[1].value);
          const carb=$('<p/>').text(data.foods[0].foodNutrients[2].nutrientName +': '+ data.foods[0].foodNutrients[2].value);
          const fat=$('<p/>').text(data.foods[0].foodNutrients[3].nutrientName +': '+ data.foods[0].foodNutrients[3].value);
          const sg=$('<p/>').text(data.foods[0].foodNutrients[4].nutrientName +': '+ data.foods[0].foodNutrients[4].value);
          const fb=$('<p/>').text(data.foods[0].foodNutrients[5].nutrientName +': '+ data.foods[0].foodNutrients[5].value);

          $('#concepts').append(br,tg,cal,prot,carb,fat,sg,fb);
          //  }
        }
        // getNutritionalInfo(url1, function (result) {
        //   $('#concepts').html('<h3>'+ tag + '</h3>' + '<p>'+result+'</p>');
        // });
      }
    }, function(err) { console.log(err); }
  );
}
