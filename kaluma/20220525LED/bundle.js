/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
const led = 25;
pinMode(led, OUTPUT);
setInterval(() => {
  digitalToggle(led);
}, 1000);
/******/ })()
;