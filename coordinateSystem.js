const coordinateSvgNS = 'http://www.w3.org/2000/svg';

const color = 'black';
const createTick = (g, value, tickSize, isVertical, featuredTick, gap) => {
	const line = document.createElementNS(coordinateSvgNS, 'line');

	const x = isVertical ? 'x' : 'y';
	const y = isVertical ? 'y' : 'x';
	if (value % (gap * featuredTick) === 0 && value != 0) {
		//big tick with number
		const text = document.createElementNS(coordinateSvgNS, 'text');
		text.setAttribute(x, value);
		text.setAttribute(y, tickSize * 1.5);
		text.setAttribute('font-size', 16);
		text.setAttribute('fill', color);
		text.setAttribute('text-anchor', isVertical ? 'middle' : 'start');
		text.setAttribute('dominant-baseline', isVertical ? 'hanging' : 'middle');
		text.textContent = value;
		g.appendChild(text);
		line.setAttribute(y + '1', -tickSize);
		line.setAttribute(y + '2', tickSize);
	} else {
		//small tick without number
		line.setAttribute(y + '1', -(tickSize / 2));
		line.setAttribute(y + '2', tickSize / 2);
	}
	//set position to the value
	line.setAttribute(x + '1', value);
	line.setAttribute(x + '2', value);

	line.setAttribute('stroke', color);
	line.setAttribute('stroke-width', 1);
	g.appendChild(line);
};

const createCoordinateSystem = (svgElem, rangeX = 512, rangeY = 512, tickGap = 10, featuredTick = 5) => {
	const tickSize = 10;
	rangeX = [-(rangeX / 2), rangeX / 2];
	rangeY = [-(rangeY / 2), rangeY / 2];
	//create parent group
	const g = document.createElementNS(coordinateSvgNS, 'g');
	g.classList.add('coordinate-system');
	//axis x line
	const lineX = document.createElementNS(coordinateSvgNS, 'line');
	lineX.setAttribute('x1', rangeX[0]);
	lineX.setAttribute('x2', rangeX[1]);
	lineX.setAttribute('y1', 0);
	lineX.setAttribute('y2', 0);
	lineX.setAttribute('stroke', color);
	lineX.setAttribute('stroke-width', 2);
	g.appendChild(lineX);

	//axis x arrow
	const arrowX = document.createElementNS(coordinateSvgNS, 'polygon');
	arrowX.setAttribute('points', `${rangeX[1]},0 ${rangeX[1] - 10},-5 ${rangeX[1] - 10},5`);
	arrowX.setAttribute('fill', color);
	g.appendChild(arrowX);

	//vertical ticks along x axis
	for (let i = 0; i < rangeX[1]; i += tickGap) {
		createTick(g, i, tickSize, true, featuredTick, tickGap);
	}

	for (let i = 0; i > rangeX[0]; i -= tickGap) {
		createTick(g, i, tickSize, true, featuredTick, tickGap);
	}

	//axis y line
	const lineY = document.createElementNS(coordinateSvgNS, 'line');
	lineY.setAttribute('x1', 0);
	lineY.setAttribute('x2', 0);
	lineY.setAttribute('y1', rangeY[0]);
	lineY.setAttribute('y2', rangeY[1]);
	lineY.setAttribute('stroke', color);
	lineY.setAttribute('stroke-width', 2);
	g.appendChild(lineY);

	//axis y arrow
	const arrowY = document.createElementNS(coordinateSvgNS, 'polygon');
	arrowY.setAttribute('points', `0,${rangeY[1]} -5,${rangeY[1] - 10} 5,${rangeY[1] - 10}`);
	arrowY.setAttribute('fill', color);
	g.appendChild(arrowY);

	//horizontal ticks along y axis
	for (let i = 0; i < rangeY[1]; i += tickGap) {
		createTick(g, i, tickSize, false, featuredTick, tickGap);
	}

	for (let i = 0; i > rangeY[0]; i -= tickGap) {
		createTick(g, i, tickSize, false, featuredTick, tickGap);
	}

	svgElem.appendChild(g);
	return g;
};
