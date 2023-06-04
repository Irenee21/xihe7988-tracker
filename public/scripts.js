
/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: https://modernizr.com/download/#-cssanimations-csstransitions-touch-shiv-cssclasses-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */

/**
 * boxlayout.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * https://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */

var Boxlayout = (function () {

	var $el = $('#bl-main'),
		$sections = $el.children('section'),
		// works section
		$sectionWork = $('#bl-work-section'),
		// work items
		$workItems = $('#bl-work-items > li'),
		// work panels
		$workPanelsContainer = $('#bl-panel-work-items'),
		$workPanels = $workPanelsContainer.children('div'),
		totalWorkPanels = $workPanels.length,
		// navigating the work panels
		$nextWorkItem = $workPanelsContainer.find('nav > span.bl-next-work'),
		// if currently navigating the work items
		isAnimating = false,
		// close work panel trigger
		$closeWorkItem = $workPanelsContainer.find('nav > span.bl-icon-close'),
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		// transition end event name
		transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
		// support css transitions
		supportTransitions = Modernizr.csstransitions;

	function init() {
		initEvents();
	}

	function initEvents() {

		$sections.each(function () {

			var $section = $(this);

			// expand the clicked section and scale down the others
			$section.on('click', function () {

				if (!$section.data('open')) {
					$section.data('open', true).addClass('bl-expand bl-expand-top');
					$el.addClass('bl-expand-item');
				}

			}).find('span.bl-icon-close').on('click', function () {

				// close the expanded section and scale up the others
				$section.data('open', false).removeClass('bl-expand').on(transEndEventName, function (event) {
					if (!$(event.target).is('section')) return false;
					$(this).off(transEndEventName).removeClass('bl-expand-top');
				});

				if (!supportTransitions) {
					$section.removeClass('bl-expand-top');
				}

				$el.removeClass('bl-expand-item');

				return false;

			});

		});

		// clicking on a work item: the current section scales down and the respective work panel slides up
		$workItems.on('click', function (event) {

			// scale down main section
			$sectionWork.addClass('bl-scale-down');

			// show panel for this work item
			$workPanelsContainer.addClass('bl-panel-items-show');

			var $panel = $workPanelsContainer.find("[data-panel='" + $(this).data('panel') + "']");
			currentWorkPanel = $panel.index();
			$panel.addClass('bl-show-work');

			return false;

		});

		// navigating the work items: current work panel scales down and the next work panel slides up
		$nextWorkItem.on('click', function (event) {

			if (isAnimating) {
				return false;
			}
			isAnimating = true;

			var $currentPanel = $workPanels.eq(currentWorkPanel);
			currentWorkPanel = currentWorkPanel < totalWorkPanels - 1 ? currentWorkPanel + 1 : 0;
			var $nextPanel = $workPanels.eq(currentWorkPanel);

			$currentPanel.removeClass('bl-show-work').addClass('bl-hide-current-work').on(transEndEventName, function (event) {
				if (!$(event.target).is('div')) return false;
				$(this).off(transEndEventName).removeClass('bl-hide-current-work');
				isAnimating = false;
			});

			if (!supportTransitions) {
				$currentPanel.removeClass('bl-hide-current-work');
				isAnimating = false;
			}

			$nextPanel.addClass('bl-show-work');

			return false;

		});

		// clicking the work panels close button: the current work panel slides down and the section scales up again
		$closeWorkItem.on('click', function (event) {

			// scale up main section
			$sectionWork.removeClass('bl-scale-down');
			$workPanelsContainer.removeClass('bl-panel-items-show');
			$workPanels.eq(currentWorkPanel).removeClass('bl-show-work');

			return false;

		});

	}

	return { init: init };

})();

// Initialize an empty array to store the user input data
let userInputData = [];

let data_list = document.querySelector(".data-list");

let card = document.createElement("div");
card.setAttribute("class", "card");

let heading = document.createElement("h1");
let paragraph = document.createElement("p");
paragraph.innerHTML = `Energy: ${userInputData.taskEnergy} 
<br> Mood: ${userInputData.taskMood}`;

   // Append all the sub elements to the card container
   card.appendChild(heading);
   card.appendChild(paragraph);

   data_list.appendChild(card);

// Get form element
const form = document.getElementById('taskform');

// Add event listener to form submission
form.addEventListener('submit', function (e) {
	e.preventDefault(); // Prevent form submission

	// Get form field values
	const taskName = document.getElementById('taskName').value;
	const taskCategory = document.getElementById('taskCategory').value;
	const taskMood = Array.from(document.querySelectorAll('.checkbox-container input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
	const taskEnergy = parseInt(document.getElementById('taskEnergy').value);
	const taskTime = [
		document.getElementsByName('taskTime')[0].value,
		document.getElementsByName('taskTime')[1].value
	];
	const taskComments = document.getElementById('taskComments').value;

	// Create an object to store the current user input data
	const userData = {
		taskName,
		taskCategory,
		taskMood,
		taskEnergy,
		taskTime,
		taskComments
	};

	// Push the current user input data into the array
	userInputData.push(userData);

	// Save the updated array to local storage
	localStorage.setItem('userInputData', JSON.stringify(userInputData));

	updateCards();
});

// Retrieve userInputData from local storage
const userInputData_1 = JSON.parse(localStorage.getItem('userInputData'));

// Extract taskTime and taskEnergy from userInputData
const taskTimeArray = userInputData_1.map(data => data.taskTime);
const taskEnergyArray = userInputData_1.map(data => data.taskEnergy);

// Create an array of x-axis values (taskTime)
const xAxisValues = taskTimeArray.flatMap(time => time);

let stored_data = JSON.parse(localStorage.getItem('userInputData'))

// Retrieving the values from local storage
const taskName = localStorage.getItem('taskName');
const taskCategory = localStorage.getItem('taskCategory');
const taskMood = JSON.parse(localStorage.getItem('taskMood'));
const taskEnergy = parseInt(localStorage.getItem('taskEnergy'));
const taskTime = JSON.parse(localStorage.getItem('taskTime'));



function updateCards() {
	if (stored_data !== null) {
		stored_data.forEach((userInputData) => {
			let listItem = document.createElement('li');
			listItem.innerHTML = `<div class='card'><h1>${userInputData.taskName}</h1>
			Exercise Energy:${userInputData.taskEnergy}kj <br/> Exercise Category: ${userInputData.taskCategory}</div>`
			data_list.appendChild(listItem)
		})
	}
}
updateCards();

// Define custom styling options
const layout = {
	title: 'Task Energy over Time',
	xaxis: {
		title: 'Task Time',
		tickangle: -45,
		tickfont: {
			size: 12,
			color: 'black'
		}
	},
	yaxis: {
		title: 'Task Energy',
		tickfont: {
			size: 12,
			color: 'black'
		}
	},
	bargap: 0.1,
	bargroupgap: 0.2
};

// Create a Plotly bar graph with custom styling
const data = [{
	x: xAxisValues,
	y: taskEnergyArray,
	type: 'bar',
	marker: {
		color: 'rgb(63, 127, 191)',
		line: {
			color: 'rgb(31, 95, 155)',
			width: 1.5
		}
	}
}];

Plotly.newPlot('chart-container', data, layout);

// Function to update the bar graph
function updateBarGraph() {
	// Retrieve userInputData from local storage
	const userInputData = JSON.parse(localStorage.getItem('userInputData'));

	// Create arrays to store data for each trace
	const xData = [];
	const yData = [];

	// Iterate over userInputData and extract taskTime and taskEnergy
	userInputData.forEach(data => {
		const startTime = new Date(`2000-01-01 ${data.taskTime[0]}`);
		const finishTime = new Date(`2000-01-01 ${data.taskTime[1]}`);
		const period = finishTime.getTime() - startTime.getTime();
		const periodInMinutes = Math.floor(period / (1000 * 60)); // Convert to minutes

		xData.push(periodInMinutes);
		yData.push(data.taskEnergy);
	});

	// Create an array of trace objects
	const traces = [{
		x: xData,
		y: yData,
		type: 'bar'
	}];

	// Define the layout options for the bar graph
	const layout = {
		title: 'Task Energy vs. Period',
		xaxis: {
			title: 'Period (minutes)'
		},
		yaxis: {
			title: 'Task Energy'
		}
	};

	// Update the data of the existing plot
	Plotly.update('chart-container', traces, layout);
}

// Initial rendering of the bar graph
Plotly.newPlot('chart-container', [], {});

// Call the updateBarGraph() function initially
updateBarGraph();
