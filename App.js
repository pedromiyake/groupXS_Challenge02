$(document).ready(function(){

	setDropDownTimeStart();

	$( "#time-start" ).change(function(){
		setDropDownTimeEnd($( "#time-start" ).children( "option:selected" ).val());
	});

	$( "#add-task" ).

	$( "#add-task" ).click( () => {
		let newTask = [$( "#time-start" ).val(), $( "#time-end" ).val(), $( "#task-color" ).val()];
		taskInEachRow = [[], [], [], [],
							[], [], [], [],
							[], [], [], [],
							[], [], [], [],
							[], [], [], [],
							[], [], [], [],
							[], [], [],];
		if(checkInputFields(newTask)) {
			//create arrays of tasks
			pushTaksToTasksArr(newTask);
			setTaskInEachRow();
			console.log(taskInEachRow);
			setStartingColumn();
			setStartAndEndRows()
			console.log(tasksArr);
			findMaxNumColumns();
			console.log(maxNumColumns);
			// calculate variables for table design
			
			buildTableArr();
			console.log(tableArr);
			displaySchedule();


		};
	});

});