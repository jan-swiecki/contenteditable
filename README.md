# ContentEditable handler

### This is a alpha, not for production use.

When loaded this scripts triggers "change" event when DOM element with attribute `contenteditable` blurs (i.e. "blur" event is triggered). Event is triggered with two parameters: `newValue` and `oldValue` (see description).

### Quickstart

	<div contenteditable>w00t</div>

	<script src="jquery.js">
	<script src="contenteditable.js">

	<script>
	    $("div").on("change",function(event,newValue,oldValue) {
	    	console.log(newValue); // will output your new value
	    	console.log(oldValue); // will output w00t
	    });
    </script>

And edit `div` applying changes with ENTER.

Note: this script supports numbers (see below).

### Description

NOTE: this script modifies default browser behaviour: when you edit `contenteditable` and press enter then "blur" event is triggered.

"change" event is fired with two arguments:
`newValue`, `oldValue`:

  * `oldValue` is a value before user edited
             DOM element (i.e. before user clicked on it)
             
  * `newValue` is a value after edit (i.e. after "blur" event)

This could be true: `newValue === oldValue` (e.g. user clicked on DOM element and then clicked somewhere else without editing anything).

DOM elements with css class `is-number` will be treated as follows:

  1. If DOM element has css class `is-float` (i.e
     it has `is-number` and `is-float` classes) then
     it is treated as container of a float number.
     
     Note: `,` (comma) will be treated as `.` (dot). E.g. `1,00` --> `1.00` and `1.00` --> `1.00`.

  2. If DOM element DOESN'T have css class `is-float`
     then it is treated as container of a integer number.
 
In both cases below statements are true:

  * `typeof newValue === 'number'`
  * `typeof oldValue === 'number'`
  
In case there is no `is-number` class:

  * `typeof newValue === 'string'`
  * `typeof oldValue === 'string'`
  
Other types (e.g. "object", "function") are not (yet) supported.

Note: this script uses delegated events (see "Direct and delegated events" in [http://api.jquery.com/on/](http://api.jquery.com/on/)), so it will still work after you dynamically load new HTML.

## Misc

Script uses jQuery (and therefore jQuery object should be available when script is loaded).

Script was developed using jQuery 1.8.0 and was written in [TypeScript](http://www.typescriptlang.org/).