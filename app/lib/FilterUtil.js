/*
 * from http://www.html5rocks.com/en/tutorials/canvas/imagefilters/
 * from http://lodev.org/cgtutor/filtering.html
 * modify by ggoiya@gmail.com
 * definition : Filter 모음
 * date : 2012. 08. 30
 */
Ext.define('photoR.lib.FilterUtil', {
	statics : {
		filterImage : function(filter, pixels, var_args) {
			var args = [ pixels ];
			for ( var i = 2; i < arguments.length; i++) {
				args.push(arguments[i]);
			}
			return this[filter].apply(this, args);
		},
		grayscale : function(pixels, args) {
			var d = pixels.data;
			for ( var i = 0; i < d.length; i += 4) {
				var r = d[i + 0];
				var g = d[i + 1];
				var b = d[i + 2];
				// CIE luminance for the RGB
				// The human eye is bad at seeing red and blue, so we de-emphasize
				// them.
				var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
				d[i] = d[i + 1] = d[i + 2] = v;
			}
			return pixels;
		},
		brightness : function(pixels, adjustment) {
			var d = pixels.data;
			for ( var i = 0; i < d.length; i += 4) {
				d[i + 0] += adjustment;
				d[i + 1] += adjustment;
				d[i + 2] += adjustment;
			}
			return pixels;
		},
		threshold : function(pixels, threshold) {
			var d = pixels.data;
			for ( var i = 0; i < d.length; i += 4) {
				var r = d[i + 0];
				var g = d[i + 1];
				var b = d[i + 2];
				var v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= threshold) ? 255
						: 0;
				d[i + 0] = d[i + 1] = d[i + 2] = v;
			}
			return pixels;
		},
		convolute : function(pixels, tmpPixels, filter, factor, bias) {
			var w = pixels.width;
			var h = pixels.height;
			var filterWidth = filterHeight = filter.length;
			var idx;
			for ( var x = 0; x < w; x++) {
				for ( var y = 0; y < h; y++) {
					var r = g = b = 0;
					for ( var filterX = 0; filterX < filterWidth; filterX++) {
						for ( var filterY = 0; filterY < filterHeight; filterY++) {
							var imageX = Math.round((x - filterWidth / 2 + filterX + w) % w);
							var imageY = Math.round((y - filterHeight / 2 + filterY + h) % h);
							idx = (imageX + imageY * w) * 4;
							r += pixels.data[idx + 0] * filter[filterX][filterY];
							g += pixels.data[idx + 1] * filter[filterX][filterY];
							b += pixels.data[idx + 2] * filter[filterX][filterY];
						}
					}
					idx = (x + y * w) * 4;
					tmpPixels.data[idx + 0] = Math.min(Math.max(parseInt(factor * r+ bias, 10), 0), 255);
					tmpPixels.data[idx + 1] = Math.min(Math.max(parseInt(factor * g+ bias, 10), 0), 255);
					tmpPixels.data[idx + 2] = Math.min(Math.max(parseInt(factor * b+ bias, 10), 0), 255);
				}
			}
			return tmpPixels;
		},
		kernelData : {
			softBlur : {
				factor : 1.0, 
				bias : 0.0, 
				kernel : 
				[
				 	[0.0, 0.2,  0.0],
					[0.2, 0.2,  0.2],
					[0.0, 0.2,  0.0]
				]
			},
			blur : {
				factor : 1.0 / 13.0, 
				bias : 0.0, 
				kernel : 
				[
				 	[0, 0, 1, 0, 0],
				 	[0, 1, 1, 1, 0],
				 	[1, 1, 1, 1, 1],
				 	[0, 1, 1, 1, 0],
				 	[0, 0, 1, 0, 0]
				]
			},
			motionBlur : {
				factor : 1.0 / 9.0, 
				bias : 0.0, 
				kernel : 
				[
				 	[1, 0, 0, 0, 0, 0, 0, 0, 0],
				 	[0, 1, 0, 0, 0, 0, 0, 0, 0],
				 	[0, 0, 1, 0, 0, 0, 0, 0, 0],
				 	[0, 0, 0, 1, 0, 0, 0, 0, 0],
				 	[0, 0, 0, 0, 1, 0, 0, 0, 0],
				 	[0, 0, 0, 0, 0, 1, 0, 0, 0],
				 	[0, 0, 0, 0, 0, 0, 1, 0, 0],
				 	[0, 0, 0, 0, 0, 0, 0, 1, 0],
				 	[0, 0, 0, 0, 0, 0, 0, 0, 1]
				]
			},
			edgesHorizontal : {
				factor : 1.0, 
				bias : 0.0, 
				kernel : 
				[
				 	[0,  0,  0,  0,  0],
				 	[0,  0,  0,  0,  0],
				 	[-1, -1,  2,  0,  0],
				 	[0,  0,  0,  0,  0],
				 	[0,  0,  0,  0,  0]
				]
			},
			edgesVertical : {
				factor : 1.0, 
				bias : 0.0, 
				kernel : 
				[
				 	[0,  0, -1,  0,  0],
				 	[0,  0, -1,  0,  0],
				 	[0,  0,  4,  0,  0],
				 	[0,  0, -1,  0,  0],
				 	[0,  0, -1,  0,  0]
				]
			},
			edges : {
				factor : 3.0, 
				bias : 0.0, 
				kernel : 
				[
				 	[-1,  0,  0,  0,  0],
				 	[0, -2,  0,  0,  0],
				 	[0,  0,  6,  0,  0],
				 	[0,  0,  0, -2,  0],
				 	[0,  0,  0,  0, -1]
				]
			},
			edgesSharpen : {
				factor : 1.0, 
				bias : 0.0, 
				kernel : 
				[
				 	[-1, -1, -1],
				 	[-1,  8, -1],
				 	[-1, -1, -1]
				]
			},
			sharpen : {
				factor : 1.0, 
				bias : 0.0, 
				kernel : 
				[
				 	[-1, -1, -1],
				 	[-1,  9, -1],
				 	[-1, -1, -1]
				]
			},
			softSharpen : {
				factor : 1.0 / 8.0, 
				bias : 0.0, 
				kernel : 
				[
				 	[-1, -1, -1, -1, -1],
				 	[-1,  2,  2,  2, -1],
				 	[-1,  2,  8,  2, -1],
				 	[-1,  2,  2,  2, -1],
				 	[-1, -1, -1, -1, -1]
				]
			},
			sharpenEdges : {
				factor : 1.0, 
				bias : 0.0, 
				kernel : 
				[
				 	[1,  1,  1],
				 	[1, -7,  1],
				 	[1,  1,  1]
				]
			},
			emboss : {
				factor : 1.0, 
				bias : 128.0, 
				kernel : 
				[
				 	[-1, -1,  0],
				 	[-1,  0,  1],
				 	[0,  1,  1]
				]
			},
			strongEmboss : {
				factor : 1.0, 
				bias : 128.0, 
				kernel : 
				[
				 	[-1, -1, -1, -1,  0],
				 	[-1, -1, -1,  0,  1],
				 	[-1, -1,  0,  1,  1],
				 	[-1,  0,  1,  1,  1],
				 	[0,  1,  1,  1,  1]
				]
			}	
		}
	}
});