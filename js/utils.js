/**
	@author: Peda Venkateswarlu Pola
	Email : pola.venki@gmail.com
	YIM : pola_venki  Gtalk : pola.venki  Skype : pola.venki
*/
;(function(w){
	w.utils = {};
	
	utils.isIE = (navigator.appName.indexOf("Microsoft") != -1)?true:false;
	
	utils.addHandler = function(){
		if (window.addEventListener ){
			return function(target,eventName,handlerName){
				target.addEventListener(eventName, handlerName, false);
			};
		}else if(window.attachEvent){
			return function(target,eventName,handlerName){
				target.attachEvent("on" + eventName, handlerName);
			};
		}
		
	}();
	
	utils.removeHandler = function(){
		
		if (window.removeEventListener ){
			return function(target,eventName,handlerName){
				 target.removeEventListener(eventName, handlerName, false);
			};
		}else if(window.attachEvent){
			return function(target,eventName,handlerName){
				 target.detachEvent("on" + eventName, handlerName);
			};
		}
	     
	}();
	
		
	
	utils.stopEventPropogation = function(e){
		if(e && e.stopPropagation) e.stopPropagation();
		if (e) e.cancelBubble = true;
	};
	
	utils.cancelEvent = function(e) {
	    if (typeof e.preventDefault == "function") e.preventDefault();
	    else e.returnValue = false;
	};
	
	
	var makeMeDraggable  = function(){
		
		new Drag(utils.dragElement , function(eventName, coOrdinates , eventData){
			if(eventName == "dragstart"){
				utils.dragElement.className = "circle";
				utils.preview.className = "dragPreview";
				utils.preview.appendChild(utils.dragElement.cloneNode(true));
				utils.dragElement.style.visibility= "hidden";
			}else if(eventName == "drag"){
				console.log("Co-ords -"+JSON.stringify(coOrdinates));
				utils.preview.style.left = (coOrdinates.lastX - 50) +"px";
				utils.preview.style.top = (coOrdinates.lastY - 50) +"px";
			}else if(eventName == "dragend"){
				utils.preview.innerHTML = "";
				utils.dragElement.className = "circle dragPreview";
				utils.dragElement.style.left = (coOrdinates.lastX - 50) +"px";
				utils.dragElement.style.top = (coOrdinates.lastY - 50) +"px";
				utils.dragElement.style.visibility= "visible";
			
			}else if(eventName == "dragcancel"){
				
			}
		}, document, {},function(){
			return true;
		});

		
	};
	
	utils.addHandler(w,"load",function(){
		
		utils.dragElement = document.getElementById("dragElement");
		utils.preview = document.getElementById("preview");
		makeMeDraggable();
				
	});
	
})(window);