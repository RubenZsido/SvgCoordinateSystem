# Coordinate System SVG Helper
This JavaScript module helps create SVG coordinate systems in HTML. It provides a visual reference for SVG elements by drawing axes and ticks.

![image of the coordinate system](https://i.ibb.co/b3KdFMg/Screenshot-2024-10-03-191948.png)

## Usage
Include the Script
First, include the coordinateSystem.js script in your HTML file:
```html
<script src="./coordinateSystem.js"/>
```

## Creating a Coordinate System
To create a coordinate system, you need an Svg first. You can create one that has its center(0, 0) coordinates in the middle you can use code like this:

### Example
```js
//create svg element
const width = 1024;
const height = 512;
const minX = -(width / 2);
const minY = -(height / 2);
const svgNS = 'http://www.w3.org/2000/svg';
const svgElem = document.createElementNS(svgNS, 'svg');
svgElem.setAttribute('viewBox', minX + ' ' + minY + ' ' + width + ' ' + height);
svgElem.setAttribute('width', width);
svgElem.setAttribute('height', height);
svgElem.setAttribute('style', 'border: 1px solid magenta');
svgElem.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');

//get the parent element from the DOM
const parent = document.getElementById('parent');
parent.appendChild(svgElem);
```

To create a coordinate system, call the createCoordinateSystem function with an SVG element and optional parameters for the range and tick settings.
```js
const coordinateSystem = createCoordinateSystem(svgElem, rangeX, rangeY, gapBetweenLines, biggerTickInterval);
```
### Optional Variables:
```js
// The width of the coordinate system in pixels
const rangeX = 512; 
// The height of the coordinate system in pixels
const rangeY = 512; 
// The distance (in pixels) between each line in the coordinate system grid
const gapBetweenLines = 10; 
// The interval at which larger ticks are drawn on the grid (every 5 lines)
const biggerTickInterval = 5; 
// Creates the coordinate system using the specified parameters
const coordinateSystem = createCoordinateSystem(svgElem, rangeX, rangeY, gapBetweenLines, biggerTickInterval);
```

## Change Color
To change the color of the coordinate system go into coordinateSystem.js and change the color on line 3
```js
const color = 'black';
```
