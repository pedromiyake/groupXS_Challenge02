const setDropDownTimeStart = () => {
	for(var i = 0; i < TIME_SPAN.length; i++){
		var option = new Option(TIME_SPAN[i], TIME_SPAN[i]);
		$( "#time-start" ).append(option);
	}
}

const setDropDownTimeEnd = (timeStart) => {
	$( "#time-end" ).children("option:not(:first)").remove();
	for(var i = 0; i < TIME_SPAN.length; i++){
		if (i > TIME_SPAN.indexOf(timeStart, 1)) {
			var option = new Option(TIME_SPAN[i], TIME_SPAN[i]);
			$( "#time-end" ).append(option);
		}
	}
}

const checkInputFields = (task) => {
	let timeStart = task[0];
	let timeEnd = task[1];	
	if(timeStart == null || timeStart == '' || timeStart == 'Select' || timeEnd == null || timeEnd == '' || timeEnd == 'Select') {
		alert("Fill the start and end times for the task.");
		return false;
	}
	return true;
}

const addTaskToTasksArr = (task) => {
	if(tasksArr.length == 0 ) {
		tasksArr.push(task);
		return;
	} else {
		let timeStart = task[0];
		let timeEnd = task[1];
		for(i = 0; i < tasksArr.length; i++) {
			if(timeStart < tasksArr[i][0]) {
				tasksArr.splice(i, 0, task);
				return;
			} else if(timeStart == tasksArr[i][0]) {
				if(timeEnd > tasksArr[i][1]) {
					tasksArr.splice(i, 0, task);
					return;
				} else {
					tasksArr.splice(i + 1, 0, task);
					return;					
				}
				tasksArr.splice(i, 0, task);
				return;
			}
		}
		tasksArr.push(task);
		return;		
	}
}

const setTaskInEachRow = () => {
	tasksArr.forEach((task) => {
		for(i = 0; i < TIME_SPAN.length; i++){
			if(TIME_SPAN[i] >= task[0] && TIME_SPAN[i] < task[1]) {
				taskInEachRow[i].push(tasksArr.indexOf(task));
			}
		}
	});		
}

const findMaxNumColumns = () => {
	maxNumColumns = 0;
	for(i = 0; i < tasksArr.length; i++) {
		for(j = 0; j < taskInEachRow.length; j++) {
			if(taskInEachRow[j].indexOf(i) >= 0 && taskInEachRow[j].length > maxNumColumns) maxNumColumns = taskInEachRow[j].length;
		}
	}
}

const createTableArr = () => {
	tableArr = [];
	for(i = 0; i < TIME_SPAN.length; i++) { 
		row = [];
		for(j = 0; j < maxNumColumns; j++) { 
			row.push('-');
		}	
		tableArr.push(row);
	}	
}

const populateTableArr = () => {
	for(k = 0; k < tasksArr.length; k++) {
		let tableArrCol = 0;
		let taskColumnStart = 0;
		while(tableArrCol < maxNumColumns) {
			let taskRowStart = TIME_SPAN.indexOf(tasksArr[k][0]);
			let taskRowEnd = TIME_SPAN.indexOf(tasksArr[k][1]);
			let countFreeSpaces = 0;
			for(i = taskRowStart; i < taskRowEnd; i++) {
				if(tableArr[i][tableArrCol] == '-') countFreeSpaces +=1;
			}
			if(countFreeSpaces == (taskRowEnd - taskRowStart)) {
				for(i = taskRowStart; i < taskRowEnd; i++) {
					tableArr[i][tableArrCol] = k;
				}
				taskColumnStart = tableArrCol;
				tableArrCol = maxNumColumns;
			} else {
				tableArrCol += 1;
			}
		}
		tasksArr[k][3] = taskColumnStart;
	}
}

const ajustColumnsWidth = () => {
	for(k = 0; k < tasksArr.length; k++) {
		let taskRowStart = TIME_SPAN.indexOf(tasksArr[k][0]);
		let taskRowEnd = TIME_SPAN.indexOf(tasksArr[k][1]);
		let taskColumnStart = tasksArr[k][3];
		let countFreeSpaces = 0;
		while(taskColumnStart < maxNumColumns - 1) {
			for(i = taskRowStart; i < taskRowEnd; i++) {
				if(tableArr[i][taskColumnStart + 1] == '-') countFreeSpaces += 1;
			}
			if(countFreeSpaces != (taskRowEnd - taskRowStart)) break;
			for(i = taskRowStart; i < taskRowEnd; i++) {
				tableArr[i][taskColumnStart + 1] = k;
				countFreeSpaces = 0;
			}
			taskColumnStart += 1;
		}

	}
}

const displaySchedule = () => {
	colGroup = '';
	for(i = 0; i < maxNumColumns; i++) {
		colGroup += '<col>';
	}
	$("#col-tasks").html(colGroup);
	$("#date-today-weekday").attr("colspan", maxNumColumns);

	for(i = 0; i < tableArr.length; i++) {
		rowContent = '<td>' + TIME_SPAN[i] + '</td>';
		for(j = 0; j < maxNumColumns; j++) {
			if(tableArr[i][j] == '-') {
				rowContent += '<td class="no-border"></td>';
			} else {
				rowContent += '<td class="no-border" style="background-color:' + tasksArr[tableArr[i][j]][2] + ';"></td>';
			}
		}
		$("#row-" + i).html(rowContent);
	}
}

const returnDate = () => {
	let date = new Date();
	var day = date.getDate();	
	var month = date.getMonth()+1;
	let year = date.getFullYear();
	return (day<10 ? '0' : '') + day + '.' + (month<10 ? '0' : '') + month + '.' + year;
}