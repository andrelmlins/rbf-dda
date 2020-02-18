# RBF DDA

Radial Basis Function (RBF) with Dynamic Decay Adjustment (DDA) algorithm.

[![npm version](https://badge.fury.io/js/rbf-dda.svg)](https://www.npmjs.com/package/rbf-dda) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/andrelmlins/rbf-dda/blob/master/LICENSE) [![Build Status](https://travis-ci.com/andrelmlins/rbf-dda.svg?branch=master)](https://travis-ci.com/andrelmlins/rbf-dda)

## Install

```
npm install rbf-dda
```

or

```
yarn add rbf-dda
```

## Usage

```js
const RBFDDA = require("rbf-dda");

const points = [
  [5.1, 3.5, 1.4, 0.2],
  [5.5, 2.6, 4.4, 1.2],
  [4.7, 3.2, 1.3, 0.2],
  [7.1, 3.0, 5.9, 2.1],
  [6.3, 2.5, 4.9, 1.5]
];

const classes = [
  "Iris-setosa",
  "Iris-versicolor",
  "Iris-setosa",
  "Iris-virginica",
  "Iris-versicolor"
];

const rbfdda = new RBFDDA(points, classes);
rbfdda.training();

const classValue = rbfdda.classification([5.8, 2.6, 4.0, 1.2]);

console.log(classValue); // => Iris-versicolor
```

## NPM Statistics

Download stats for this NPM package

[![NPM](https://nodei.co/npm/rbf-dda.png)](https://nodei.co/npm/rbf-dda/)

## License

RBF DDA is open source software [licensed as MIT](https://github.com/andrelmlins/rbf-dda/blob/master/LICENSE).
