/*
 * 
 * from from http://www.splashnology.com/article/pixel-distortions-with-bilinear-filtration-in-html5-canvas/4739/ 
 * from from http://jsfiddle.net/UF4PK/
 * modify by ggoiya@gmail.com
 * definition : Distortion 모음
 * date : 2012. 08. 31
 */
Ext.define('photoR.lib.DistortionUtil', {
	statics : {
		mapper : function(width, height, filter) {
			var map = [];
			this.flower = function(px, py) {
				var x = px - width / 2;
				var y = py - height / 2;
				var r = Math.sqrt(x * x + y * y);
				var maxr = width / 2;
				var a = Math.atan2(y, x);
				var d = r * Math.sin(a * 7);
				// if (d>0) return {'x':px,'y':py}
				return {
					'x' : px + Math.cos(a) * d * 0.4,
					'y' : py + Math.sin(a) * d * 0.4
				};
			};
			this.pyramid = function(px, py) {
				px = px - height / 2;
				py = py - height / 2;
				var distance = Math.max(Math.abs(px), Math.abs(py));
				px *= distance / width * 2;
				py *= distance / height * 2;
				return {
					'x' : px + width / 2,
					'y' : py + height / 2
				};
			};
			this.zoom = function(px, py) {
				return {
					'x' : (px + width / 2) * 0.5,
					'y' : (py + height / 2) * 0.5
				};
			};
			this.reflect = function(px, py) {
				if (py < height / 2)
					return {
						'x' : px,
						'y' : py
					};
				var dx = (py - height / 2) * (-px + width / 2) / width;
				return {
					'x' : px + dx,
					'y' : height - py
				};
			};
			this.twirl = function(px, py) {
				var x = px - width / 2;
				var y = py - height / 2;
				var r = Math.sqrt(x * x + y * y);
				var maxr = width / 2;
				if (r > maxr)
					return {
						'x' : px,
						'y' : py
					};
				var a = Math.atan2(y, x);
				a += 1 - r / maxr;
				var dx = Math.cos(a) * r;
				var dy = Math.sin(a) * r;
				return {
					'x' : dx + width / 2,
					'y' : dy + height / 2
				};
			};
			this.spherize = function(px, py) {
				var x = px - width / 2;
				var y = py - height / 2;
				var r = Math.sqrt(x * x + y * y);
				var maxr = width / 2;
				if (r > maxr)
					return {
						'x' : px,
						'y' : py
					};
				var a = Math.atan2(y, x);
				var k = (r / maxr) * (r / maxr) * 0.5 + 0.5;
				var dx = Math.cos(a) * r * k;
				var dy = Math.sin(a) * r * k;
				return {
					'x' : dx + width / 2,
					'y' : dy + height / 2
				};
			};
			this.exec = function(bitmap, texture) {
				var height = bitmap.height;
				var width = bitmap.width;
				var colorat = function(x, y, channel) {
					return texture.data[(x + y * height) * 4 + channel];
				};
				for ( var j = 0; j < height; j++) {
					for ( var i = 0; i < width; i++) {
						var u = map[(i + j * height) * 2];
						var v = map[(i + j * height) * 2 + 1];
						var x = Math.floor(u);
						var y = Math.floor(v);
						var kx = u - x;
						var ky = v - y;
						for ( var c = 0; c < 4; c++) {
							bitmap.data[(i + j * height) * 4 + c] = (colorat(x,
									y, c)
									* (1 - kx) + colorat(x + 1, y, c) * kx)
									* (1 - ky)
									+ (colorat(x, y + 1, c) * (1 - kx) + colorat(
											x + 1, y + 1, c)
											* kx) * (ky);
						}
					}
				}
			};
			this.setTranslate = function(translator) {
				if (typeof translator === 'string')
					translator = this[translator];
				for ( var y = 0; y < height; y++) {
					for ( var x = 0; x < width; x++) {
						var t = translator(x, y);
						map[(x + y * height) * 2 + 0] = Math.max(Math.min(t.x,
								width - 1), 0);
						map[(x + y * height) * 2 + 1] = Math.max(Math.min(t.y,
								height - 1), 0);
					}
				}
			};
			this.setTranslate(filter);
		}
	}
});