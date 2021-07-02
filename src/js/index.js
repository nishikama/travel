'use strict';

import 'core-js';
import 'regenerator-runtime/runtime';

import 'bootstrap-reboot';
import 'video.js';
import '../scss/style.scss';

import Hls from 'hls.js';
import gsap from 'gsap';
import Map from './map';

document.addEventListener('DOMContentLoaded', () => {
	Map.loadGoogleMapsApi().then((googleMaps) => {
		function toCamelcase(str, upper) {
			if (!str) return str;

			const strs = str.split(/[-_ ]+/);
			const len = strs.length;
			let i = 1;

			if (len <= 1) return str;

			if (upper) {
				i = 0;
				str = '';
			} else {
				str = strs[0].toLowerCase();
			}

			for (; i < len; i++) {
				str += strs[i].toLowerCase().replace(/^[a-z]/, (value) => {
					return value.toUpperCase();
				});
			}

			return str;
		}

		const elements = [
			'container',
			'map',
			'panorama',
			'modal-layer',
			'dice-layer',
		];
		const el = {};
		elements.forEach((element) => {
			el[toCamelcase(element, false)] = document.getElementById(element);
		});

		el.dice = document.createElement('img');
		el.dice.id = 'dice';
		el.dice.src = 'images/a4_4.png';
		el.dice.alt = 'サイコロ';
		el.diceBase = document.createElement('div');
		el.diceBase.id = 'dice-base';
		el.diceBase.appendChild(el.dice);
		el.diceLayer.appendChild(el.diceBase);

		el.video = document.createElement('video');
		el.video.id = 'video';
		el.video.classList.add('video-js', 'vjs-default-skin');
		el.video.width = '1920';
		el.video.height = '1080';

		el.body = document.getElementsByTagName('body')[0];
		el.body.appendChild(el.video);

		const source = './video/video.m3u8';
		const ua = navigator.userAgent;

		if (
			ua.indexOf('iPhone') > 0 ||
			ua.indexOf('iPad') > 0 ||
			ua.indexOf('Android') > 0
		) {
			// iOS
			el.source = document.createElement('source');
			el.source.src = source;
			el.source.type = 'application/x-mpegURL';
			el.video.appendChild(el.source);
		} else {
			// OTHER
			if (Hls.isSupported()) {
				const hls = new Hls();
				hls.attachMedia(el.video);
				hls.on(Hls.Events.MEDIA_ATTACHED, () => {
					hls.loadSource(source);
					hls.on(Hls.Events.MANIFEST_PARSED, () => {
						const stations = [
							{
								name: '東京駅',
								position: {
									lat: 35.681391,
									lng: 139.766103,
								},
								stop: {
									time: 1 * 60 * 60 + 2 * 60 + 53,
									lat: 35.6793655,
									lng: 139.7717826,
								},
								start: {
									time: 50,
									lat: 35.6814192,
									lng: 139.7665856,
									heading: 20,
								},
							},
							{
								name: '神田駅',
								position: {
									lat: 35.691173,
									lng: 139.770641,
								},
								stop: {
									time: 2 * 60 + 24,
									lat: 35.691246,
									lng: 139.7703846,
									heading: 110,
								},
								start: {
									time: 2 * 60 + 51,
									lat: 35.6917173,
									lng: 139.7708927,
									heading: 20,
								},
							},
							{
								name: '秋葉原駅',
								position: {
									lat: 35.6984366,
									lng: 139.7725862,
								},
								stop: {
									time: 4 * 60 + 3,
									lat: 35.6981776,
									lng: 139.7724399,
									heading: 0,
								},
								start: {
									time: 4 * 60 + 35,
									lat: 35.6989598,
									lng: 139.7730944,
									heading: 10,
								},
							},
							{
								name: '御徒町駅',
								position: {
									lat: 35.7075424,
									lng: 139.7748604,
								},
								stop: {
									time: 6 * 60 + 2,
									lat: 35.7077169,
									lng: 139.7745715,
									heading: 100,
								},
								start: {
									time: 6 * 60 + 24,
									lat: 35.7075424,
									lng: 139.7748604,
									heading: 80,
								},
							},
							{
								name: '上野駅',
								position: {
									lat: 35.7118578,
									lng: 139.7750612,
								},
								stop: {
									time: 7 * 60 + 38,
									lat: 35.7117179,
									lng: 139.7746234,
									heading: 60,
								},
								start: {
									time: 8 * 60 + 10,
									lat: 35.7138553,
									lng: 139.7762292,
									heading: 30,
								},
							},
							{
								name: '鶯谷駅',
								position: {
									lat: 35.7224921,
									lng: 139.7777414,
								},
								stop: {
									time: 9 * 60 + 47,
									lat: 35.722625,
									lng: 139.777626,
									heading: 140,
								},
								start: {
									time: 10 * 60 + 2,
									lat: 35.7206777,
									lng: 139.7789994,
									heading: 50,
								},
							},
							{
								name: '日暮里駅',
								position: {
									lat: 35.7281866,
									lng: 139.7705508,
								},
								stop: {
									time: 11 * 60 + 26,
									lat: 35.7285934,
									lng: 139.7705298,
									heading: 135,
								},
								start: {
									time: 11 * 60 + 48,
									lat: 35.7268496,
									lng: 139.7717551,
									heading: 185,
								},
							},
							{
								name: '西日暮里駅',
								position: {
									lat: 35.731954,
									lng: 139.766857,
								},
								stop: {
									time: 13 * 60,
									lat: 35.732401,
									lng: 139.7668722,
									heading: 150,
								},
								start: {
									time: 13 * 60 + 20,
									lat: 35.7328284,
									lng: 139.7661718,
									heading: 40,
								},
							},
							{
								name: '田端駅',
								position: {
									lat: 35.7381826,
									lng: 139.7608168,
								},
								stop: {
									time: 14 * 60 + 38,
									lat: 35.7384731,
									lng: 139.7604637,
									heading: 135,
								},
								start: {
									time: 15 * 60 + 39,
									lat: 35.7378638,
									lng: 139.7611815,
									heading: 135,
								},
							},
							{
								name: '駒込駅',
								position: {
									lat: 35.7365665,
									lng: 139.7470098,
								},
								stop: {
									time: 17 * 60 + 29,
									lat: 35.7365445,
									lng: 139.7466427,
									heading: 100,
								},
								start: {
									time: 17 * 60 + 47,
									lat: 35.7365665,
									lng: 139.7470098,
									heading: 30,
								},
							},
							{
								name: '巣鴨駅',
								position: {
									lat: 35.733445,
									lng: 139.739303,
								},
								stop: {
									time: 19 * 60 + 11,
									lat: 35.7331077,
									lng: 139.7391041,
									heading: 0,
								},
								start: {
									time: 19 * 60 + 33,
									lat: 35.733705,
									lng: 139.740349,
									heading: 180,
								},
							},
							{
								name: '大塚駅',
								position: {
									lat: 35.731412,
									lng: 139.728584,
								},
								stop: {
									time: 21 * 60 + 17,
									lat: 35.73203,
									lng: 139.7288373,
									heading: 190,
								},
								start: {
									time: 21 * 60 + 37,
									lat: 35.7317847,
									lng: 139.7282266,
									heading: 100,
								},
							},
							{
								name: '池袋駅',
								position: {
									lat: 35.7294456,
									lng: 139.7097995,
								},
								stop: {
									time: 23 * 60 + 59,
									lat: 35.7296177,
									lng: 139.7097667,
									heading: 175,
								},
								start: {
									time: 24 * 60 + 50,
									lat: 35.730714,
									lng: 139.7113547,
									heading: 190,
								},
							},
							{
								name: '目白駅',
								position: {
									lat: 35.7214227,
									lng: 139.7066629,
								},
								stop: {
									time: 26 * 60 + 30,
									lat: 35.7216652,
									lng: 139.7067437,
									heading: 210,
								},
								start: {
									time: 26 * 60 + 47,
									lat: 35.7212142,
									lng: 139.7065027,
									heading: 180,
								},
							},
							{
								name: '高田馬場駅',
								position: {
									lat: 35.7134059,
									lng: 139.7043957,
								},
								stop: {
									time: 28 * 60 + 10,
									lat: 35.7136833,
									lng: 139.704425,
									heading: 0,
								},
								start: {
									time: 28 * 60 + 52,
									lat: 35.7125766,
									lng: 139.7039104,
									heading: 200,
								},
							},
							{
								name: '新大久保駅',
								position: {
									lat: 35.7013327,
									lng: 139.7001202,
								},
								stop: {
									time: 30 * 60 + 40,
									lat: 35.7014713,
									lng: 139.7000584,
									heading: 190,
								},
								start: {
									time: 30 * 60 + 58,
									lat: 35.7015914,
									lng: 139.7002797,
									heading: 360,
								},
							},
							{
								name: '新宿駅',
								position: {
									lat: 35.6894189,
									lng: 139.7003344,
								},
								stop: {
									time: 32 * 60 + 34,
									lat: 35.6891152,
									lng: 139.7004108,
									heading: 340,
								},
								start: {
									time: 33 * 60 + 15,
									lat: 35.6903759,
									lng: 139.7001677,
									heading: 350,
								},
							},
							{
								name: '代々木駅',
								position: {
									lat: 35.683061,
									lng: 139.702042,
								},
								stop: {
									time: 34 * 60 + 30,
									lat: 35.6827942,
									lng: 139.7017499,
								},
								start: {
									time: 34 * 60 + 58,
									lat: 35.6836579,
									lng: 139.7022067,
								},
							},
							{
								name: '原宿駅',
								position: {
									lat: 35.670646,
									lng: 139.702592,
								},
								stop: {
									time: 36 * 60 + 54,
									lat: 35.6716537,
									lng: 139.7031403,
								},
								start: {
									time: 37 * 60 + 21,
									lat: 35.6719139,
									lng: 139.7027732,
								},
							},
							{
								name: '渋谷駅',
								position: {
									lat: 35.658871,
									lng: 139.701238,
								},
								stop: {
									time: 39 * 60 + 20,
									lat: 35.6594818,
									lng: 139.7005607,
								},
								start: {
									time: 40 * 60 + 7,
									lat: 35.6581003,
									lng: 139.7017417,
								},
							},
							{
								name: '恵比寿駅',
								position: {
									lat: 35.646685,
									lng: 139.71007,
								},
								stop: {
									time: 41 * 60 + 57,
									lat: 35.6471815,
									lng: 139.7092447,
								},
								start: {
									time: 42 * 60 + 22,
									lat: 35.6458634,
									lng: 139.7104994,
								},
							},
							{
								name: '目黒駅',
								position: {
									lat: 35.633923,
									lng: 139.715775,
								},
								stop: {
									time: 44 * 60 + 28,
									lat: 35.6348296,
									lng: 139.7150799,
								},
								start: {
									time: 44 * 60 + 51,
									lat: 35.6343411,
									lng: 139.7156561,
								},
							},
							{
								name: '五反田駅',
								position: {
									lat: 35.625974,
									lng: 139.723822,
								},
								stop: {
									time: 46 * 60 + 30,
									lat: 35.6261615,
									lng: 139.7230412,
								},
								start: {
									time: 46 * 60 + 54,
									lat: 35.6260015,
									lng: 139.7238537,
								},
							},
							{
								name: '大崎駅',
								position: {
									lat: 35.619772,
									lng: 139.728439,
								},
								stop: {
									time: 48 * 60 + 18,
									lat: 35.6198037,
									lng: 139.7290026,
								},
								start: {
									time: 49 * 60 + 9,
									lat: 35.619413,
									lng: 139.7282937,
								},
							},
							{
								name: '品川駅',
								position: {
									lat: 35.62876,
									lng: 139.738999,
								},
								stop: {
									time: 51 * 60 + 33,
									lat: 35.6290385,
									lng: 139.7375822,
								},
								start: {
									time: 52 * 60 + 10,
									lat: 35.6272461,
									lng: 139.7384984,
								},
							},
							{
								name: '田町駅',
								position: {
									lat: 35.645736,
									lng: 139.747575,
								},
								stop: {
									time: 54 * 60 + 34,
									lat: 35.6467503,
									lng: 139.7471308,
								},
								start: {
									time: 55 * 60 + 17,
									lat: 35.6460441,
									lng: 139.7482284,
								},
							},
							{
								name: '浜松町駅',
								position: {
									lat: 35.655391,
									lng: 139.757135,
								},
								stop: {
									time: 57 * 60 + 10,
									lat: 35.6565287,
									lng: 139.7572208,
								},
								start: {
									time: 57 * 60 + 34,
									lat: 35.6543929,
									lng: 139.7568126,
								},
							},
							{
								name: '新橋駅',
								position: {
									lat: 35.666195,
									lng: 139.758587,
								},
								stop: {
									time: 59 * 60 + 14,
									lat: 35.6656133,
									lng: 139.7580549,
								},
								start: {
									time: 59 * 60 + 40,
									lat: 35.6659993,
									lng: 139.7588406,
								},
							},
							{
								name: '有楽町駅',
								position: {
									lat: 35.675441,
									lng: 139.763806,
								},
								stop: {
									time: 1 * 60 * 60 + 1 * 60 + 19,
									lat: 35.6750066,
									lng: 139.7624748,
								},
								start: {
									time: 1 * 60 * 60 + 1 * 60 + 33,
									lat: 35.674286,
									lng: 139.7621131,
								},
							},
						];
						const startLatLng = new googleMaps.LatLng(
							stations[0].start.lat,
							stations[0].start.lng
						);
						const map = new googleMaps.Map(el.map, {
							center: startLatLng,
							zoom: 17,
							mapTypeId: 'roadmap',
						});
						const panorama = new googleMaps.StreetViewPanorama(
							el.panorama,
							{
								position: startLatLng,
								pov: {
									heading: stations[0].start.heading,
									pitch: 0,
									zoom: 0,
								},
							}
						);
						map.setStreetView(panorama);

						let startStation = 0;
						let stopStation = 0;
						let position = {};

						stations.forEach((station, index) => {
							station.marker = new googleMaps.Marker({
								position: {
									lat: station.position.lat,
									lng: station.position.lng,
								},
								map: map,
								title: station.name,
								icon: {
									url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
								},
								visible: false,
							});
							googleMaps.event.addListener(
								station.marker,
								'click',
								() => {
									position = panorama.getPosition();
									if (
										getDistance(
											position,
											station.position
										) < 0.1
									) {
										el.modalLayer.style.display = 'flex';
										el.modalLayer.style.opacity = 1;
										el.modalLayer.style.backgroundColor =
											'rgba(0, 0, 0, 0.6)';
										el.modalLayer.innerHTML = `<div><h2 class="white">${station.name}に着きました</h2><p id="submit" class="white button">乗車する</p><p id="cancel" class="white button">キャンセル</p></<div>`;
										document
											.getElementById('submit')
											.addEventListener('click', () => {
												new gsap.timeline()
													.to(
														[
															el.container,
															el.modalLayer,
														],
														1,
														{
															opacity: 0,
															onComplete: () => {
																googleMaps.event.removeListener(
																	listener
																);
																el.map.style.opacity = 0;
																el.map.style.width =
																	'0';
																el.panorama.style.width =
																	'100%';
																googleMaps.event.trigger(
																	panorama,
																	'resize'
																);
																googleMaps.event.trigger(
																	map,
																	'resize'
																);
																el.modalLayer.innerHTML =
																	'';
																el.dice.style.display =
																	'block';
																el.diceLayer.style.opacity = 1;
																el.diceLayer.style.display =
																	'flex';
																startStation =
																	index;
																panorama.setPosition(
																	new googleMaps.LatLng(
																		stations[
																			startStation
																		].start.lat,
																		stations[
																			startStation
																		].start.lng
																	)
																);
																panorama.setPov(
																	{
																		heading:
																			stations[
																				startStation
																			]
																				.start
																				.heading,
																		pitch: 0,
																		zoom: 0,
																	}
																);
															},
														}
													)
													.to(el.container, 1, {
														opacity: 1,
														delay: 1,
														onComplete: () => {
															next();
														},
													});
											});
										document
											.getElementById('cancel')
											.addEventListener('click', () => {
												el.modalLayer.style.display =
													'none';
											});
									}
								}
							);
						});

						// オープニング
						el.h1 = document.createElement('h1');
						el.h1.classList.add('white');
						el.modalLayer.appendChild(el.h1);

						new gsap.timeline()
							.to(el.h1, 1, {
								opacity: 1,
								delay: 3,
								onStart: () => {
									el.h1.innerHTML = 'ここは東京駅';
								},
							})
							.to(el.h1, 1, {
								opacity: 0,
								delay: 3,
							})
							.to(el.h1, 1, {
								opacity: 1,
								delay: 1,
								onStart: () => {
									el.h1.innerHTML =
										'ひとつのサイコロから<br>新たな旅が始まる';
								},
							})
							.to(el.h1, 1, {
								opacity: 0,
								delay: 3,
							})
							.to(el.h1, 1, {
								opacity: 1,
								delay: 1,
								onStart: () => {
									el.h1.innerHTML =
										'山手線内回り<br>ぶらり途中下車の旅';
								},
							})
							.to(el.h1, 1, {
								opacity: 0,
								delay: 3,
								onComplete: () => {
									el.modalLayer.removeChild(el.h1);
									next();
								},
							});

						function next() {
							el.dice.style.display = 'block';
							el.map.style.width = '0';
							el.map.style.display = 'none';
							el.panorama.style.width = '100%';
							stations.forEach((station) => {
								station.marker.setVisible(false);
							});
							new gsap.timeline().to(el.dice, 1, {
								opacity: 1,
								delay: 1,
								onComplete: () => {
									el.dice.style.cursor = 'pointer';
									el.dice.addEventListener(
										'click',
										(event) => {
											event.currentTarget.classList.add(
												'bound'
											);
											start();
										},
										{
											once: true,
										}
									);
									el.dice.addEventListener(
										'mouseenter',
										(event) => {
											event.currentTarget.style.cursor =
												'pointer';
										}
									);
									el.dice.addEventListener(
										'mouseleave',
										(event) => {
											event.currentTarget.style.cursor =
												'default';
										}
									);
								},
							});
						}

						let number; // サイコロの出目
						let i; // サイコロの画像制御用の変数
						let j; // サイコロの画像制御用の変数
						let s; // サイコロの回転数確認用の変数
						const jArray = [4, 1, 3, 1, 3, 2]; // 出目に対応した画像URLを作るためにjに入れる数字の配列

						//賽の目の決定
						function start() {
							i = 4; // サイコロの画像制御用の変数
							j = 1; // サイコロの画像制御用の変数
							s = 0; // サイコロの回転数確認用の変数

							number = Math.floor(Math.random() * 6) + 1; // 1～6の間で一つランダムな数字をnumberに代入
							//number = 3;
							j = jArray[number - 1]; // jArrayから出目に応じた順番の中身を取り出し変数jに取り出す
							if (number === 3 || number === 4 || number === 6) {
								// 出目が3.4.6の時
								rollingDice('b'); // 引数に'b'を渡しrollingDice()を実行
							} else {
								// 出目が1,2,5の時
								rollingDice('a'); // 引数に'a'を渡しrollingDice()を実行
							}
						}

						//サイコロが転がる動き
						function rollingDice(n) {
							const tumbleDice = setInterval(() => {
								if (s <= 16) {
									if (i < 4) {
										const imageURL =
											'images/' +
											n +
											j +
											'_' +
											i +
											'.png';
										dice.src = imageURL;
										i++;
									} else {
										const imageURL =
											'images/' +
											n +
											j +
											'_' +
											i +
											'.png';
										dice.src = imageURL;
										i = 1;
										if (j < 4) {
											j++;
										} else {
											j = 1;
										}
									}
									s++;
								} else {
									clearInterval(tumbleDice);
									s = 0;
									i = 4;
									setVideo();
								}
							}, 70);
						}

						function setVideo() {
							//再生位置の取得
							stopStation = startStation + number;
							if (stopStation > stations.length - 1)
								stopStation = 0;
							el.video.currentTime =
								stations[startStation].start.time;
							el.video.play();
							el.video.addEventListener('timeupdate', timeUpdate);
							new gsap.timeline()
								.to([el.container, el.diceLayer], 3, {
									opacity: 0,
									delay: 2,
									onComplete: () => {
										el.dice.style.opacity = 0;
										el.dice.style.display = 'none';
										el.dice.classList.remove('bound');
										el.diceLayer.style.display = 'none';
										el.modalLayer.style.display = 'none';
										el.video.style.display = 'block';
									},
								})
								.to(el.video, 3, {
									opacity: 1,
								});
						}

						let circle = null;
						let markers = [];
						let infowindows = [];
						let prePlace = null;
						let step = 0;
						let index = 0;
						let listener = null;

						function timeUpdate(event) {
							if (
								el.video.currentTime >
								stations[stopStation].stop.time
							) {
								event.currentTarget.removeEventListener(
									'timeupdate',
									timeUpdate
								);
								new gsap.timeline()
									.to(el.video, 3, {
										opacity: 0,
										onComplete: () => {
											el.video.pause();
											el.video.style.display = 'none';
											el.map.style.opacity = 1;
											el.map.style.display = 'block';
											[el.map, el.panorama].forEach(
												(element) => {
													element.style.width = '50%';
												}
											);
											googleMaps.event.trigger(
												panorama,
												'resize'
											);
											googleMaps.event.trigger(
												map,
												'resize'
											);
											step = 10;
											listener =
												googleMaps.event.addListener(
													panorama,
													'position_changed',
													positionChanged
												);
											panorama.setPosition(
												new googleMaps.LatLng(
													stations[
														stopStation
													].stop.lat,
													stations[
														stopStation
													].stop.lng
												)
											);
											panorama.setPov({
												heading:
													stations[stopStation].stop
														.heading,
												pitch: 0,
												zoom: 0,
											});
											position = panorama.getPosition();
											map.setCenter(
												new googleMaps.LatLng(
													position.lat(),
													position.lng()
												)
											);
											map.setZoom(17);
										},
									})
									.to(el.container, 3, {
										opacity: 1,
									});
							}
						}

						function positionChanged() {
							position = panorama.getPosition();
							if (step >= 10) {
								index = 0;
								step = 0;

								map.setCenter(
									new googleMaps.LatLng(
										position.lat(),
										position.lng()
									)
								);
								if (circle) circle.setMap(null);
								circle = new googleMaps.Circle({
									center: new googleMaps.LatLng(
										position.lat(),
										position.lng()
									),
									map: map,
									radius: 100,
									fillColor: 'rgba(0, 0, 255, 0.4)',
								});

								if (markers.length) {
									markers.forEach((marker) => {
										marker.setMap(null);
									});
									markers = [];
								}

								// 非同期処理を同期処理にする
								getPlacesInCircle().then((response) => {
									response.places.forEach((place) => {
										Promise.resolve()
											.then(() => {
												return place;
											})
											.then(setMarker)
											.catch((error) => {
												console.error(error);
											});
									});
								});
							} else {
								step++;
							}

							// マーカーの書き出し
							function setMarker(place) {
								return new Promise(() => {
									const placeData = {};
									let prefix = '';
									if (place.hotel) {
										prefix = place.hotel[0].hotelBasicInfo;
										placeData.placePosition = {
											lat: parseFloat(prefix.latitude),
											lng: parseFloat(prefix.longitude),
										};
										placeData.title = prefix.hotelName;
										placeData.icon =
											'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
									} else if (place.name) {
										placeData.placePosition = {
											lat: parseFloat(place.lat),
											lng: parseFloat(place.lng),
										};
										placeData.title = place.name;
										placeData.icon =
											'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
									}
									if (
										getDistance(
											position,
											placeData.placePosition
										) < 0.1
									) {
										let description = '';
										if (prefix.hotelName) {
											description += `<h1 style="margin-bottom: 5px;">${prefix.hotelName}</h1>
												<img style="display: block; margin: 0 auto; max-height: 110px;" src="${prefix.hotelImageUrl}">`;
										} else if (place.name) {
											description += `<h1 style="margin-bottom: 5px;">${place.name}</h1>
												<img style="display: block; margin: 0 auto; max-height: 110px;" src="${place.photo.pc.m}">`;
										}
										infowindows[index] =
											new googleMaps.InfoWindow({
												content: description,
											});

										markers[index] = new googleMaps.Marker({
											position: placeData.placePosition,
											map: map,
											title: placeData.title,
											icon: {
												url: placeData.icon,
											},
										});

										googleMaps.event.addListener(
											markers[index],
											'click',
											((marker, index) => {
												return () => {
													infowindows[index].open(
														map,
														markers[index]
													);
													if (
														Number.isInteger(
															prePlace
														)
													)
														infowindows[
															prePlace
														].close();
													prePlace = index;
													if (
														getDistance(
															position,
															placeData.placePosition
														) < 0.05
													) {
														infowindows[
															index
														].close();
														if (
															Number.isInteger(
																prePlace
															)
														)
															infowindows[
																prePlace
															].close();
														prePlace = null;
														if (place.hotel) {
															if (
																!prefix.reviewAverage
															)
																prefix.reviewAverage =
																	'未評価';
															el.modalLayer.style.opacity = 1;
															el.modalLayer.style.display =
																'flex';
															el.modalLayer.style.backgroundColor =
																'rgba(0, 0, 0, 0.6)';
															el.modalLayer.innerHTML = `<div id="modal-inner"><div id="modal-left"><img src="${prefix.hotelImageUrl}" alt="${prefix.hotelName}"></div>
													<div id="modal-right"><div><h2 class="white">${prefix.hotelName}</h2><p class="white">${prefix.hotelSpecial}</p><p class="white">総合評価：${prefix.reviewAverage}</p><p id="submit" class="white button">宿泊する</p><p id="cancel" class="white button">キャンセル</p></div></div></div>`;
														} else if (place.name) {
															el.modalLayer.style.opacity = 1;
															el.modalLayer.style.display =
																'flex';
															el.modalLayer.style.backgroundColor =
																'rgba(0, 0, 0, 0.6)';
															el.modalLayer.innerHTML = `<div id="modal-inner"><div id="modal-left"><img src="${place.photo.pc.l}" alt="${place.name}"></div>
													<div id="modal-right"><div><h2 class="white">${place.name}</h2><p class="white">${place.catch}</p><p id="submit" class="white button">入店する</<p><p id="cancel" class="white button">キャンセル</p></div></div></div>`;
														}

														document
															.getElementById(
																'submit'
															)
															.addEventListener(
																'click',
																() => {
																	new gsap.timeline()
																		.to(
																			[
																				el.container,
																				el.modalLayer,
																			],
																			3,
																			{
																				opacity: 0,
																			}
																		)
																		.to(
																			el.container,
																			3,
																			{
																				opacity: 1,
																				delay: 2,
																				onStart:
																					() => {
																						el.modalLayer.style.display =
																							'none';
																						if (
																							stopStation ===
																							0
																						) {
																							el.container.classList.add(
																								'ending'
																							);
																							el.container.innerHTML =
																								'<h1 class="white">お疲れさまでした！</h1>';
																						} else {
																							if (
																								prePlace
																							)
																								infowindows[
																									prePlace
																								].close();
																							prePlace =
																								null;
																							stations.forEach(
																								(
																									station
																								) => {
																									station.marker.setVisible(
																										true
																									);
																								}
																							);
																						}
																					},
																			}
																		);
																}
															);

														document
															.getElementById(
																'cancel'
															)
															.addEventListener(
																'click',
																() => {
																	el.modalLayer.style.display =
																		'none';
																}
															);
													}
												};
											})(markers[index], index)
										);
										index++;
									}
								});
							}
						}

						function getPlacesInCircle() {
							return new Promise((resolve, reject) => {
								const url = './php/getPlacesInCircle.php';
								const data = {
									lng: position.lng(),
									lat: position.lat(),
									searchRadius: '0.1',
									range: '1',
								};
								getData(url, data)
									.then((response) => {
										const places = {};
										if (response.places.hotels) {
											places.hotels =
												response.places.hotels.hotels;
										} else {
											places.hotels = [];
										}
										if (response.places.shops) {
											places.shops =
												response.places.shops.results.shop;
										} else {
											places.shops = [];
										}
										const concatPlaces =
											places.hotels.concat(places.shops);
										if (concatPlaces.length) {
											resolve({
												places: concatPlaces,
											});
										} else {
											reject({
												places: '該当なし',
											});
										}
									})
									.catch(() => {
										reject({
											places: '該当なし',
										});
									});
							});
						}

						function getDistance(mk1, mk2) {
							const R = 6371.071; // Radius of the Earth in miles
							const rlat1 = mk1.lat() * (Math.PI / 180);
							// Convert degrees to radians
							const rlat2 = mk2.lat * (Math.PI / 180);
							// Convert degrees to radians
							const difflat = rlat2 - rlat1; // Radian difference (latitudes)
							const difflng =
								(mk2.lng - mk1.lng()) * (Math.PI / 180); // Radian difference (longitudes)
							const d =
								2 *
								R *
								Math.asin(
									Math.sqrt(
										Math.sin(difflat / 2) *
											Math.sin(difflat / 2) +
											Math.cos(rlat1) *
												Math.cos(rlat2) *
												Math.sin(difflng / 2) *
												Math.sin(difflng / 2)
									)
								);
							return d;
						}

						function getData(url, data) {
							return new Promise((resolve, reject) => {
								let first = true;
								let parameter = '';
								for (let key in data) {
									if (first) {
										parameter += '?';
										first = false;
									} else {
										parameter += '&';
									}
									parameter +=
										key +
										'=' +
										encodeURIComponent(data[key]);
								}

								const xhr = new XMLHttpRequest();
								//xhr.responseType = 'JSON';
								xhr.open('GET', url + parameter, true);
								xhr.addEventListener('load', (event) => {
									if (event.target.status === 200) {
										if (xhr.responseText) {
											resolve(
												JSON.parse(xhr.responseText)
											);
										} else {
											reject('レスポンスがありません。');
										}
									} else {
										reject(
											'サーバーエラーが発生しました。'
										);
									}
								});
								xhr.send(null);
							});
						}
					});
				});
			}
		}
	});
});
