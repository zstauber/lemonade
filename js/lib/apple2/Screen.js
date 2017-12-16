/*******************************************************************************
 * Copyright (c) 2017 Zachary L. Stauber
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 ******************************************************************************/

define(
	['apple2/Color'],
	function(Color) {
		return function(divScreen) {
			var self;
			var svgns = 'http://www.w3.org/2000/svg';
			var debug = false;

			function Screen(divScreen) {
				// references
				self = this;

				this.screen = divScreen;
				this.screen.setAttribute('class', 'apple2');

				this.text = document.createElement('div'); 
				this.text.setAttribute('tabIndex', '1');
				this.text.setAttribute('class', 'apple2');
				this.text.classList.add('text');
				this.screen.appendChild(this.text);

				// main screen
				this.scaleFactor = 1;

				// TEXT visuals
				this.baseHeight = 192;
				this.baseWidth = 280;
				this.baseFontSize = 8;
				this.baseLineHeight = 8;
				this.baseLetterWidth = 7;
				this.baseLetterHeight = 8;
				this.mode = "TEXT";

				// data
				this.cursor = [0,0];
				this.topMargin = 0;
				this.textSize = [40,24];
				this.textContent = [];
				this.clear();

				// gr
				this.gr = document.createElementNS(svgns, 'svg');
				this.gr.setAttribute('viewBox', '0 0 40 40');
				this.gr.setAttribute('preserveAspectRatio', 'none');
				this.gr.setAttribute('class', 'apple2');
				this.gr.classList.add('gr');
				this.gr.style.position = 'relative';
				this.gr.style.visibility = 'hidden';
				this.screen.appendChild(this.gr);

				// GR visuals
				this.loresColor = null;

				window.addEventListener('resize', function() {
					self.resizeScreen();
				});
			}

			Screen.prototype.startup = function() {
				self.resizeScreen();
			};

			Screen.prototype.renderText = function() {
				this.text.innerHTML = '';
				for (var i = 0, j = this.textSize[1]; i < j; i++) {
					// text mode or in the text portion of the screen
					if (this.mode === 'TEXT' || i > 19) {
						this.text.innerHTML += this.textContent[i] + '<br>';
					} else {
						this.text.innerHTML += '<br>';
					}
				}
			};

			Screen.prototype.setScale = function() {
				// get browser window size
				var ih = window.innerHeight;
				var iw = window.innerWidth;

				// Apple //e screens were 280 by 192 pixels, so that is our minimum
				var hScale = iw / 280.0;
				var vScale = ih / 192.0;

				if (hScale > 1 && vScale > 1) {
					this.scaleFactor = hScale < vScale ? parseInt(hScale) : parseInt(vScale);
				}
			}

			Screen.prototype.resizeScreen = function() {
				this.setScale();
				// first the screen resize
				this.screen.style.width = String(this.baseWidth * this.scaleFactor) + 'px';
				this.screen.style.height = String(this.baseHeight * this.scaleFactor) + 'px';
				// then the text font itself, height and width are scaled with the screen
				this.text.style.fontSize = String(this.baseFontSize * this.scaleFactor) + 'px';
				this.text.style.lineHeight = String(this.baseLineHeight * this.scaleFactor) + 'px';

				// then any input boxes
				if (this.text.childNodes !== undefined) {
					for (var i = 0, j = this.text.childNodes.length; i < j; i++) {
						var child = this.text.childNodes[i];
						if (child.tagName === 'INPUT') {
							this.resizeInput(child);
						}
					}	
				}
				// then the graphics screen, width get scaled with the screen, just need height
				this.gr.style.height = String(this.baseLineHeight * this.scaleFactor *
						(this.textSize[1] - 4)) + 'px';
				this.gr.style.left = '0px';
				this.gr.style.top = '0px';
			};

			Screen.prototype.setMode = function(mode) {
				if (mode.toUpperCase() === 'TEXT') {
					this.mode = 'TEXT';
					this.clear();
					this.topMargin = 0;

					this.gr.style.visibility = 'hidden';
					this.deleteGraphics();
				} else if (mode.toUpperCase() === 'GR') {
					this.mode = 'GR';
					this.clear();
					this.topMargin = this.textSize[1] - 4;

					this.deleteGraphics();
					this.gr.style.visibility = 'visible';
					this.color(0);
				}
			};
			Screen.prototype.home = function() {
				this.cursor = [0,this.topMargin];
				this.clear();
				this.renderText();
			};
			Screen.prototype.htab = function(x) {
				// htab moves left or right on the current row
				this.cursor[0] = x - 1;
			};
			Screen.prototype.vtab = function(y) {
				// vtab goes up or down in the current column
				this.cursor[1] = y - 1;
			};
			Screen.prototype.poke34 = function(line) {
				if (line === 'PEEK(37)') {
					this.topMargin = this.cursor[1];
				} else {
					this.topMargin = parseInt(line) + 1;
				}
				if (debug) console.log('topMargin has been set to ' + this.topMargin);
			};
			Screen.prototype.clear = function() {
				// fill the textContent 2D array with spaces
				this.textContent.length = this.topMargin;
				for (var i = this.topMargin, j = this.textSize[1]; i < j; i++) {
					this.addRow();
				}
			};
			Screen.prototype.addRow = function() {
				var row = '';
				for (var i = 0, j = this.textSize[0]; i < j; i++) {
					row += ' ';
				}
				this.textContent.push(row);
			}
			Screen.prototype.print = function(string, cr) {
				// cr is true by default.  If the original Apple ][ uses a ; after the
				// PRINT statement, then pass in a false as a second parameter,
				// otherwise it can be left out
				if (this.mode === 'TEXT' || this.cursor[1] > 19) {
					this.displayText(string, "PRINT", cr);
				} else if (this.mode === 'GR') {
					this.displayGr(string, cr);
				}
			}
			Screen.prototype.input = function(arg1, arg2, arg3) {
				// Accepts two types of input, similar to the Apple ][ version
				// input("STRING", [VAR1, VAR2, ... VARn]);
				// Or simply
				// input([VAR1, VAR2, ... VARn]);
				// The second version displays a question mark and accepts input
				// If there is more than one input, the values must be separated by
				// commas or carriageReturns.  String values can be blank, but numeric
				// cannot.  If a valid numeric value is not entered for any variable,
				// the Apple ][ displays ?REENTER and then the INPUT string again, which
				// will be just a question mark if there was none.  If multiple values
				// are asked for, and a user enters fewer than the total, but they are
				// valid, the Apple ][ will display ?? and wait for more input directly
				// afterwards.
				var string, callback;
				//var vars = [];
				if (arg1 === undefined) {
					return;
				}
				if (Array.isArray(arg1) && typeof arg2 === 'function' && arg3 === undefined) {
					string = '?';
					callback = arg2;
					/*for (var i = 0; i < arg1.length; i++){
						vars.push(undefined);
					}*/
				} else if (typeof arg1 === 'string' && Array.isArray(arg2) && typeof arg3 === 'function') {
					string = arg1;
					callback = arg3;
					/*for (var i = 0; i < arg2.length; i++){
						vars.push(undefined);
					}*/
				} else {
					return;
				}	
				this.displayText(string, 'INPUT');
				// now the input text box
				if (debug) console.log('input');
				this.addInput(callback);
			};
			Screen.prototype.addInput = function(callback) {
				var input = document.createElement('input');
				this.text.appendChild(input);
				input.setAttribute('class', 'apple2');
				input.classList.add('input');
				input.spacesIndent = this.cursor[0];
				input.spacesLeft = this.textSize[0] - this.cursor[0];
				input.maxLength = input.spacesLeft;
				this.resizeInput(input);
				input.onkeyup = function(e) {
					e.preventDefault();
					//self.cursor[0] = 0;
					if (e.keyCode === 13) {
						// delete this input
						var value = this.value.toUpperCase();
						self.deleteInputs();
						// echo what the user entered to screen as input goes away
						self.displayText(value, 'INPUT');
						self.carriageReturn();
						callback(value);
					}
				};
				input.focus();
			};
			Screen.prototype.resizeInput = function(element) {
				element.style.fontSize = this.text.style.fontSize;
				element.style.lineHeight = this.text.style.lineHeight;
				element.style.height = this.text.style.lineHeight;
				element.style.width = this.baseLetterWidth * this.scaleFactor *
					element.spacesLeft + 'px';
				element.style.left = element.spacesIndent * this.baseLetterWidth *
					this.scaleFactor + 'px';
				element.style.top = this.cursor[1] * this.baseLetterHeight *
					this.scaleFactor + 'px';
			};
			Screen.prototype.deleteInputs = function() {
				// delete all inputs
				var inputs = document.getElementsByTagName('input');
				for (var i = 0, j = inputs.length; i < j; i++) {
					var input = inputs[i];
					input.onkeyup = null;
					self.text.removeChild(input);
					delete input;
				}
			};
			Screen.prototype.deleteGraphics = function() {
				// deletes everything in the SVG element
				var graphics = self.gr.children.length;
				for (var i = 0, j = self.gr.length; i < j; i++) {
					var graphic = self.gr.children[i];
					self.gr.removeChild(graphic);
					delete graphic;
				}
				self.graphicsContent = null;
			};
			Screen.prototype.get = function(callback) {
				if (debug) console.log('get');
				var div = this.text;
				this.text.onkeydown = function(e) {
					e.preventDefault();
					div.onkeydown = null;
					callback(e.key);
				};
				this.text.focus();
			};
			Screen.prototype.displayText = function(string, statement, cr) {
				// this function is used by both print() and input()
				// print() will just print stuff and stop
				// input() will get the return value of where the input cursor ends up
				if (string !== undefined) {
					do {
						// chunk of string to write out can be a maximum of line length
						// minus current cursor column (usually 40)
						var spliceLength = this.textSize[0] - this.cursor[0];
						// if our string is less than that, we just write out the length of
						// our string, otherwise we go all the way to to the EOL
						spliceLength = string.length < spliceLength ? string.length : spliceLength;
						var line = this.textContent[this.cursor[1]];
						line = line.substring(0, this.cursor[0]) +
						  string.substring(0, spliceLength) +
							line.substring(this.cursor[0] + spliceLength, this.textSize[0]);
						this.textContent[this.cursor[1]] = line;
						// now snip off those characters from the string
						string = string.substring(spliceLength, string.length);
						if (this.cursor[0] + spliceLength === 40) {
							this.carriageReturn();
						}
					} while (string.length > 0);
					if (statement === 'PRINT') {
						// printing text always concludes with a CR, unless we're at line 24
						if (cr === undefined || cr === true) {
							this.carriageReturn();
						} else if (cr !== undefined && cr === false) {
							// do not carrageReturn, only update x
							this.cursor[0] += spliceLength;
							this.renderText();
						}
						this.renderText();
					} else if (statement === 'INPUT') {
						// inputting text does not have a CR, and allows text entry at the
						// current cursor location
						this.renderText();
						this.cursor[0] += spliceLength;
					}
				} else {
					// we were passed a print statement with no input, just advance a line
					if (statement === 'PRINT') {
						this.carriageReturn();
						this.renderText();
					}
				}
			};
			Screen.prototype.carriageReturn = function() {
				if (this.cursor[1] < this.textSize[1] - 1) {
					// if we're not at the bottom of the screen yet
					this.cursor[1] += 1; // down
					this.cursor[0] = 0; // left
				} else {
					// if we are
					this.scroll();
				}
			};
			Screen.prototype.scroll = function() {
				// delete the first row
				this.textContent.splice(this.topMargin,1);
				// add a blank row to the end
				this.addRow();
				//this.cursor = [0, this.textSize[1] - 1];
				this.cursor[0] = 0; // we're already at the bottom
			};
			Screen.prototype.displayGr = function(string, cr) {
				for (var i = 0, j = string.length; i < j; i++) {
					this.color(string.charCodeAt(i));
					this.plot(this.cursor[0], this.cursor[1] * 2);
					this.plot(this.cursor[0], this.cursor[1] * 2 + 1);
					this.cursor[0] += 1;
				}
				if (string.length > 39) {
					this.carriageReturn();
				}
				if (cr === undefined || cr === true) {
					this.carriageReturn();
				}
			};
			Screen.prototype.call936 = function() {
				this.home();
			};
			Screen.prototype.call958 = function() {
				// This function emulates the CALL -958 command, which deletes from
				// current cursor location to the bottom of the screen
				// The cursor location is not updated so you may resume printing
				// right from where the call started clearing.

				// first blank out rest of current line
				var line = this.textContent[this.cursor[1]];
				line = line.substring(0, this.cursor[0]);
				var rowEnd = '';
				for (var i = this.cursor[0], j = this.textSize[0]; i < j; i++) {
					rowEnd += ' ';
				}
				line += rowEnd;
				this.textContent[this.cursor[1]] = line;
				// now blank out entire lines until the end of the screen
				var row = '';
				for (var k = 0, l = this.textSize[0]; k < l; k++) {
					row += ' ';
				}
				for (var m = this.cursor[1] + 1, n = this.textSize[1]; m < n; m++) {
					this.textContent[m] = row;
				}
				this.renderText();
			};

			// graphics mode commands
			Screen.prototype.color = function(color) {
				if (color < 0) {
					if (debug) console.log('?ILLEGAL QUANTITY ERROR');
				}
				// any colors over 15 will be wrapped around to 0 again
				// COLOR=16 is COLOR=0, COLOR=17 is COLOR=1, etc.
				this.loresColor = String(color % 16);
			};
			Screen.prototype.plot = function(x, y) {
				if (x < 0 || y < 0 || x > 39 || y > 39) {
					if (debug) console.log('?ILLEGAL QUANTITY ERROR');
				}

				// Let's loop through and delete any previous rect in this spot first
				for (var i = 0, j = this.gr.children.length; i < j; i++) {
					var gr = this.gr.children[i];
					if (gr.getAttribute('x') === String(x) && gr.getAttribute('y') === String(y)) {
						this.gr.removeChild(gr);
						delete gr;
						break;
					}
				}

				// HTML5 SVG would be
				// <rect x="{x}" y="{y}" width="1" height="1" style="fill:{color};" />
				var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
				rect.setAttribute('x', String(x));
				rect.setAttribute('y', String(y));
				rect.setAttribute('width', '1');
				rect.setAttribute('height', '1');
				rect.style.fill = Color[String(this.loresColor)];
				this.gr.appendChild(rect);
			};
			Screen.prototype.hlin = function(x1, x2, y) {
				if (x1 < 0 || x2 < 0 || y < 0 || x1 > 39 || x2 > 39 || y > 39) {
					if (debug) console.log('?ILLEGAL QUANTITY ERROR');
				}
				// HTML5 SVG would be
				// <rect x="{x1}" y="{y}" width="{x2 - x1 + 1}" height="1" style="fill:{color};" />
				for (var i = x1; i <= x2; i++) {
					var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
					rect.setAttribute('x', String(i));
					rect.setAttribute('y', String(y));
					rect.setAttribute('width', '1');
					rect.setAttribute('height', '1');
					rect.style.fill = Color[String(this.loresColor)];
					this.gr.appendChild(rect);
				}
			};
			Screen.prototype.vlin = function(y1, y2, x) {
				if (y1 < 0 || y2 < 0 || x < 0 || y1 > 39 || y2 > 39 || x > 39) {
					if (debug) console.log('?ILLEGAL QUANTITY ERROR');
				}
				// HTML5 SVG would be
				// <rect x="{x}" y="{y1}" width="1" height="{y2 - y1 + 1}" style="fill:{color};" />
				for (var i = y1; i <= y2; i++) {
					var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
					rect.setAttribute('x', String(x));
					rect.setAttribute('y', String(i));
					rect.setAttribute('width', '1');
					rect.setAttribute('height', '1');
					rect.style.fill = Color[String(this.loresColor)];
					this.gr.appendChild(rect);
				}
			};

			return new Screen(divScreen);
		};
	}
);
