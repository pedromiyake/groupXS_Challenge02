$(document).ready(function(){

	setDropDownTimeStart();

	$( "#time-start" ).change(function(){
		setDropDownTimeEnd($( "#time-start" ).children( "option:selected" ).val());
	});

	//Calcular tarifas para cada plano on button click
	$( "#add-task" ).click( () => {
		let newTask = [$( "#time-start" ).val(), $( "#time-end" ).val(), $( "#task-color" ).val()];

		if(checkInputFields(newTask)) {
			pushTaksToTasksArr(newTask);
			setNumConflictingTasks();
			console.log(tasksArr);
		};
	});

});