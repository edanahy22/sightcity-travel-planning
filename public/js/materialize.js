// $(document).ready(function () {
//     $("input[class*='datepicker-']").datepicker({
//         selectMonths: true,
//         selectYears: 10,
//         format: 'yyyy-mm-dd',  
//         onSet: function (obj) {
//             let thisPicker = $(this)[0].$node;
//             let classes = thisPicker.attr("class");
//             if (classes === undefined || classes.length === 0 || classes.indexOf("datepicker-start") < 0) {
//                 return;
//             }
//             let parent1 = thisPicker.parent("#wrapper1"); // This picker's parent 
//             let parent2 = parent1.sibling("#wrapper2"); // Next picker's parent let picker2 =
//             parent2.child(".datepicker-end"); 
//             if (obj.select) {
//                 let dt = new Date(obj.select);
//                 picker2.datepicker('picker').set('min', dt);
//             }
//             if (obj.hasOwnProperty('clear')) {
//                 picker2.datepicker('picker').set('min', false);
//             }
//         }
//     });
// });

// // Create default dates
// var date = new Date();
// // set default date for #from (1 week from today)
// var nextWeekFrom = new Date(date.setDate(date.getDate() + 14));
// // Default date for #to
// var nextWeekTo = new Date(date.setDate(nextWeekFrom.getDate() + 14));
// //Set min date for #to
// var minDateTo = new Date(date.setDate(nextWeekFrom.getDate() + 1));


// // SET OPTIONS FOR FROM DATEPICKER
// var optionsFrom = {
//     format: "yyyy-mm-dd",
// 	minDate: new Date(),
// 	defaultDate: new Date(nextWeekFrom),
// 	setDefaultDate: true,
// 	autoClose: true,
// 	onSelect: function(el) {
// 		const ell = new Date(el);
// 		const setMM = ell.getDate() + 1;
// 		const setM = new Date(ell.setDate(setMM));
// 		setMinTo(setM);
// 	}
// };


// // SET OPTIONS FOR TO DATEPICKER
// var optionsTo = {
//     format: "yyyy-mm-dd",
// 	minDate: new Date(minDateTo),
// 	defaultDate: new Date(nextWeekTo),
// 	setDefaultDate: true,
// 	autoClose: true
// };


// // INITIATE DATEPICKERS
// $(document).ready(function() {
// 	var $from = $("#start1").datepicker(optionsFrom);
// 	var $to = $("#end1").datepicker(optionsTo);
// });


// // FUNCTION TO SET MINIMUM DATE WHEN FROM DATE SELECTED
// var setMinTo = function(vad) {
// 	// Get the current date set on #to datepicker
// 	var instance = M.Datepicker.getInstance($("#end1"));
// 	instance.options.minDate = vad;

// 	// Check if the #from date is greater than the #to date and modify by 1 day if true.
// 	if (new Date(instance) < vad) {
// 		instance.setDate(vad);
// 		$("#end1").val(instance.toString());
// 	}
// };



//Datepicker function
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {autoClose: true});
  });

//Navbar desktop and mobile function
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {edge: true});
  });