//to add a size

// attach to click

// get value

// create element
function sortFunction(a, b) {
    if (a[0] === b[0]) {
    	if (a[1] == b[1]){
    		return 0;
    	}
    	else{

        return (a[1] < b[1]) ? -1 : 1;
    	}
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}



function binary_contains(point,array){
	if (array.length === 0){
		return false;
	}
	var middle = array[Math.floor(array.length/2)]
	var array = array
	if(point[0] === middle[0] && point[1] === middle[1]  ){
			return true;
		}

	if (array.length > 1){
		if (sortFunction(point,middle) === -1 ){
			return binary_contains(point,array.slice(0,Math.floor(array.length/2)));
		}
		else 
		{
			return binary_contains(point,array.slice(Math.floor(array.length/2)));
		};
	}
	else{

	return false;
	};

}

var contains_point = function(point,array){
	return binary_contains(point,array);
}



var plot_point = function(array){
	track_iteration()

	var array = array;
	var grid = document.getElementById("test_id").children[0];
	var population_div = document.getElementById("population");
	population_div.innerHTML = (array.length + " cells")

	var points = "";
	var i;
	for (i = 0; i < array.length; i++){
		if( i > 0 ){
			points  += ", "
		};
		var point = array[i];
		
		var x_point =  point['0'] * 5 + 'px';
	    var y_point =  point['1'] * 5 + 'px';
	    points += ( x_point +" "+y_point+" black" )
	};
	grid.style.boxShadow=points;

    };


var neighbors = function(x,y){
	var x = x;
	var y = y;
	return	 [[(x + 1), y],
			 [(x - 1), y],
			 [(x + 1), (y + 1) ],
			 [(x -1 ), ( y - 1 )],
			 [(x + 1 ), (y - 1 ) ],
			 [( x - 1), (y + 1 )],
			 [ x, ( y + 1 )],
			 [ x, (y - 1)]]
};


var neighbors_count = function(x,y,cells){
	//takes a sorted array
	var count = 0;
	var to_check = neighbors(x,y);
	var cells = cells;

	for (item in to_check){	
		if ( contains_point(to_check[item],cells) ){
			count += 1;
			};
		};

	return count;
};



var next_state = function(cells){

	var next_states = [];
	var cells = cells;
	var checked = {}
	for (point in cells){


		var count = neighbors_count(cells[point][0],cells[point][1], cells);
	

		if (2 === count || count === 3 ){
			
			if (!contains_point(cells[point], next_states)){
				 next_states.push(cells[point]);



				
				
			    };
			checked[[cells[point]]] = count;
		};


		var neighbor = neighbors(cells[point][0],cells[point][1]);
		
		
		
		
		for (item in neighbor) {
			next_states.sort(sortFunction);
			var xy = neighbor[item];
			if(checked[[xy[0],xy[1]]] === undefined){
				checked[[xy[0],xy[1]]] = neighbors_count(xy[0],xy[1],cells);
				
			};
			var cell_count = checked[[xy[0],xy[1]]];
			


			if ( cell_count === 3 ){

				if (!contains_point(xy,next_states)){
				 next_states.push(xy);

				
				
			    };
			};
		    };

		};
	



	return next_states.sort(sortFunction);
};

var track_iteration = function(iteration){
	var iteration = iteration;
	var iteration_div = document.getElementById("iteration");
	iteration_div.innerHTML =  iteration +" iterations";
}

var test_inputs = [];
 

var intID;
var next;

var run_sim = function() {
	next = test_inputs;
	var x = 0;
	track_iteration(x)


    intID = setInterval(function() { x = x +1;  plot_point(next); 
    	    next = next_state(next); track_iteration(x); }, 300);

	

	};
var clear_sim = function() {
	stop_sim();
	test_inputs = [];
	plot_point(test_inputs);
	track_iteration(0)
}

var stop_sim = function() {
	clearInterval(intID);
	test_inputs = next;
}


var add_points = function(){

	
	var added_cells = document.getElementById("cells").value 

	var grid_size = 70;
	var i;

	for( i=0;i < added_cells; i++ ){
		 var x = Math.floor(Math.random() * (grid_size -1)) + 1;
		 var y = Math.floor(Math.random() * (grid_size -1)) + 1;
		test_inputs.push([x,y]);
	};
	test_inputs.sort(sortFunction);
	plot_point(test_inputs);
	track_iteration('0');
}


add_points();
run_sim();
document.getElementById('start').onclick=run_sim;
document.getElementById("stop").onclick=stop_sim;
document.getElementById("clear").onclick=clear_sim;

document.getElementById("add_cells").onclick=add_points;


