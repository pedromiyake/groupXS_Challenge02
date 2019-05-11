//get date today

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

const pushTaksToTasksArr = (task) => {
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


// CORRIGIR
const setStartingColumn = () => {
	for(i = 0; i < tasksArr.length; i++) {
		let startingColumn = 0;
		for(j = 0; j < taskInEachRow.length; j++) {
			if(taskInEachRow[j].indexOf(i) > startingColumn) startingColumn = taskInEachRow[j].indexOf(i);
		}
		tasksArr[i][3] = startingColumn;
	}
}

const setStartAndEndRows = () => {
	let startingColumn = 0;
	for(i = 0; i < tasksArr.length; i++) {
		for(j = 0; j < taskInEachRow.length; j++) {
			if(taskInEachRow[j].indexOf(i) > startingColumn) startingColumn = taskInEachRow[j].indexOf(i);
		}
		tasksArr[i][4] = TIME_SPAN.indexOf(tasksArr[i][0]);
		tasksArr[i][5] = TIME_SPAN.indexOf(tasksArr[i][1]) - 1;
	}
}

const findMaxNumColumns = () => {
	maxNumColumns = 0;
	for(i = 0; i < tasksArr.length; i++) {
		for(j = 0; j < taskInEachRow.length; j++) {
			if(taskInEachRow[j].indexOf(i) >= 0 && taskInEachRow[j].length > maxNumColumns) maxNumColumns = taskInEachRow[j].length;
		}
	}
}

const buildTableArr = () => {
	tableArr = [];
	for(i = 0; i < taskInEachRow.length; i++) {
		let rowArr = []; 
		for(j = 0; j < maxNumColumns; j++) {
			rowArr.push('-');
		}
		tableArr.push(rowArr);
	}
	console.log(taskInEachRow);
	for(k = 0; k < tasksArr.length; k++) {
		for(i = 0; i < tableArr.length; i++) {
			for(j = 0; j < maxNumColumns; j++) {
				if(j == tasksArr[k][3] && i >= tasksArr[k][4]  && i <= tasksArr[k][5]) tableArr[i][j] = k;
			}
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
		//$("#row-" + i).html("");
		rowContent = '<td>' + TIME_SPAN[i] + '</td>';
		for(j = 0; j < maxNumColumns; j++) {
			console.log(i, j, tableArr[i][j]);
			if(tableArr[i][j] == '-') {
				rowContent += '<td class="no-border"></td>';
			} else {
				rowContent += '<td class="no-border" style="background-color:' + tasksArr[tableArr[i][j]][2] + ';"></td>';
			}
		}
		$("#row-" + i).html(rowContent);
	}

}