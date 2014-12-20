/**
@Author : MinKyoungHwan
@description : Get Image file for IE
*/

var colorPicker = $('#color_picker');
colorPicker.append('<object id=\"file-object\"><\/object>');

var Flash = {
  getFileData: function(base64, filename) {
	showResult(base64, filename)
  },
  getButtonLabel: function() {
	return "Load a file";
  }
};

if (typeof FileReader !== "function")
  swfobject.embedSWF("js\/filetodata/FileToDataURI.swf", "file-object", "80px", "23px", "10", "js\/filetodata/swfobject/expressInstall.swf", {}, {}, {});
else {
  $('#file-object').replaceWith('<input type="file" id="file-object" value="파일업로드" />');
  $('#file-object').on('change', function(e) {
	var files = e.target.files,file;

	if (!files || files.length == 0) return;
	file = files[0];

	var fileReader = new FileReader();
	fileReader.onload = function (e) {
	  showResult(e.target.result.split(",")[1], file.name);
	};
	fileReader.readAsDataURL(file);
  });
}

var showResult = function(b,filename) {
  var fileType = filename.substr(filename.length - 3, 3);
  $('#color_picker').append($('<img id=\'data-image\' style=\'visibility:hidden\' />'));
  $('#data-image').attr("src", "data:image/" + fileType + ";base64," + b);
  setCanvas();
};

var setCanvas = function(){
	var imageObj = document.getElementById("data-image");
	var canvas = document.getElementById("image_canvas");
	canvas.height  = imageObj.height * (canvas.width/imageObj.width);
	canvas.getContext('2d').drawImage(imageObj, 0, 0, canvas.width, imageObj.height * (canvas.width/imageObj.width));
	$('#data-image').remove();
	canv_height = $('#image_canvas').height();
	_onColorSelect();
};

var _onCanvasMousemove = function(){
	var pixelData = canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
	$('#output').html('R: ' + pixelData[0] + '<br>G: ' + pixelData[1] + '<br>B: ' + pixelData[2] + '<br>A: ' + pixelData[3]);
}