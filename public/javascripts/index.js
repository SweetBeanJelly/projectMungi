
$(document).ready(function () {
  pm2Data = [],
  pm10Data = [];
 
  var pm10Data = [],
      pm25Data = [];
  var result;

  var pm10length = pm10Data.length;
  var pm25length = pm25Data.length;

   
   document.getElementById("pm2").innerHTML = "20";
   document.getElementById("pm10").innerHTML = "50";

  var ws = new WebSocket('wss://' + location.host);
  ws.onopen = function () {
    console.log('Successfully connect WebSocket');
  }
  ws.onmessage = function (message) {
    console.log('receive message' + message.data);
    try {
      var obj = JSON.parse(message.data);
      if(!obj.time || !obj.params.pm10) {
        return;
      }
	  
      document.getElementById("pm2").innerHTML = obj.params.pm2;
  	  document.getElementById("pm10").innerHTML = obj.params.pm10;
		

	  if (obj.params.pm2) {
		  pm2Data.push(obj.params.pm2);
	  }
	  
	 if(obj.params.pm2>100){
		  document.getElementById("p2g5").innerHTML = "아주나쁨";
	}else if(obj.params.pm2>50){
		  document.getElementById("p2g5").innerHTML = "나쁨";
}else if(obj.params.pm2>15){
  document.getElementById("p2g5").innerHTML = "보통";
}else if(obj.params.pm2>0){
  document.getElementById("p2g5").innerHTML = "좋음";
}
if(obj.params.pm10>150){
  document.getElementById("p10g6").innerHTML = "아주나쁨";
}else if(obj.params.pm2>80){
  document.getElementById("p10g6").innerHTML = "나쁨";
}else if(obj.params.pm2>30){
  document.getElementById("p10g6").innerHTML = "보통";
}else if(obj.params.pm2>0){
  document.getElementById("p10g6").innerHTML = "좋음";
}   
      pm10Data.push(obj.params.pm10);
      pm25Data.push(obj.params.pm2);
      rpmData.push(obj.params.rpm);     
    } catch (err) {
      console.error(err);
    }
  }
	
});
