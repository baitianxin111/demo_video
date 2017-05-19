(function(){
	function addEventListener (selector,eventName,listener){
	  var element =	document.querySelector(selector);
	  	 element.addEventListener(eventName,listener);			
		}
	 
	function init (){
//		alert(222);
		var recoder = new VideoRecoder();
//		console.log(recoder);
		 	addEventListener('.recoderButton',"click",function(){
		 		
			recoder.start();
		});
		addEventListener('.stopButton',"click",function(){
		 		
			recoder.stop();
		});
	}
	init();
}());
