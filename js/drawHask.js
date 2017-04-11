/**create 2017/04/11 */
;function drawHake(id){
	var canvas = document.getElementById(id);
 	var w = canvas.width = window.screen.width;
 	//var h = canvas.height = window.screen.height;
 	var h = canvas.height = 100;
 	var cxt = canvas.getContext('2d');
 	var words = Array(256).join('1').split('');
 	var text = '';
 	var x = 0;
 	cxt.fillStyle = 'rgba(0,0,0)';
		cxt.fillRect(0,0,w,h);
 	return function(){
 		cxt.fillStyle = 'rgba(0,0,0,0.05)';
 		cxt.fillRect(0,0,w,h);
 		cxt.fillStyle = color();;
 		words.map(function (y,index){
 			// console.log(arguments)
 			text = String.fromCharCode(65 + Math.ceil(Math.random()*57));
 			x = index*20;
 			//cxt.fillText(text,x,y);//向下跑
 			cxt.fillText(text,y,x);//向右跑
 			//words[index] = y > (768 + Math.random()*484) ? 0 : y+10;//最小运动高度
 			words[index] = y > (1366 + Math.random()*484) ? 0 : y+10;//最小运动长度
 		})
 	}
 	//生成随机颜色一
		function color(){
		var r = Math.floor(Math.random()*255);
		var g = Math.floor(Math.random()*255);
		var b = Math.floor(Math.random()*255);
		return "rgb(" + r +"," + g +","+ b +")";
	}
 	//生成随机颜色二
 	//console.log(color1());
 	function color1(){
 		var colors = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
 		var color = '';
 		for (var i = 5; i >= 0; i--) {
 			var n = Math.ceil(Math.random()*15);
 			color += '' +colors[n];
 		};
 		return '#' + color;
 	}
 	//生成随机颜色三
 	function color2(){
 		var color = Math.ceil(Math.random()*16777215).toString(16);
 		while(color.length<6){
 			color += '0'+ color;
 		}
 		return '#' + color;
 	}
};