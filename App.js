$(document).ready(function(){

	setDropDownTimeStart();

	$( "#time-start" ).change(function(){
		setDropDownTimeEnd($( "#time-start" ).children( "option:selected" ).val());
	});

	$( "#date-today-weekday" ).text(returnDate());

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
			
			addTaskToTasksArr(newTask);
			setTaskInEachRow();
			findMaxNumColumns();
			createTableArr();
			populateTableArr();
			ajustColumnsWidth();
			displaySchedule();

		};
	});

});