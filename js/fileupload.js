/**
@Author : MinKyoungHwan
@description : Get Image file
*/

var colorPicker = $('#color_picker');
colorPicker.append('<input type=\"file\" id=\"files\" name=\"files[]\" multiple \/>');

var canvas = document.getElementById('image_canvas');
var context = canvas.getContext('2d');
var canv_width = $('#image_canvas').width();
//var canv_height;
var imageObj = new Image();
var imageObj = new Image();
var _onFileChange = function(evt) {
	var files = evt.target.files;
	var imageData;
	var pixelData;
	for (var i = 0, f; f = files[i]; i++) {
		if (!f.type.match('image.*')) {
			continue;
		}
		var reader = new FileReader();
		reader.onload = (function(theFile) {
			return function(e) {
				imageObj.onload = function() {
					context.drawImage(imageObj, 0, 0, canv_width, imageObj.height * (canv_width/imageObj.width));
				};
				imageObj.src =e.target.result;
				context.canvas.width  = canv_width;
				context.canvas.height  = imageObj.height * (canv_width/imageObj.width);
				canv_height = $('#image_canvas').height();
			};
		})(f);
		reader.readAsDataURL(f);
	}
	_onColorSelect();
}

$('#files').bind("change", _onFileChange);