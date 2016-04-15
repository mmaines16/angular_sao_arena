function changeHealth(amount, id) {
  var elem = document.getElementsByClassName("myBar")[id];
  var label = document.getElementsByClassName("label")[id];  
  var width = Number(elem.style.width.replace(/[^\d\.\-]/g, ''));
  var id = setInterval(frame, 20);
 
  
  function frame() {
    if (width == amount) {
      clearInterval(id);
    } else {

      if(width > amount)
      {
          width--; 
          elem.style.width = width + '%'; 
          label.innerHTML = width * 1  +     '%';  }
      else
      {
          width++;
          elem.style.width = width + '%'; 
          label.innerHTML = width * 1  +     '%';
      }
	  
	  if(width < 26)
	  {
		
		elem.style.backgroundColor = "#ff0000";
	  }
	  else if(width < 80)
	  {
		elem.style.backgroundColor = "#ffff00";
	  }
	  else
	  {
		elem.style.backgroundColor = "#4CAF50";
	  }
	  
    }
  }
}

function init(){
	for(i=0; i<document.getElementsByClassName("myBar").length; i++){
		changeHealth(100, i);
	}
	
	var skills = document.getElementsByClassName("skill-snapshot");
}

$(window).load(function() {
	window.setTimeout(init, 500);
});
