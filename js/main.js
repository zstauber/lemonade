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

// Require has 3 parts
require(
	{ // 1. an object containing configuration, which loads libraries
		async:true,
		parseOnLoad:true,
		isDebut:true,
		baseUrl:"js/lib",
		waitSconds:30,
		packages: [
			{ name:'requirejs', location: '.', main:'domReady.js'},
			{ name:'apple2', location: 'apple2'}
		]
	},
	[ // 2. an array containing dependencies, which loads specific functions from libraries
		'requirejs/domReady',
		'apple2/Screen'
	],
	function( // 3. a callback function, which must list arguments in the same order as dependencies, above
		domReady,
		Screen
	) {
		var screen, game;
		var debug = false;

		// game object, to hold all our data while we play
		function Game() {
			// generic globals
			this.A$ = ''; // input variable
			this.A = 0; // input variable for number
			this.N$ = ''; // input variable
			this.N = 0; // number of players, from 1 to 30
			this.N1 = 0;
			this.N2 = 0;
			this.C1 = 0;
			this.C5 = 0;
			this.R1 = 0;
			this.C = 0;
			this.D = 0; // current day
			this.E = 0;
			this.L = 0; // unused
			this.H = 0; // unused
			this.I = 0;
			this.J = 0; // chance of light rain
			this.M = 0;
			this.B = 0; // unused
			this.S = 0; // unused
			this.P = 0; // unused
			this.P1 = 0;
			this.G = 0; // unused
			this.R1 = 0;
			this.R2 = 0;
			//this.R3 = 0; // unused variable
			this.SC = 0; // SKY COLOR!
				// SC = 2 SUNNY
				// SC = 7 HOT AND DRY
				// SC = 5 THUNDERSTORMS!
				// SC = 10 A HEAT WAVE IS PREDICTED FOR TODAY! 
			this.STI = 0;
			this.STI$ = '';
			this.V = 0;
			this.W = 0;
			this.X1 = 0;
			this.X2 = 0; // unused
			this.X3 = 0; // unused
			this.X4 = 0;
			this.next_function = undefined;
		}
		Game.prototype.line_5 = function() {
			game.gosub_10000();
		};
		Game.prototype.line_135 = function() {
			// assets for each player
			game.DIMA = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; // player assets
			game.DIML = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; // player glasses to make
			game.DIMH = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			game.DIMB = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			game.DIMS = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; // player signs to make
			game.DIMP = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; // player price to charge
			game.DIMG = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			game.P9 = 10;
			game.S3 = .15;
			game.S2 = 30;
			game.A2 = 2.00; // starting money for each player, $2
			game.C9 = .5;
			game.C2 = 1;
			game.gosub_12000();
		};
		Game.prototype.after_310 = function() {
			if (debug) console.log('after_310 called');
			// initialize variables based on number of players
			for (var i = 0, j = this.N; i < j; i++) {
				game.DIMB[i] = 0;
				game.DIMA[i] = this.A2;
			}
		};
		Game.prototype.line_400 = function() {
			if (debug) console.log('line_400 called');
			game.SC = Math.random();
			// testing purposes only!  remove following line when done!
			//game.SC = 0.6;
			if (game.SC < .4) {
				game.SC = 2;
				game.line_460();
			} else if (game.SC < .7) {
				game.SC = 10;
				game.line_460();
			} else {
				game.SC = 7;
				game.line_460();
			}
		};
		Game.prototype.line_460 = function() {
			if (debug) console.log('line_460 called');
			// REM  IF D<3 THEN SC=2
			game.next_function = game.line_490;
			game.gosub_15000();
		};
		Game.prototype.line_490 = function() {
			if (debug) console.log('line_490 called');
			game.next_function = null;
			screen.setMode('TEXT');
			screen.home();
			// REM   START OF NEW DAY
			game.D += 1;
			screen.print('ON DAY ' + game.D + ', THE COST OF LEMONADE IS ', false);
			game.C = 2;
			if (game.D > 2) {
				game.C = 4;
			} else if (game.D > 6) {
				game.C = 5;
			}
			screen.print('$.0' + game.C);
			screen.print();
			game.C1 = game.C * 0.01;
			game.R1 = 1;
			// REM   CURRENT EVENTS
			if (game.D === 3) {
				screen.print('(YOUR MOTHER QUIT GIVING YOU FREE SUGAR)');
			} else if (game.D === 7) {
				screen.print('(THE PRICE OF LEMONADE MIX JUST WENT UP)');
			}
			game.I = 0; // since looping is so different, maybe this goes here.
			// REM   AFTER 2 DAYS THINGS CAN HAPPEN
			if (game.D > 2) {
				game.line_2000();
			} else {
				game.line_805();
			}
		};
		Game.prototype.line_805 = function() {
			if (debug) console.log('line_805 called');
			// REM   INPUT VALUES
			screen.print();
			screen.poke34('PEEK(37)');
			// POKE 34, PEEK(37) this sets the top margin of the screen at this point,
			// so that when HOME is called on line 1100, it only clears the screen
			// below here, preserving the dailies for each player.  This is cleared
			// by a new TEXT command.
			game.line_810();
		};
		Game.prototype.line_810 = function() {
			if (debug) console.log('line_810 called');
			if (game.I < game.N) {
				if (debug) console.log('player: ' + (game.I + 1));
				game.DIMA[game.I] += .000000001;
				game.DIMG[game.I] = 1;
				game.DIMH[game.I] = 0;
				game.STI = game.DIMA[game.I];
				game.gosub_4000();
				game.after_850();
			} else {
				// done with player loop, move on
				game.line_1110();
			}
		};
		Game.prototype.after_850 = function() {
			if (debug) console.log('after_850 called');
			game.next_function = null;
			screen.print('LEMONADE STAND ' + (game.I + 1), false);
			screen.htab(26);
			screen.print('ASSETS ' + game.STI$);
			screen.print();
			if (game.DIMB[game.I] === 0) {
				game.line_890();
			} else {
				screen.print('YOU ARE BANKRUPT, NO DECISIONS');
				screen.print('FOR YOU TO MAKE.');
				if (game.N === 1 && game.DIMA[game.I] < game.C) {
					game.line_31111();
				} else {
					game.line_1050();
				}
			}
		};
		Game.prototype.line_890 = function() {
			if (debug) console.log('line_890 called');
			screen.print('HOW MANY GLASSES OF LEMONADE DO YOU');
			screen.print('WISH TO MAKE ', false);
			screen.input(['number'], this.line_901);
		};
		Game.prototype.line_901 = function(answer) {
			if (debug) console.log('line_901 called');
			game.DIML[game.I] = parseFloat(answer);
			if (game.DIML[game.I] < 0 || game.DIML[game.I] > 1000) {
				game.line_903();
			} else {
				game.line_906();
			}
		};
		Game.prototype.line_903 = function() {
			if (debug) console.log('line_903 called');
			screen.print('COME ON, LET\'S BE REASONABLE NOW!!!');
			screen.print('TRY AGAIN');
			game.line_890();
		};
		Game.prototype.line_906 = function() {
			if (debug) console.log('line_906 called');
			if (!Number.isInteger(game.DIML[game.I])) {
				game.line_903();
			}
			if (game.DIML[game.I] * game.C1 < game.DIMA[game.I]) {
				game.line_950();
			} else {
				screen.print('THINK AGAIN!!!  YOU HAVE ONLY ' + game.STI$);
				screen.print('IN CASH AND TO MAKE ' + game.DIML[game.I] + ' GLASSES OF');
				screen.print('LEMONADE YOU NEED $' + (game.DIML[game.I] * game.C1) + ' IN CASH.');
				game.line_890();
			}
		};
		Game.prototype.line_950 = function() {
			if (debug) console.log('line_950 called');
			screen.print();
			screen.print('HOW MANY ADVERTISING SIGNS (' + (game.S3 * 100) + ' CENTS');
			screen.print('EACH) DO YOU WANT TO MAKE ', false);
			screen.input(['number'], this.line_961);
		};
		Game.prototype.line_961 = function(answer) {
			if (debug) console.log('line_961 called');
			game.DIMS[game.I] = parseFloat(answer);
			if (game.DIMS[game.I] < 0 || game.DIMS[game.I] > 50) {
				game.line_963();
			} else {
				game.line_965();
			}
		};
		Game.prototype.line_963 = function() {
			if (debug) console.log('line_963 called');
			screen.print('COME ON, BE REASONABLE!!! TRY AGAIN.');
			game.line_950();
		};
		Game.prototype.line_965 = function() {
			if (debug) console.log('line_965 called');
			if (!Number.isInteger(game.DIMS[game.I])) {
				game.line_963();
			}
			if (game.DIMS[game.I] * game.S3 <= game.DIMA[game.I] - game.DIML[game.I] * game.C1) {
				game.line_1010();
			} else {
				screen.print();
				game.STI = game.DIMA[game.I] - game.DIML[game.I] * game.C1;
				game.gosub_4000();
				game.line_985();
			}
		};
		Game.prototype.line_985 = function() {
			game.next_function = null;
			if (debug) console.log('line_985 called');
			screen.print('THINK AGAIN, YOU HAVE ONLY ' + game.STI$);
			screen.print('IN CASH LEFT AFTER MAKING YOUR LEMONADE.');
			game.line_950();
		};
		Game.prototype.line_1010 = function() {
			if (debug) console.log('line_1010 called');
			screen.print();
			screen.print('WHAT PRICE (IN CENTS) DO YOU WISH TO');
			screen.print('CHARGE FOR LEMONADE ', false);
			screen.input(['number'], this.line_1020);
		};
		Game.prototype.line_1020 = function(answer) {
			if (debug) console.log('line_1020 called');
			game.DIMP[game.I] = parseFloat(answer);
			if (game.DIMP[game.I] < 0 || game.DIMP[game.I] > 100) {
				game.line_1022();
			} else {
				game.line_1024();
			}
		};
		Game.prototype.line_1022 = function() {
			if (debug) console.log('line_1022 called');
			screen.print('COME ON, BE REASONABLE!!! TRY AGAIN.');
			game.line_1010();
		};
		Game.prototype.line_1024 = function() {
			if (debug) console.log('line_1024 called');
			if (!Number.isInteger(game.DIMP[game.I])) {
				game.line_1022();
			}
			if (game.C5 === 1) {
				game.line_1050();
			} else {
				// the original game appears to route us to 1050 whether or not C5 is 1
				game.line_1050();
			}
		};
		Game.prototype.line_1050 = function() {
			if (debug) console.log('line_1050 called');
			screen.vtab(23);
			screen.input('WOULD YOU LIKE TO CHANGE ANYTHING?', ['string'], this.line_1060);
		};
		Game.prototype.line_1060 = function(answer) {
			if (debug) console.log('line_1060 called');
			game.A$ = answer.charAt(0);
			if (game.A$ === 'Y' || game.A$ === 'y') {
				screen.home();
				game.C5 = 1;
				game.line_810();
			} else {
				game.line_1100();
			}
		};
		Game.prototype.line_1100 = function() {
			if (debug) console.log('line_1100 called');
			screen.home();
			game.I += 1;
			game.line_810();
		};
		Game.prototype.line_1110 = function() {
			if (debug) console.log('line_1110 called');
			game.C5 = 0;
			screen.setMode('TEXT');	
			screen.home();
			screen.print();
			// this is where a thunderstorm happens, if SC === 10, 1 in 4 chance
			// testing purposes only!  remove following line and uncomment the next when done!
			//if (game.SC === 10) {
			if (game.SC === 10 && Math.random() < 0.25) {
				game.line_2300();
			} else {
				screen.print('$$ LEMONSVILLE DAILY FINANCIAL REPORT $$');
				screen.print();
				// bunch of POKE & CALL stuff, I'm assuming "We're in the money!"
				// REM   CALCULATE PROFITS
				if (game.R2 === 2) {
					game.line_2290();
				} else if (game.R3 === 3) { // I don't think R3 is ever used in the original
					//game.line_2350(); // this place wouldn't make sense to jump to
				} else {
					game.line_1185();
				}
			}
		};
		Game.prototype.line_1185 = function() {
			if (debug) console.log('line_1185 called');
			game.I = 0;
			game.line_1186();
		};
		Game.prototype.line_1186 = function() {
			if (debug) console.log('line_1186 called');
			if (game.I < game.N) {
				if (game.DIMA[game.I] < 0) {
					game.DIMA[game.I] = 0;
				}
				if (game.R2 === 2) {
					game.line_1260();
				} else if (game.DIMP[game.I] > game.P9 ) {
					game.line_1220();
				} else {
					game.N1 = (game.P9 - game.DIMP[game.I]) / game.P9 * .8 * game.S2 + game.S2;
					game.line_1230();
				}
			} else {
				game.line_1395();
			}
		};
		Game.prototype.line_1220 = function() {
			if (debug) console.log('line_1220 called');
			game.N1 = (Math.pow(game.P9, 2) * game.S2 / Math.pow(game.DIMP[game.I], 2));
			game.line_1230();
		};
		Game.prototype.line_1230 = function() {
			if (debug) console.log('line_1230 called');
			game.W = -game.DIMS[game.I] * game.C9;
			game.V = 1 - Math.exp(game.W) * game.C2;
			game.N2 = game.R1 * (game.N1 + (game.N1 * game.V));
			game.N2 = Math.trunc(game.N2 * game.DIMG[game.I]);
			if (game.N2 < game.DIML[game.I]) {
				game.line_1270();
			} else {
				game.line_1260();
			}
		};
		Game.prototype.line_1260 = function() {
			if (debug) console.log('line_1260 called');
			game.N2 = game.DIML[game.I];
			game.line_1270();
		};
		Game.prototype.line_1270 = function() {
			if (debug) console.log('line_1270 called');
			game.M = game.N2 * game.DIMP[game.I] * .01;
			game.E = game.DIMS[game.I] * game.S3 + game.DIML[game.I] * game.C1;
			game.P1 = game.M - game.E;
			game.DIMA[game.I] += game.P1;
			if (game.DIMH[game.I] === 1) {
				game.line_2300();
			} else {
				game.line_1320();
			}
		};
		Game.prototype.line_1320 = function() {
			if (debug) console.log('line_1320 called');
			screen.print();
			if (game.DIMB[game.I] !== 1) {
				game.line_1330();
			} else {
				screen.print('STAND ' + game.I, false);
				screen.print(' BANKRUPT');
				game.next_function = game.line_1390;
				this.gosub_18000();
			}
		};
		Game.prototype.line_1330 = function() {
			if (debug) console.log('line_1330 called');
			game.gosub_5000();
		};
		Game.prototype.line_1350 = function() {
			if (debug) console.log('line_1350 called');
			if (game.DIMA[game.I] > game.C / 100.0) {
				game.line_1390();
			} else {
				game.line_1360();
			}
		};
		Game.prototype.line_1360 = function() {
			if (debug) console.log('line_1360 called');
			screen.print('STAND ' + game.I);
			screen.home();
			screen.print('  ...YOU DON\'T HAVE ENOUGH MONEY LEFT');
			screen.print(' TO STAY IN BUSINESS YOU\'RE BANKRUPT!');
			game.DIMB[game.I] = 1;
			game.next_function = game.after_1382();
			this.gosub_18000();
		};
		Game.prototype.after_1382 = function() {
			if (debug) console.log('after_1382 called');
			game.next_function = null;
			screen.home();
			if (game.N === 1 && game.DIMB[game.I] === 1) {
				game.line_31111();
			} else {
				game.line_1390();
			}
		};
		Game.prototype.line_1390 = function() {
			if (debug) console.log('line_1390 called');
			game.next_function = null;
			game.I += 1;
			game.line_1186();
		};
		Game.prototype.line_1395 = function() {
			if (debug) console.log('line_1395 called');
			// after the day loop, pick up here again
			game.R1 = 1;
			game.R2 = 0;
			game.line_400();
		};
		Game.prototype.line_2000 = function() {
			if (debug) console.log('line_2000 called');
			// REM   RANDOM EVENTS
			if (game.SC === 10) {
				game.line_2110();
			} else if (game.SC === 7) {
				game.line_2410();
			} else if (Math.random() < .25) {
				game.line_2210();
			} else {
				game.line_805();
			}
		};
		Game.prototype.line_2100 = function() {
			// unreachable code, I believe
			if (game.X1 === 1) {
				game.line_805();
			}
		};
		Game.prototype.line_2110 = function() {
			if (debug) console.log('line_2110 called');
			game.J = 30 + Math.trunc(Math.random() * 5) * 10;
			screen.print('THERE IS A ' + game.J + '% CHANCE OF LIGHT RAIN,');
			screen.print('AND THE WEATHER IS COOLER TODAY.');
			game.R1 = 1 - game.J / 100.0;
			game.X1 = 1;
			game.line_805();
		};
		Game.prototype.line_2200 = function() {
			// also unreachable, I think
			if (game.X1 === 1) {
				game.line_805();
			}
		};
		Game.prototype.line_2210 = function() {
			if (debug) console.log('line_2210 called');
			console.log('STREET DEPARTMENT!');
			screen.print('THE STREET DEPARTMENT IS WORKING TODAY.');
			screen.print('THERE WILL BE NO TRAFFIC ON YOUR STREET.');
			if (Math.random() < .5) { // original actually seeds RND with -1 but I think this is mostly the same as a positive argument
				game.line_2233();
			} else {
				game.R2 = 2;
				game.line_2250();
			}
		};
		Game.prototype.line_2233 = function() {
			if (debug) console.log('line_2233 called');
			game.R1 = .1;
			game.line_2250();
		};
		Game.prototype.line_2250 = function() {
			if (debug) console.log('line_2250 called');
			game.X1 = 1;
			game.line_805();
		};
		Game.prototype.line_2290 = function() {
			if (debug) console.log('line_2290 called');
			console.log('STREET CREWS!');
			screen.print('THE STREET CREWS BOUGHT ALL YOUR');
			screen.print('LEMONADE AT LUNCHTIME!!');
			game.line_1185();
		};
		Game.prototype.line_2300 = function() {
			if (debug) console.log('line_2300 called');
			// REM   THUNDERSTORM!
			game.X3 = 1;
			game.R3 = 0; // unused variable
			game.SC = 5;
			game.next_function = game.after_2320;
			game.gosub_15000();
		};
		Game.prototype.after_2320 = function() {
			if (debug) console.log('after_2320 called');
			screen.setMode('TEXT');
			screen.home();
			screen.print('WEATHER REPORT:  A SEVERE THUNDERSTORM');
			screen.print('HIT LEMONSVILLE EARLIER TODAY, JUST AS');
			screen.print('THE LEMONADE STANDS WERE BEING SET UP.');
			screen.print('UNFORTUNATELY, EVERYTHING WAS RUINED!!');
			for (game.J = 0; game.J < game.N; game.J++) {
				game.DIMG[game.J] = 0;
			}
			game.line_1185();
		};
		Game.prototype.line_2400 = function() {
			if (game.X4 === 1) {
				game.line_805();
			} else {
				game.line_2410();
			}
		};
		Game.prototype.line_2410 = function() {
			if (debug) console.log('line_2410 called');
			game.X4 = 1;
			screen.print('A HEAT WAVE IS PREDICTED FOR TODAY!');
			game.R1 = 2;
			game.line_805();
		};
		Game.prototype.gosub_4000 = function() {
			if (debug) console.log('gosub_4000 called');
			// REM   STI => DOLLARS.CENTS
			game.STI = Math.trunc(game.STI * 100 + .5) / 100; 
			game.STI$ = '$' + game.STI;
			if (game.STI == Math.trunc(game.STI)) {
				game.STI$ += '.0';
			}
			if (game.STI == Math.trunc(game.STI * 10 + .5) / 10) {
				game.STI$ += '0';
			}
		};
		Game.prototype.gosub_5000 = function() {
			if (debug) console.log('gosub_5000 called');
			// Lemonsville daily financial report
			screen.vtab(6);
			screen.poke34(5);
			screen.print('   DAY ' + game.D, false);
			screen.htab(30);
			screen.print('STAND ' + (game.I + 1));
			screen.print();
			screen.print();
			screen.print('  ' + game.N2, false);
			screen.htab(7);
			screen.print('GLASSES SOLD');
			screen.print();
			game.STI = game.DIMP[game.I] / 100.0;
			game.gosub_4000();
			screen.print(game.STI$, false);
			screen.htab(7);
			screen.print('PER GLASS', false);
			game.STI = game.M;
			game.gosub_4000();
			screen.htab(27);
			screen.print('INCOME ' + game.STI$, false);
			screen.print();
			screen.print();
			screen.print('  ' + game.DIML[game.I], false);
			screen.htab(7);
			screen.print('GLASSES MADE');
			screen.print();
			game.STI = game.E;
			game.gosub_4000();
			screen.print('  ' + game.DIMS[game.I], false);
			screen.htab(7);
			screen.print('SIGNS MADE', false);
			screen.htab(25);
			screen.print('EXPENSES ' + game.STI$);
			screen.print();
			screen.print();
			game.STI = game.P1;
			game.gosub_4000();
			screen.htab(16);
			screen.print('PROFIT  ' + game.STI$);
			screen.print();
			game.STI = game.DIMA[game.I];
			game.gosub_4000();
			screen.htab(16);
			screen.print('ASSETS  ' + game.STI$);
			game.next_function = game.line_5070;
			this.gosub_18000();
		};
		Game.prototype.line_5070 = function() {
			if (debug) console.log('line_5070 called');
			game.next_function = null;
			// REM
			screen.home();
			game.line_1350();
		};
		Game.prototype.gosub_10000 = function() {
			// initialize music mini-program in memory
			game.gosub_11000();
		};
		Game.prototype.gosub_11000 = function() {
			// play animated logo and music

			screen.setMode('GR');
			screen.color(12);

			for (game.I = 0; game.I <= 39; game.I++) {
				screen.hlin(0, 39, game.I);
			}
			screen.vtab(2);
			screen.print(';LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL;LLLLL', false);
			screen.print(';LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL;LLLLL', false);
			screen.print(';LLLL;;;;L;;;;;L;;;;L;;;;L;;;;L;;;;L;;;;', false);
			screen.print(';LLLL;LL;L;L;L;L;LL;L;LL;LLLL;L;LL;L;LL;', false);
			screen.print(';LLLL;;;;L;L;L;L;LL;L;LL;L;;;;L;LL;L;;;;', false);
			screen.print(';LLLL;LLLL;L;L;L;LL;L;LL;L;LL;L;LL;L;LLL', false);
			screen.print(';;;;L;;;;L;LLL;L;;;;L;LL;L;;;;L;;;;L;;;;', false);
			screen.vtab(11);
			screen.print('LLLLLLLL;;;;;LL;LLLLLLLLLLLLLLL;LLLLLLLL', false);
			screen.print('LLLLLLLL;LLLLLL;LLLLLLLLLLLLLLL;LLLLLLLL', false);
			screen.print('LLLLLLLL;LLLLL;;;L;;;;L;;;;L;;;;LLLLLLLL', false);
			screen.print('LLLLLLLL;;;;;LL;LLLLL;L;LL;L;LL;LLLLLLLL', false);
			screen.print('LLLLLLLLLLLL;LL;LL;;;;L;LL;L;LL;LLLLLLLL', false);
			screen.print('LLLLLLLLLLLL;LL;LL;LL;L;LL;L;LL;LLLLLLLL', false);
			screen.print('LLLLLLLL;;;;;LL;LL;;;;L;LL;L;;;;LLLLLLLL', false);

			screen.vtab(23);
			screen.print('  COPYRIGHT 1979    APPLE COMPUTER INC.');

			game.next_function = game.gosub_11700;
			game.animate(lemonade_5c);
		};
		Game.prototype.gosub_11700 = function() {
			// play more music
			game.line_135();
		};
		Game.prototype.gosub_12000 = function() {
			// show introduction and get number of players
			screen.setMode('TEXT');
			screen.home();
			//beep();
			screen.print('HI!  WELCOME TO LEMONSVILLE, CALIFORNIA!');
			screen.print();
			screen.print('IN THIS SMALL TOWN, YOU ARE IN CHARGE OF');
			screen.print('RUNNING YOUR OWN LEMONADE STAND. YOU CAN');
			screen.print('COMPETE WITH AS MANY OTHER PEOPLE AS YOU');
			screen.print('WISH, BUT HOW MUCH PROFIT YOU MAKE IS UP');
			screen.print('TO YOU (THE OTHER STANDS\' SALES WILL NOT');
			screen.print('AFFECT YOUR BUSINESS IN ANY WAY). IF YOU');
			screen.print('MAKE THE MOST MONEY, YOU\'RE THE WINNER!!');
			screen.print();
			screen.print('ARE YOU STARTING A NEW GAME? (YES OR NO)');
			game.line_12200();
		};
		Game.prototype.line_12200 = function() {
			screen.vtab(21);
			screen.input('TYPE YOUR ANSWER AND HIT RETURN ==> ', ['string'], this.line_12210);
		};
		Game.prototype.line_12210 = function(answer) {
			game.A$ = answer.charAt(0);
			if (game.A$ === 'Y' || game.A$ === 'y' || game.A$ === 'N' || game.A$ === 'n') {
				game.line_12220();
			} else {
				game.line_12200();
			}
		};
		Game.prototype.line_12220 = function() {
			screen.vtab(23);
			screen.call958();
			screen.input('HOW MANY PEOPLE WILL BE PLAYING? ==> ', ['number'], this.after_12220);
		};
		Game.prototype.after_12220 = function(answer) {
			game.N$ = answer;
			game.N = parseInt(game.N$);
			if (game.N >= 1 && game.N <= 30) {
				// initialize game (line 310, then gosub 12000)
				game.after_310();
				if (game.A$ === 'Y' || game.A$ === 'y') {
					game.gosub_13000();
				} else {
					game.gosub_14000();
				}
			} else {
				game.line_12220();
			}
		};
		Game.prototype.gosub_13000 = function() {
			// REM   NEW BUSINESS
			screen.home() 
			screen.print('TO MANAGE YOUR LEMONADE STAND, YOU WILL ');
			screen.print('NEED TO MAKE THESE DECISIONS EVERY DAY: ');
      screen.print();
			screen.print('1. HOW MANY GLASSES OF LEMONADE TO MAKE    (ONLY ONE BATCH IS MADE EACH MORNING)');
			screen.print('2. HOW MANY ADVERTISING SIGNS TO MAKE      (THE SIGNS COST FIFTEEN CENTS EACH)  ');
			screen.print('3. WHAT PRICE TO CHARGE FOR EACH GLASS  ');
			screen.print();
			screen.print('YOU WILL BEGIN WITH $2.00 CASH (ASSETS).');
			screen.print('BECAUSE YOUR MOTHER GAVE YOU SOME SUGAR,');
			screen.print('YOUR COST TO MAKE LEMONADE IS TWO CENTS ');
			screen.print('A GLASS (THIS MAY CHANGE IN THE FUTURE).');
			screen.print();
			game.next_function = game.line_13202;
			this.gosub_18000();
		};
		Game.prototype.line_13202 = function() {
			game.next_function = null;
			screen.home();
			screen.print('YOUR EXPENSES ARE THE SUM OF THE COST OF');
			screen.print('THE LEMONADE AND THE COST OF THE SIGNS. ');
			screen.print();
			screen.print('YOUR PROFITS ARE THE DIFFERENCE BETWEEN ');
			screen.print('THE INCOME FROM SALES AND YOUR EXPENSES.');
			screen.print();
			screen.print('THE NUMBER OF GLASSES YOU SELL EACH DAY '); 
			screen.print('DEPENDS ON THE PRICE YOU CHARGE, AND ON ');
			screen.print('THE NUMBER OF ADVERTISING SIGNS YOU USE.');
			screen.print();
			screen.print('KEEP TRACK OF YOUR ASSETS, BECAUSE YOU  ');
			screen.print('CAN\'T SPEND MORE MONEY THAN YOU HAVE!   ');
			screen.print();
			game.next_function = game.line_13302;
			this.gosub_18000();
		};
		Game.prototype.line_13302 = function() {
			game.next_function = null;
			screen.home();
			game.line_400();
		};
		Game.prototype.gosub_14000 = function() {
			// REM   CONTINUE OLD GAME
			screen.call936();
			// beep
			game.I = 0;	
			screen.print('HI AGAIN!  WELCOME BACK TO LEMONSVILLE! ');
			screen.print();
			screen.print('LET\'S CONTINUE YOUR LAST GAME FROM WHERE');
			screen.print('YOU LEFT IT LAST TIME.  DO YOU REMEMBER ');
			screen.print('WHAT DAY NUMBER IT WAS? ', false);
			game.line_14150();
		};
		Game.prototype.line_14150 = function() {
			screen.input('', ['string'], game.after_14150);
		};
		Game.prototype.after_14150 = function(answer) {
			game.A$ = answer;
			game.A = parseInt(game.A$);
			screen.print();
			if (!isNaN(game.A) && game.A !== 0) { // A$ is a number, and not 0
				game.line_14200();
			} else {
				game.A$ = answer.charAt(0);
				if (game.A$ === 'Y' || game.A$ === 'y') {
					screen.print('GOOD!  WHAT DAY WAS IT? ', false);
					game.I += 1;
					game.line_14150();
				} else if (game.A$ === 'N' || game.A$ === 'n' || game.I > 0) {
					game.line_14300();
				} else {
					// beep
					screen.print('YES OR NO? ', false);
					game.I += 1;
					game.line_14150();
				}
			}
		};
		Game.prototype.line_14200 = function() {
			if (game.A < 1 || game.A > 99 || !Number.isInteger(game.A)) {
			//if (game.A < 1 || game.A > 99) {
				game.line_14300();
			} else {
				game.D = game.A;
				game.line_14300();
			}
		}
		Game.prototype.line_14300 = function() {
			screen.print('OKAY - WE\'LL START WITH DAY NO. ' + parseInt(game.D + 1));
			screen.print();
			game.I = 0;
			game.line_14400();
		};	
		Game.prototype.line_14400 = function() {
			// we can't create input boxes in a for loop like this Apple version does
			// because it just skips over waiting for input, so we have to do it with
			// function logic, long and boring like
			if (game.I < game.N) {
				screen.print();
				screen.print();
				screen.print('PLAYER NO. ' + (game.I + 1) + ', HOW MUCH MONEY (ASSETS)');
				screen.print();
				screen.print('DID YOU HAVE? ', false);
				screen.input('', ['string'], game.after_14430);
			} else {
				game.line_14500();
			}
		}
		Game.prototype.after_14430 = function(answer) {
			game.A$ = answer;
			game.A = parseInt(game.A$);
			screen.print();
			if (game.A < 2) {
				screen.print('O.K.- WE\'LL START YOU OUT WITH $2.00');
				game.A = 2;
				game.line_14490();
			} else if (game.A > 40) {
				screen.print('JUST TO BE FAIR, LET\'S MAKE THAT $10.00');
				game.A = 10;
				game.line_14490();
			} else {
				game.line_14490();
			}
			game.I += 1;
			// goto the start of the lewp
			game.line_14400();
		};
		Game.prototype.line_14490 = function() {
			game.DIMA[game.I] = Math.trunc(game.A * (100 + 0.5)) / 100;
		};
		Game.prototype.line_14500 = function() {
			screen.print();
			// beep
			screen.input('...READY TO BEGIN? ', ['string'], game.line_14510);
		};
		Game.prototype.line_14510 = function(answer) {
			game.A$ = answer;
			if (game.A$.charAt(0) === 'N' || game.A$.charAt(0) === 'n') {
				game.gosub_13000();
			} else {
				game.line_400();
			}
		};
		Game.prototype.gosub_15000 = function() {
			if (debug) console.log('gosub_15000 called');
			// REM   WEATHER DISPLAY
			screen.setMode('GR');
			screen.home();
			screen.color(game.SC);
			for (game.I = 0; game.I <= 25; game.I++) {
				screen.hlin(0, 39, game.I);
			}
			screen.color(12);
			for (game.I = 26; game.I <= 39; game.I++) {
				screen.hlin(0, 39, game.I);
			}
			screen.color(8);
			for (game.I = 24; game.I <= 32; game.I++) {
				screen.hlin(15, 25, game.I);
			}
			screen.color(13);
			for (game.I = 17; game.I <= 23; game.I += 2) {
				screen.vlin(22, 23, game.I);
			}
			if (game.SC === 2 || game.SC === 7) {
				game.line_15160();
			} else {
				if (game.SC === 10) {
					screen.color(15);
				} else if (game.SC === 5)  {
					screen.color(0);
				}
				screen.hlin(6, 10, 2);
				screen.hlin(4, 14, 3);
				screen.hlin(7, 12, 4);
				screen.hlin(22, 30, 4);
				screen.hlin(20, 36, 5);
				screen.hlin(23, 33, 6);
				game.line_15170();
			}
		};
		Game.prototype.line_15160 = function() {
			if (game.SC === 7) {
				screen.color(9);
			}
			screen.hlin(3, 5, 1);
			screen.hlin(2, 6, 2);
			for (game.I = 3; game.I <= 6; game.I++) {
				screen.hlin(1, 7, game.I);
			}
			screen.hlin(2, 6, 7);
			screen.hlin(3, 5, 8);
			game.line_15170();
		};
		Game.prototype.line_15170 = function() {
			screen.vtab(22);
			screen.htab(8);
			screen.print(' LEMONSVILLE WEATHER REPORT ');
			screen.print();
			screen.vtab(22); // yes this is really all in there twice
			screen.htab(8);
			screen.print(' LEMONSVILLE WEATHER REPORT ');
			screen.print();
			if (game.SC === 2) {
				screen.htab(18);
				screen.print(' SUNNY ', false);
				// line 15510, returns to after_2320
				setTimeout(function() {
					game.next_function();
				}, 2000);
			} else if (game.SC === 7) {
				screen.htab(15);
				screen.print(' HOT AND DRY ', false);
				// line 15510, returns to after_2320
				setTimeout(function() {
					game.next_function();
				}, 2000);
			} else if (game.SC === 10) {
				screen.htab(17);
				screen.print(' CLOUDY ', false);
				// line 15510, returns to after_2320
				setTimeout(function() {
					game.next_function();
				}, 2000);
			} else if (game.SC === 5) {
				screen.htab(14);
				screen.print(' THUNDERSTORMS! ', false);
				if (debug) console.log('THUNDERSTORMS!');
				// animates T-storms, and then executes next_function, whichi s after_2320
				game.gosub_17000();
			}
		};
		Game.prototype.gosub_17000 = function() {
			// this function is purely a stub right now, it just returns
			if (game.SC !== 5) {
				game.next_function();
			} else {
				if (debug) console.log('animating thunderstorms!');
				game.animate(thunderstorms);
			}
		};
		Game.prototype.gosub_18000 = function() {
			if (debug) console.log('gosub_18000 called');
			screen.vtab(24);
			screen.print(' PRESS SPACE TO CONTINUE, ESC TO END...', false);
			game.line_18010();
		};
		Game.prototype.line_18010 = function() {
			screen.get(game.after_18010);
		};
		Game.prototype.after_18010 = function(IN$) {
			if (debug) console.log('line_18010 called');
			// if it's space, we execute next_function()
			// if it's escape (code 69), we end the game
			if (IN$ !== ' ' && IN$.charCodeAt(0) !== 69) {
				game.line_18010();
			} else if (IN$.charCodeAt(0) === 69) {
				game.line_31111();
			} else {
				if (debug) console.log('executing next_function');
				game.next_function();
			}
		};
		Game.prototype.line_31111 = function() {
			setTimeout(function() {
				screen.home();
				screen.vtab(10);
				screen.print('WOULD YOU LIKE TO PLAY AGAIN ');
				screen.get(game.line_31112);
			}, 2000);
		};
		Game.prototype.line_31112 = function(IN$) {
			if (IN$ === 'Y' || IN$ === 'y') {
				game.line_5();
			} else {
				screen.setMode('TEXT');
				screen.home();
				screen.setMode('TEXT');
				screen.vtab(11);
				screen.print(']');
			}
		};

		Game.prototype.animate = function(frames, startFrame) {
			// This takes an array of frames.  Each frame has a series of instructions
			// that tells it what to draw, and how long to display it for.  It is
			// also possible to pause after the animation by issuing a extra long
			// delay after it.
			var frameIndex;
			if (startFrame === undefined) {
				frameIndex = 0;
			} else {
				frameIndex = startFrame;
			}
			var frame = frames[frameIndex];
			game.drawFrame(frame);
			var viewTime = frame[frame.length - 1]; // viewTime is the final parameter
			// queue up the next frame, or move on if done
			setTimeout(function() {
				if (frameIndex < frames.length - 1) {
					game.animate(frames, ++frameIndex);
				} else {
					game.next_function();
				}
			}, viewTime);	
		};
		Game.prototype.drawFrame = function(frame) {
			// Each frame is a series of draw commands, either p for plot, h for hlin,
			// or v for vlin, plus their parameters, plus a color, plus a view time
			// used in the calling function.
			if (frame.length > 1) {
				for (var i = 0, j = frame.length - 1; i < j; i++) {
					var command = frame[i];
					var operation = command[0];
					if (operation === 'p') {
						screen.color(command[3]);
						screen.plot(command[1], command[2]);
					} else if (operation === 'h') {
						screen.color(command[4]);
						screen.hlin(command[1], command[2], command[3]);
					} else if (operation === 'v') {
						screen.color(command[4]);
						screen.vlin(command[1], command[2], command[3]);
					}
				}
			}
		};
		var lemonade_5c = [
			[
				['v', 18, 37, 39, 15], // edge of glass
				100
			],
			[
				['v', 18, 37, 38, 15], // edge of glass
				['v', 18, 36, 39, 12], // first sliver of inside of glass
				['v', 37, 37, 39, 15],
				100
			],
			[
				['v', 18, 37, 37, 15], // edge of glass
				['v', 18, 36, 38, 12], // first sliver of inside of glass
				['v', 37, 37, 38, 15],
				100
			],
			[
				['v', 18, 37, 36, 15],
				['v', 18, 36, 37, 12],
				['v', 37, 37, 37, 15],
				100
			],
			[
				['v', 18, 37, 35, 15],
				['v', 18, 36, 36, 12],
				['v', 37, 37, 36, 15],
				100
			],
			[
				['v', 18, 37, 34, 15],
				['v', 18, 36, 35, 12],
				['v', 37, 37, 35, 15],
				100
			],
			[
				['v', 18, 37, 33, 15],
				['v', 18, 36, 34, 12],
				['v', 37, 37, 34, 15],
				100
			],
			[
				['v', 18, 37, 32, 15],
				['v', 18, 36, 33, 12],
				['v', 37, 37, 33, 15],
				100
			],
			[
				['v', 18, 37, 31, 15],
				['v', 18, 36, 32, 12],
				['v', 37, 37, 32, 15],
				100
			],
			[
				['v', 18, 37, 30, 15],
				['v', 18, 36, 31, 12],
				['v', 37, 37, 31, 15],
				100
			],
			[
				['v', 18, 37, 29, 15],
				['v', 18, 36, 30, 12],
				['v', 37, 37, 30, 15],
				['v', 18, 37, 39, 15],
				100
			],
			[
				['v', 18, 37, 28, 15], // finally entirely past the edge
				['v', 18, 36, 29, 12],
				['v', 37, 37, 29, 15],
				['v', 18, 37, 38, 15],
				['v', 18, 37, 39, 12],
				100
			],
			[
				['v', 18, 37, 27, 15],
				['v', 18, 36, 28, 12],
				['v', 37, 37, 28, 15],
				['v', 18, 37, 37, 15],
				['v', 18, 37, 38, 12],
				100
			],
			[
				['v', 18, 37, 26, 15],
				['v', 18, 36, 27, 12],
				['v', 37, 37, 27, 15],
				['v', 18, 37, 36, 15],
				['v', 18, 37, 37, 12],
				100
			],
			[
				['v', 18, 37, 25, 15],
				['v', 18, 36, 26, 12],
				['v', 37, 37, 26, 15],
				['v', 18, 37, 35, 15],
				['v', 18, 37, 36, 12],
				100
			],
			[
				['v', 18, 37, 24, 15],
				['v', 18, 36, 25, 12],
				['v', 37, 37, 25, 15],
				['v', 18, 37, 34, 15],
				['v', 18, 37, 35, 12],
				100
			],
			[
				['v', 18, 37, 23, 15],
				['v', 18, 36, 24, 12],
				['v', 37, 37, 24, 15],
				['v', 18, 37, 33, 15],
				['v', 18, 37, 34, 12],
				100
			],
			[
				['v', 18, 37, 22, 15],
				['v', 18, 36, 23, 12],
				['v', 37, 37, 23, 15],
				['v', 18, 37, 32, 15],
				['v', 18, 37, 33, 12],
				100
			],
			[
				['v', 18, 37, 21, 15],
				['v', 18, 36, 22, 12],
				['v', 37, 37, 22, 15],
				['v', 18, 37, 31, 15],
				['v', 18, 37, 32, 12],
				['v', 24, 25, 33, 11], // start of cent symbol
				['v', 30, 31, 33, 11],
				100
			],
			[
				['v', 18, 37, 20, 15],
				['v', 18, 36, 21, 12],
				['v', 37, 37, 21, 15],
				['v', 18, 37, 30, 15],
				['v', 18, 37, 31, 12],
				['v', 24, 25, 32, 11],
				['v', 30, 31, 32, 11],
				100
			],
			[
				['v', 18, 37, 19, 15],
				['v', 18, 36, 20, 12],
				['v', 37, 37, 20, 15],
				['v', 18, 37, 29, 15],
				['v', 18, 37, 30, 12],
				['v', 24, 25, 32, 11],
				['v', 30, 31, 32, 11],
				100
			],
			[
				['v', 18, 37, 18, 15],
				['v', 18, 36, 19, 12],
				['v', 37, 37, 19, 15],
				['v', 18, 37, 28, 15],
				['v', 18, 37, 29, 12],
				['v', 22, 25, 31, 11],
				['v', 30, 33, 31, 11],
				100
			],
			[
				['v', 18, 37, 17, 15],
				['v', 18, 36, 18, 12],
				['v', 37, 37, 18, 15],
				['v', 18, 37, 27, 15],
				['v', 18, 37, 28, 12],
				['v', 24, 25, 30, 11],
				['v', 30, 31, 30, 11],
				100
			],
			[
				['v', 18, 37, 16, 15],
				['v', 18, 36, 17, 12],
				['v', 37, 37, 17, 15],
				['v', 18, 37, 26, 15],
				['v', 18, 37, 27, 12],
				['v', 24, 31, 29, 11],
				100
			],
			[
				['v', 18, 37, 15, 15],
				['v', 18, 36, 16, 12],
				['v', 37, 37, 16, 15],
				['v', 18, 37, 25, 15],
				['v', 18, 37, 26, 12],
				100
			],
			[
				['v', 18, 37, 14, 15],
				['v', 18, 36, 15, 12],
				['v', 37, 37, 15, 15],
				['v', 18, 37, 24, 15],
				['v', 18, 37, 25, 12],
				['v', 22, 23, 26, 11],
				['v', 26, 33, 26, 11],
				100
			],
			[
				['v', 18, 37, 13, 15],
				['v', 18, 36, 14, 12],
				['v', 37, 37, 14, 15],
				['v', 18, 37, 23, 15],
				['v', 18, 37, 24, 12],
				['v', 22, 23, 25, 11],
				['v', 26, 27, 25, 11],
				['v', 32, 33, 25, 11],
				100
			],
			[
				['v', 18, 37, 12, 15],
				['v', 18, 36, 13, 12],
				['v', 37, 37, 13, 15],
				['v', 18, 37, 22, 15],
				['v', 18, 37, 23, 12],
				['v', 22, 23, 24, 11],
				['v', 26, 27, 24, 11],
				['v', 32, 33, 24, 11],
				100
			],
			[
				['v', 18, 37, 11, 15],
				['v', 18, 36, 12, 12],
				['v', 37, 37, 12, 15],
				['v', 18, 37, 21, 15],
				['v', 18, 37, 22, 12],
				['v', 22, 23, 23, 11],
				['v', 26, 27, 23, 11],
				['v', 32, 33, 23, 11],
				100
			],
			[
				['v', 18, 37, 10, 15],
				['v', 18, 36, 11, 12],
				['v', 37, 37, 11, 15],
				['v', 18, 37, 20, 15],
				['v', 18, 37, 21, 12],
				['v', 22, 23, 22, 11],
				['v', 26, 27, 22, 11],
				['v', 32, 33, 22, 11],
				100
			],
			[
				['v', 18, 37, 9, 15],
				['v', 18, 36, 10, 12],
				['v', 37, 37, 10, 15],
				['v', 18, 37, 19, 15],
				['v', 18, 37, 20, 12],
				['v', 22, 27, 22, 11],
				['v', 32, 33, 22, 11],
				100
			],
			[
				['v', 18, 37, 8, 15],
				['v', 18, 36, 9, 12],
				['v', 37, 37, 9, 15],
				['v', 18, 37, 18, 15],
				['v', 18, 37, 19, 12],
				100
			],
			[
				['v', 18, 37, 7, 15],
				['v', 18, 36, 8, 12],
				['v', 37, 37, 8, 15],
				['v', 18, 37, 17, 15],
				['v', 18, 37, 18, 12],
				1000
			],
			[
				['v', 14, 36, 12, 13], // start pouring lemonade
				100
			],
			[
				['h', 8, 16, 36, 13],
				100
			],
			[
				['h', 8, 16, 35, 13],
				100
			],
			[
				['h', 8, 16, 34, 13],
				100
			],
			[
				['h', 8, 16, 33, 13],
				100
			],
			[
				['h', 8, 16, 32, 13],
				100
			],
			[
				['h', 8, 16, 31, 13],
				100
			],
			[
				['h', 8, 16, 30, 13],
				100
			],
			[
				['h', 8, 16, 29, 13],
				100
			],
			[
				['h', 8, 16, 28, 13],
				100
			],
			[
				['h', 8, 16, 27, 13],
				100
			],
			[
				['h', 8, 16, 26, 13],
				100
			],
			[
				['h', 8, 16, 25, 13],
				100
			],
			[
				['h', 8, 16, 24, 13],
				100
			],
			[
				['h', 8, 16, 23, 13],
				100
			],
			[
				['h', 8, 16, 22, 13],
				100
			],
			[
				['h', 8, 16, 21, 13],
				100
			],
			[
				['h', 8, 16, 20, 13],
				100
			],
			[
				['v', 14, 19, 12, 12], // stop pouring lemonade
				3000
			]
		];
		var thunderstorms = [
			[
				['v', 7, 9, 29, 7], // start lightning, stirke 1
				['h', 30, 31, 9, 7],
				['v', 9, 14, 32, 7],
				['h', 33, 34, 14, 7],
				['v', 14, 25, 35, 7],
				['v', 5, 8, 8, 7],
				['p', 9, 8, 7],
				['v', 8, 13, 10, 7],
				['p', 11, 13, 7],
				['v', 13, 17, 12, 7],
				20
			],
			[
				['v', 7, 9, 29, 9],
				['h', 30, 31, 9, 9],
				['v', 9, 14, 32, 9],
				['h', 33, 34, 14, 9],
				['v', 14, 25, 35, 9],
				['v', 5, 8, 8, 9],
				['p', 9, 8, 9],
				['v', 8, 13, 10, 9],
				['p', 11, 13, 9],
				['v', 13, 17, 12, 9],
				20
			],
			[
				['v', 7, 9, 29, 5],
				['h', 30, 31, 9, 5],
				['v', 9, 14, 32, 5],
				['h', 33, 34, 14, 5],
				['v', 14, 25, 35, 5],
				['v', 5, 8, 8, 5],
				['p', 9, 8, 5],
				['v', 8, 13, 10, 5],
				['p', 11, 13, 5],
				['v', 13, 17, 12, 5],
				20
			],
			[
				['v', 7, 9, 29, 7], // start lightning
				['h', 30, 31, 9, 7],
				['v', 9, 14, 32, 7],
				['h', 33, 34, 14, 7],
				['v', 14, 25, 35, 7],
				['v', 5, 8, 8, 7],
				['p', 9, 8, 7],
				['v', 8, 13, 10, 7],
				['p', 11, 13, 7],
				['v', 13, 17, 12, 7],
				20
			],
			[
				['v', 7, 9, 29, 9],
				['h', 30, 31, 9, 9],
				['v', 9, 14, 32, 9],
				['h', 33, 34, 14, 9],
				['v', 14, 25, 35, 9],
				['v', 5, 8, 8, 9],
				['p', 9, 8, 9],
				['v', 8, 13, 10, 9],
				['p', 11, 13, 9],
				['v', 13, 17, 12, 9],
				20
			],
			[
				['v', 7, 9, 29, 5],
				['h', 30, 31, 9, 5],
				['v', 9, 14, 32, 5],
				['h', 33, 34, 14, 5],
				['v', 14, 25, 35, 5],
				['v', 5, 8, 8, 5],
				['p', 9, 8, 5],
				['v', 8, 13, 10, 5],
				['p', 11, 13, 5],
				['v', 13, 17, 12, 5],
				20
			],
			[
				['v', 7, 9, 29, 7], // start lightning
				['h', 30, 31, 9, 7],
				['v', 9, 14, 32, 7],
				['h', 33, 34, 14, 7],
				['v', 14, 25, 35, 7],
				['v', 5, 8, 8, 7],
				['p', 9, 8, 7],
				['v', 8, 13, 10, 7],
				['p', 11, 13, 7],
				['v', 13, 17, 12, 7],
				20
			],
			[
				['v', 7, 9, 29, 9],
				['h', 30, 31, 9, 9],
				['v', 9, 14, 32, 9],
				['h', 33, 34, 14, 9],
				['v', 14, 25, 35, 9],
				['v', 5, 8, 8, 9],
				['p', 9, 8, 9],
				['v', 8, 13, 10, 9],
				['p', 11, 13, 9],
				['v', 13, 17, 12, 9],
				20
			],
			[
				['v', 7, 9, 29, 5],
				['h', 30, 31, 9, 5],
				['v', 9, 14, 32, 5],
				['h', 33, 34, 14, 5],
				['v', 14, 25, 35, 5],
				['v', 5, 8, 8, 5],
				['p', 9, 8, 5],
				['v', 8, 13, 10, 5],
				['p', 11, 13, 5],
				['v', 13, 17, 12, 5],
				500
			],
			[
				['v', 7, 9, 29, 7], // start lightning, strike 2
				['h', 30, 31, 9, 7],
				['v', 9, 14, 32, 7],
				['h', 33, 34, 14, 7],
				['v', 14, 25, 35, 7],
				['v', 5, 8, 8, 7],
				['p', 9, 8, 7],
				['v', 8, 13, 10, 7],
				['p', 11, 13, 7],
				['v', 13, 17, 12, 7],
				20
			],
			[
				['v', 7, 9, 29, 9],
				['h', 30, 31, 9, 9],
				['v', 9, 14, 32, 9],
				['h', 33, 34, 14, 9],
				['v', 14, 25, 35, 9],
				['v', 5, 8, 8, 9],
				['p', 9, 8, 9],
				['v', 8, 13, 10, 9],
				['p', 11, 13, 9],
				['v', 13, 17, 12, 9],
				20
			],
			[
				['v', 7, 9, 29, 5],
				['h', 30, 31, 9, 5],
				['v', 9, 14, 32, 5],
				['h', 33, 34, 14, 5],
				['v', 14, 25, 35, 5],
				['v', 5, 8, 8, 5],
				['p', 9, 8, 5],
				['v', 8, 13, 10, 5],
				['p', 11, 13, 5],
				['v', 13, 17, 12, 5],
				20
			],
			[
				['v', 7, 9, 29, 7], // start lightning
				['h', 30, 31, 9, 7],
				['v', 9, 14, 32, 7],
				['h', 33, 34, 14, 7],
				['v', 14, 25, 35, 7],
				['v', 5, 8, 8, 7],
				['p', 9, 8, 7],
				['v', 8, 13, 10, 7],
				['p', 11, 13, 7],
				['v', 13, 17, 12, 7],
				20
			],
			[
				['v', 7, 9, 29, 9],
				['h', 30, 31, 9, 9],
				['v', 9, 14, 32, 9],
				['h', 33, 34, 14, 9],
				['v', 14, 25, 35, 9],
				['v', 5, 8, 8, 9],
				['p', 9, 8, 9],
				['v', 8, 13, 10, 9],
				['p', 11, 13, 9],
				['v', 13, 17, 12, 9],
				20
			],
			[
				['v', 7, 9, 29, 5],
				['h', 30, 31, 9, 5],
				['v', 9, 14, 32, 5],
				['h', 33, 34, 14, 5],
				['v', 14, 25, 35, 5],
				['v', 5, 8, 8, 5],
				['p', 9, 8, 5],
				['v', 8, 13, 10, 5],
				['p', 11, 13, 5],
				['v', 13, 17, 12, 5],
				20
			],
			[
				['v', 7, 9, 29, 7], // start lightning
				['h', 30, 31, 9, 7],
				['v', 9, 14, 32, 7],
				['h', 33, 34, 14, 7],
				['v', 14, 25, 35, 7],
				['v', 5, 8, 8, 7],
				['p', 9, 8, 7],
				['v', 8, 13, 10, 7],
				['p', 11, 13, 7],
				['v', 13, 17, 12, 7],
				20
			],
			[
				['v', 7, 9, 29, 9],
				['h', 30, 31, 9, 9],
				['v', 9, 14, 32, 9],
				['h', 33, 34, 14, 9],
				['v', 14, 25, 35, 9],
				['v', 5, 8, 8, 9],
				['p', 9, 8, 9],
				['v', 8, 13, 10, 9],
				['p', 11, 13, 9],
				['v', 13, 17, 12, 9],
				20
			],
			[
				['v', 7, 9, 29, 5],
				['h', 30, 31, 9, 5],
				['v', 9, 14, 32, 5],
				['h', 33, 34, 14, 5],
				['v', 14, 25, 35, 5],
				['v', 5, 8, 8, 5],
				['p', 9, 8, 5],
				['v', 8, 13, 10, 5],
				['p', 11, 13, 5],
				['v', 13, 17, 12, 5],
				6000
			],
			[
				['v', 7, 9, 29, 7], // start lightning, strike 3
				['h', 30, 31, 9, 7],
				['v', 9, 14, 32, 7],
				['h', 33, 34, 14, 7],
				['v', 14, 25, 35, 7],
				['v', 5, 8, 8, 7],
				['p', 9, 8, 7],
				['v', 8, 13, 10, 7],
				['p', 11, 13, 7],
				['v', 13, 17, 12, 7],
				20
			],
			[
				['v', 7, 9, 29, 9],
				['h', 30, 31, 9, 9],
				['v', 9, 14, 32, 9],
				['h', 33, 34, 14, 9],
				['v', 14, 25, 35, 9],
				['v', 5, 8, 8, 9],
				['p', 9, 8, 9],
				['v', 8, 13, 10, 9],
				['p', 11, 13, 9],
				['v', 13, 17, 12, 9],
				20
			],
			[
				['v', 7, 9, 29, 5],
				['h', 30, 31, 9, 5],
				['v', 9, 14, 32, 5],
				['h', 33, 34, 14, 5],
				['v', 14, 25, 35, 5],
				['v', 5, 8, 8, 5],
				['p', 9, 8, 5],
				['v', 8, 13, 10, 5],
				['p', 11, 13, 5],
				['v', 13, 17, 12, 5],
				20
			],
			[
				['v', 7, 9, 29, 7], // start lightning
				['h', 30, 31, 9, 7],
				['v', 9, 14, 32, 7],
				['h', 33, 34, 14, 7],
				['v', 14, 25, 35, 7],
				['v', 5, 8, 8, 7],
				['p', 9, 8, 7],
				['v', 8, 13, 10, 7],
				['p', 11, 13, 7],
				['v', 13, 17, 12, 7],
				20
			],
			[
				['v', 7, 9, 29, 9],
				['h', 30, 31, 9, 9],
				['v', 9, 14, 32, 9],
				['h', 33, 34, 14, 9],
				['v', 14, 25, 35, 9],
				['v', 5, 8, 8, 9],
				['p', 9, 8, 9],
				['v', 8, 13, 10, 9],
				['p', 11, 13, 9],
				['v', 13, 17, 12, 9],
				20
			],
			[
				['v', 7, 9, 29, 5],
				['h', 30, 31, 9, 5],
				['v', 9, 14, 32, 5],
				['h', 33, 34, 14, 5],
				['v', 14, 25, 35, 5],
				['v', 5, 8, 8, 5],
				['p', 9, 8, 5],
				['v', 8, 13, 10, 5],
				['p', 11, 13, 5],
				['v', 13, 17, 12, 5],
				20
			],
			[
				['v', 7, 9, 29, 7], // start lightning
				['h', 30, 31, 9, 7],
				['v', 9, 14, 32, 7],
				['h', 33, 34, 14, 7],
				['v', 14, 25, 35, 7],
				['v', 5, 8, 8, 7],
				['p', 9, 8, 7],
				['v', 8, 13, 10, 7],
				['p', 11, 13, 7],
				['v', 13, 17, 12, 7],
				20
			],
			[
				['v', 7, 9, 29, 9],
				['h', 30, 31, 9, 9],
				['v', 9, 14, 32, 9],
				['h', 33, 34, 14, 9],
				['v', 14, 25, 35, 9],
				['v', 5, 8, 8, 9],
				['p', 9, 8, 9],
				['v', 8, 13, 10, 9],
				['p', 11, 13, 9],
				['v', 13, 17, 12, 9],
				20
			],
			[
				['v', 7, 9, 29, 5],
				['h', 30, 31, 9, 5],
				['v', 9, 14, 32, 5],
				['h', 33, 34, 14, 5],
				['v', 14, 25, 35, 5],
				['v', 5, 8, 8, 5],
				['p', 9, 8, 5],
				['v', 8, 13, 10, 5],
				['p', 11, 13, 5],
				['v', 13, 17, 12, 5],
				2000
			]
		];

		domReady(function() {
			screen = new Screen(document.getElementById('screen'));
			screen.startup();
			game = new Game();
			// start game
			game.line_5();
		});
	}
);
