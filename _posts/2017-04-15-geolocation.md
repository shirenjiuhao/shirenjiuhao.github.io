---
layout: default
title: Geolocation 的使用
---
<h2>{{ page.title }}</h2>
<p>在HTML5中，为window.navigator对象新增了一个geolocation属性，可以使用Geolocation API来对该属性进行访问。geolocation属性存在一下三个方法</p>
<ol>
	<li>可以使用getCurrentPosition 方法来获取用户当前的地理位置信息，该方法的定义如下：
		<pre>
			getCurrentPosition(success,error,options)
		</pre>
		<ol>
			<li>方法中的第一个参数为获取到当前地理位置信息成功时的回调函数。
				其中的position 参数代表的是一个position对象。它具有以下属性(coords)
				<ol>
					<li>latitude:当前地理位置的维度</li>
					<li>longitude: 当前地理位置的经度</li>
					<li>altitude: 当前地理位置的海拔（不能获取时为null）</li>
					<li>accuracy: 获取到的维度或者经度的精度（以米为单位）</li>
					<li>altitudeAccuracy: 获取到海拔的精度（以米为单位）</li>
					<li>heading：设备的前进方向。用正面朝正北方向的顺时针顺时针旋转角度来表示（不能获取时为null）</li>
					<li>speed：设备的前进速度（以米/秒为单位，不能获取时为null）</li>
					<li>timestamp：获取地理位置信息时的时间</li>
				</ol>
				<pre>
					navigator.geolocation.getCurrentPosition(function(position){
						//获取成功后的处理
					})
				</pre>
			</li>
			<li>方法中的第二个参数为获取到当前地理位置信息失败时的回调函数。
				其中的error 参数代表的是一个error对象。它具有以下属性
				<ol>
					<li>code:返回状态码
						<ol>
							<li>
								状态码1：用户直接拒绝被获取位置信息
							</li>
							<li>状态码2：网络不可用或者无法连接到获取位置的卫星</li>
							<li>状态码3：连接可用，倒在计算用户的位置上花费了过长时间</li>
							<li>状态码0：发生了其他未知错误</li>
						</ol>
					</li>
					<li>message: 为一个字符串，该字符串包含了错误信息，需要注意的是有些浏览器是不支持该属性的。</li>
				</ol>
				<pre>
					navigator.geolocation.getCurrentPosition(function(position){
						//获取成功后的处理
					},function(error){
						//捕获错误信息
					})
				</pre>
			</li>
			<li>方法中的第三个参数可以省略，它时一些可选属性的列表。
				<ol>
					<li>enableHighAccuracy(布尔型，默认false)：是否要求高精度的地理位置信息。
					</li>
					<li>maximumAge(单位毫秒，默认为0):对地理位置信息缓存的有效时间，超过这个时间的缓存的地理位置信息被废弃，尝试重新请求。</li>
					<li>timeout(单位为毫秒，默认值为 infinity/0)：对地理位置信息的获取设置超时限制，如在规定时间内未能获取，则返回错误。</li>
				</ol>
				<pre>
					navigator.geolocation.getCurrentPosition(function(position){
						//获取成功后的处理
					},function(error){
						//捕获错误信息
					},{//以下为可选属性
						maximumAge:60*1000*2,//设置缓存的有效时间为2分钟
						timeout:5000 //5秒钟内获取到地理位置信息否则返回错误
					})
				</pre>
			</li>
		</ol>
	</li>
	<li>
		用watchCurrentPosition方法来持续获取用户的当前地理位置信息，它会定期地自动获取，用法如下
		<pre>
			watchCurrentPosition(success,error,options)
		</pre>
		该方法的三个参数的说明和getCurrentPosition 方法相同。该方法返回一个数字，这个数字与setInterval 方法返回参数的使用方法相同，可以被clearWatch方法使用，停止对当前地理位置信息的监视
	</li>
	<li>
		clearWatch(watchId);该方法可以停止对当前用户的地理位置信息的监视，该方法的参数为
		调用 watchCurrentPosition 方法返回值。
	</li>
</ol>
<p>一个简单的例子</p>
<pre>
	<html>
	<head>
		<meta charset="UTF-8">
		<title>getPosition 获取地理位置的经纬度</title>
	</head>
	<body>
		<p id='position'></p>
		<script>
			function getElem(id){
				return typeof id ==='string' ? document.getElementById(id) : id
			}
			function show(latitude,longitude){
				var str = '恁当前所在位置，维度：'+latitude + '经度：' +longitude;
				getElem('position').innerHTML = str; 
			}
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(function (position){
					console.log(position);
					show(position.coords.latitude,position.coords.longitude);
				},function (error){
					var errorTypes = {
						1:'获取位置服务被用户拒绝',
						2:'无法连接到获取位置信息的卫星',
						3:'获取位置信息超时'
					}
					getElem('position').innerHTML = errorTypes[error.code] + '\n' + error.message;
				},{
					maximumAge:60*1000*2,
					timeout:5000
				});
			}else{
				getElem('position').innerHTML = '您当前使用的浏览器不支持 Geolocation 服务'
			}
		</script>
	</body>
	</html>
</pre>
<p>{{ page.date | date_to_string }}</p>