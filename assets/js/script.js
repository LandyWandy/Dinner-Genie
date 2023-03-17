//header time and date
function displayTime() {
    var time = dayjs().format('MMM D, YYYY [at] hh:mm:ss a')
    $('#current-time-date').text(time);
    console.log(time)
}

var formEl = $('#project-form');
var nameInputEl = $('#project-name');
var dateInputEl = $('#datepicker');
var projectListEl = $('#project-type');
var submitBtn = $('#submit');
var projectListEl = $('#project-list');

var printProjects = function (name, date) {
	var listEl = $('<li>');
	var listDetail = name.concat(' on ', date);
	listEl.addClass('list-group-item').text(listDetail);
	listEl.appendTo(projectListEl);
  };

var handleFormSubmit = function (event) {
	event.preventDefault();
  
	var nameInput = nameInputEl.val();
	var dateInput = dateInputEl.val();
	setItem("project", )
	if (!nameInput || !dateInput) {
	  console.log('You need to fill out the form!');
	  return;
	}
  
	printProject(nameInput, dateInput);
  
	nameInputEl.val('');
	dateInputEl.val('');
  };
  
  formEl.on('submit', handleFormSubmit);

  $(function () {
	var projectNames = [
	  'Bootstrap',
	  'C',
	  'C++',
	  'CSS',
	  'Express.js',
	  'Git',
	  'HTML',
	  'Java',
	  'JavaScript',
	  'jQuery',
	  'JSON',
	  'MySQL',
	  'Node.js',
	  'NoSQL',
	  'PHP',
	  'Python',
	  'React',
	  'Ruby',
	];
	$('#project-name').autocomplete({
	  source: projectNames,
	});
  });
  
  // Datepicker widget
  $(function () {
	$('#datepicker').datepicker({
	  changeMonth: true,
	  changeYear: true,
	});
  });
  
  // Add interaction here
  $( function() {
	$( "#project-list" ).sortable();
  } );
  
// var myModal = document.getElementById('myModal')
// var myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', function () {
//   myInput.focus()
// })

displayTime()

const currentYear = 2023;
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'Octomber',
	'November',
	'December'
];
const colors = ['#2d6b5f', '#72e3a6', '#dff4c7', '#edbf98', '#ea3d36'];
const defaultColor = '#888';
let activeColor = '';

const calendar = document.getElementById('calendar');
const moods = document.querySelectorAll('.mood');
const randomize = document.querySelector('#randomize');
const clear = document.querySelector('#clear');

moods.forEach(mood => {
	mood.addEventListener('click', () => {
		// if is already selected, deselect it
		if (mood.classList.contains('selected')) {
			mood.classList.remove('selected');
			activeColor = defaultColor;
		} else {
			moods.forEach(mood => {
				mood.classList.remove('selected');
			});

			mood.classList.add('selected');
			activeColor = getComputedStyle(mood).getPropertyValue('color');
		}
	});
});

const getAllDays = year => {
	// First day of the year - 1st January
	const firstDay = new Date(`January 1 ${year}`);
	// Last day of the year - 31th December - used to stop adding days to the array
	const lastDay = new Date(`December 31 ${year}`);

	// Add first day
	const days = [firstDay];

	// Used to keep track of the day
	let lastDayInArray = firstDay;
	
	// Loop while there are new days to be added in the current year
	while (lastDayInArray.getTime() !== lastDay.getTime()) {
		days.push(addDays(lastDayInArray, 1));
		lastDayInArray = days[days.length - 1];
	}

	return days;
};

const dates = getAllDays(currentYear);

let monthsHTML = '';

// Loop over the months and create a div for each month
months.forEach((month, idx) => {
	monthsHTML += `<div class="months month_${idx}">
        <h3>${month}</h3>
        <div class="week_days_container">
            ${weekDays
							.map(day => `<div class="week_days">${day}</div>`)
							.join('')}
        </div>
        <div class="days_container"></div>
    </div>`;
});

calendar.innerHTML = monthsHTML;

// Loop over each day and
dates.forEach(date => {
	const month = date.getMonth();
	const monthEl = document.querySelector(`.month_${month} .days_container`);

	// create extra day slots if needed before day 1
	if (date.getDate() === 1 && date.getDay() !== 0) {
		for (let i = 0; i < date.getDay(); i++) {
			const emptySpot = createEmptySpot();

			monthEl.appendChild(emptySpot);
		}
	}

	const dateEl = createDateEl(date);

	monthEl.appendChild(dateEl);
});

// Add click event to all the .circles
const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
	circle.addEventListener('click', () => {
		circle.style.backgroundColor = activeColor;
	});
});

// Randomize functionality
randomize.addEventListener('click', () => {
	circles.forEach(circle => {
		circle.style.backgroundColor = getRandomColor();
	});
});

// Clear functionality
clear.addEventListener('click', () => {
	circles.forEach(circle => {
		circle.style.backgroundColor = defaultColor;
	});
});

function getRandomColor() {
	return colors[Math.floor(Math.random() * 5)];
}

function createDateEl(date) {
	const day = date.getDate();
	const dateEl = document.createElement('div');
	dateEl.classList.add('days');
	dateEl.innerHTML = `<span class="circle">${day}</span>`;

	return dateEl;
}

function createEmptySpot() {
	const emptyEl = document.createElement('div');
	emptyEl.classList.add('days');

	return emptyEl;
}

// function from StackOverflow: https://stackoverflow.com/questions/563406/add-days-to-javascript-date
function addDays(date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

submitBtn.click(function(){
	console.log("Hello")
})
