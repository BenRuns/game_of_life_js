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

var plot_point = function(x,y){

	var grid = document.getElementById("test_id").children[0];
	var x_point =  (x * 5) + 'px';
	var y_point =  -(y * 5) + 'px';
	grid.setProperty('box-shadow', x_point+" "+y_point+" #ffffff" );
};

var add_thing = function(){
	
	var test = document.getElementById("test_id");
	test.style.color = 'red';
	var grid_size = document.getElementById("grid_size").value * 5 ;

	test.style.width = grid_size + 'px';
	test.style.height = grid_size + 'px';
	

};


var plot_point = function(array){
	var array = array;
	var grid = document.getElementById("test_id").children[0];
	var points = "";
	var i;
	for (i = 0; i < array.length; i++){
		if( i > 0 ){
			points  += ", "
		};
		var point = array[i];
		
		var x_point =  point['0'] * 5 + 'px';
	    var y_point =  point['1'] * 5 + 'px';
	    points += ( x_point +" "+y_point+" #ffffff" )
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
	cells.sort(sortFunction);
	for (point in cells){


		var count = neighbors_count(cells[point][0],cells[point][1], cells);
	

		if (2 === count || count === 3 ){
			
			if (!contains_point(cells[point], next_states)){
				 next_states.push(cells[point]);


				
				
			    };
		};


		var neighbor = neighbors(cells[point][0],cells[point][1]);
		
		
		
		
		for (item in neighbor) {
			next_states.sort(sortFunction);
			var xy = neighbor[item];
			

			if ( neighbors_count(xy[0],xy[1], cells) === 3 ){

				if (!contains_point(xy,next_states)){
				 next_states.push(xy);

				
				
			    };
			};
		    };

		};

	return next_states
};

var test_inputs = [[2,15],[2,14],[2,13],[1,13],[0,14]];

var intID;
var next;
var run_sim = function() {
	next = test_inputs;
	


    intID = setInterval(function() {plot_point(next); next = next_state(next); }, 500);

	

	};
var clear_sim = function() {
	stop_sim();
	test_inputs = [];
	plot_point(test_inputs);
}

var stop_sim = function() {
	clearInterval(intID);
	test_inputs = next;
}


var add_points = function(){
	var user_input = document.getElementById("grid_size").value 
	var added_cells = document.getElementById("cells").value 

	var grid_size = user_input > 25 ? user_input : 25;
	var i;

	for( i=0;i < added_cells; i++ ){
		 var x = Math.floor(Math.random() * (grid_size -1)) + 1;
		 var y = Math.floor(Math.random() * (grid_size -1)) + 1;
		test_inputs.push([x,y]);
	};
	plot_point(test_inputs);
}


document.getElementById('start').onclick=run_sim;
document.getElementById("stop").onclick=stop_sim;
document.getElementById("clear").onclick=clear_sim;

document.getElementById("add_cells").onclick=add_points;



document.getElementById('test_button').onclick=add_thing;