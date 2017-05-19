(function(){
	function VideoRecoder (){
		this.getMediaStream();
	}
	//获取媒体流
	VideoRecoder.prototype.getMediaStream = function (){
		var config = {
			video: true
		};
		var self = this;
		this.buffers = [];
		function success (stream){
			self.mediaRecorder = new  MediaRecorder(stream,{mimeType:"video/webm"});
			self.mediaRecorder.ondataavailable = function(event){
				self.buffers.push(event.data);
				console.log(event.data);
				
			};
			self.addEventListener();
		}
		navigator.mediaDevices.getUserMedia(config).then(success).catch(fail)
		function fail(error){
			console.log(error);
		}
	}
	//监听事件，将录制的视频保存到本地
	VideoRecoder.prototype.addEventListener = function(){
			var self = this;
		this.mediaRecorder.addEventListener("stop",function(){
			//获取媒体流，用video来承载
		
			var blob = new Blob(self.buffers,{mimeType:"video/webm"});
			var url = URL.createObjectURL(blob);
			var video = document.createElement('video');
			video.src = url;
			document.body.appendChild(video);
			video.autoplay = true;
			video.onended = function(){
				document.body.removeChild(this);
			}
			var downLoadButton = document.createElement('a');
			downLoadButton.textContent = "保存到本地"
			downLoadButton.href = url;
			downLoadButton.download = url;
			document.body.appendChild(downLoadButton);
		});
	}
	//录制
	 VideoRecoder.prototype.recoder = function(){
		if (this.mediaRecorder.state == "paused") {
			this.mediaRecorder.resume();
		} else{
			this.mediaRecorder.start();
		}
	}
	 //开始
	VideoRecoder.prototype.start = function(){
		if (this.mediaRecorder.state == "recording") {
			return;
		}
		this.mediaRecorder.start();
	}
	//暂停
	VideoRecoder.prototype.pause = function(){
		this.mediaRecorder.pause();
	}
	//停止
	VideoRecoder.prototype.stop = function(){
		this.mediaRecorder.stop();
	}
	//要想实时预览要录制的画面，首先要异步更新到你录制的的视频文件，然后进行解码，通过输出端口输出
	
	window.VideoRecoder = VideoRecoder;
}());
