/**
@Author : MinKyoungHwan
@description : Check MSIE Document mode
*/

if(getVersion.isIE9()){
	$('head').append('<script type=\"text\/javascript\" src=\"js\/filetodata\/swfobject\/swfobject.js\"><\/script>');
	$('head').append('<script type=\"text\/javascript\" src=\"js\/fileupload_ie.js\"><\/script>');
}
else{
	$('head').append('<script type=\"text\/javascript\" src=\"js\/fileupload.js\"><\/script>');
}

$('#check_range').hide();

/**
@description : Color picker
*/
var _onColorSelect = function(evt) {
	var canvas = document.getElementById('image_canvas');
	var context = canvas.getContext('2d');

	var canvas2 = document.getElementById('color_canvas');
	var context2 = canvas2.getContext('2d');

	var imageObj = new Image();
	var canv_width = $('#image_canvas').width();
	var canv_offset = $('#image_canvas').offset();
	var range_wid = $('#check_range').width();
	var range_hgt = $('#check_range').height();

	var red=0;
	var green=0;
	var blue=0;

	var r1,g1,b1;
	var r2,g2,b2;
	var r3,g3,b3;
	var avrg_r,avrg_g,avrg_b;

	var imageData;
	var pixelData;

	count = 0;
	counter = 0;

	$( 'body' ).mousemove(function(e) {

		var px = e.pageX;
		var py = e.pageY;
		var myx = px - canv_offset.left;
		var myy = py - canv_offset.top;
		if ((px > canv_offset.left+range_wid) && (px < canv_offset.left+canv_width) && (py > canv_offset.top+range_hgt) && (py < canv_offset.top+canv_height)) {
			$('#check_range').show();

			$('#check_range').css({ left: px-range_wid, top: py-range_hgt });
			imageData = context.getImageData( myx-range_wid, myy-range_hgt, range_wid, range_hgt );
			pixelData = imageData.data;
			var length = imageData.data.length;
			var data_size = length / 4;

			for (var i=0;i<imageData.data.length;i+=4) {


				red = red + imageData.data[i];
				green = green + imageData.data[i+1];
				blue = blue + imageData.data[i+2];
			}

				red = Math.floor (red / data_size);
				green = Math.floor (green / data_size);
				blue = Math.floor (blue / data_size);

			context2.putImageData(imageData, 0, 0);

		//	$('<font class="text_m">'+ red +'</font>').appendTo('#test');
		} else {
			$('#check_range').hide();
		}

	});

	$( "#color_picker" ).click(function( e ) {
		count += 1;

		counter = count - (Math.floor(count/3)*3);

		if(counter == 1) {
			$('#color_selected_1').css({ background:"rgb("+red+","+green+","+blue+")" });
			r1 = red;  g1 = green;  b1 = blue;
		} else if(counter == 2) {
			$('#color_selected_2').css({ background:"rgb("+red+","+green+","+blue+")" });
			r2 = red;  g2 = green;  b2 = blue;
		} else if(counter == 0) {
			$('#color_selected_3').css({ background:"rgb("+red+","+green+","+blue+")" });
			r3 = red;  g3 = green;  b3 = blue;
		}

		avrg_r = Math.floor((r1+r2+r3) / 3);
		avrg_g = Math.floor((g1+g2+g3) / 3);
		avrg_b = Math.floor((b1+b2+b3) / 3);

		$('#color_avrg').css({ background:"rgb("+avrg_r+","+avrg_g+","+avrg_b+")" });

		if(avrg_r>0){
			$( '#color_info' ).empty();
			$('<font class="text_m"> R:'+ avrg_r +' / G:'+ avrg_g +' / B:'+ avrg_b +'</font>').appendTo('#color_info');
		}
	});
}