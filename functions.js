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
		setTaskInEachRow(task);
		return;
	} else {
		let timeStart = task[0];
		let timeEnd = task[1];
		for(i = 0; i < tasksArr.length; i++) {
			if(timeStart < tasksArr[i][0]) {
				tasksArr.splice(i, 0, task);
				setTaskInEachRow(task);
				return;
			} else if(timeStart == tasksArr[i][0]) {
				if(timeEnd > tasksArr[i][1]) {
					tasksArr.splice(i, 0, task);
					setTaskInEachRow(task);
					return;
				} else {
					tasksArr.splice(i + 1, 0, task);
					setTaskInEachRow(task);
					return;					
				}
				tasksArr.splice(i, 0, task);
				setTaskInEachRow(task);
				return;
			}
		}
		tasksArr.push(task);
		setTaskInEachRow(task);
		return;		
	}
}

// const setTaskInEachRow2= () => {
// 	for(i = 0; i < tasksArr.length; i++) {
// 		for(j = 0; j < TIME_SPAN.length; j++){
// 			if(TIME_SPAN[j] >= tasksArr[i][0] && TIME_SPAN[j] <= tasksArr[i][1]) taskInEachRow[j].push(i);
// 		}
// 		console.log(tasksArr, taskInEachRow);		
// 	}
// }

const setTaskInEachRow = (task) => {
	for(i = 0; i < TIME_SPAN.length; i++){
		if(TIME_SPAN[i] >= task[0] && TIME_SPAN[i] <= task[1]) {
			taskInEachRow[i].push(tasksArr.indexOf(task));
		}
	}		
}

const setNumConflictingTasks = () => {
	let numConflictingTasks = 0;
	for(i = 0; i < tasksArr.length; i++) {
		taskInEachRow.forEach(function(row) {
			if(row.indexOf(i) >= 0 && row.length > numConflictingTasks) numConflictingTasks = row.length;
		});
		tasksArr[i][3] = numConflictingTasks;
	}
}

const findMaxNumColumns = () => {
	let maxCol = 0; 
	taskInEachRow.forEach(function(row) {
		if(row.length > maxCol) maxCol = row.length;
	});
	return maxCol;
}

const setTable = () => {
	//let maxCol = findMaxNumColumns();
	taskInEachRow.forEach(function(row) {
		
	});
}