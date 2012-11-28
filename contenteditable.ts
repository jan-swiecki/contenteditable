///<reference path='jquery.d.ts'/>

module contenteditable
{

	var $:JQueryStatic = jQuery;

	// Converts localized float string into float
	// i.e. if string has `comma` it is converted
	// into `dot` and then into float. If no comma
	// is found then it is converted into float.
	function strFloatToFloat(t: string): number
	{
		var i: number, v: number;
		i = t.indexOf(",");
		if(i !== -1)
		{
			v = parseFloat(t.substr(0,i)+"."+t.substr(i+1));
		}
		else
		{
			v = parseFloat(t);
		}
		return v;
	}

	function content2value($t:JQuery): any
	{
		// return number
		if($t.hasClass('is-number'))
		{
			if($t.hasClass("is-float"))
			{
				return strFloatToFloat($t.text());
			}
			else
			{
				return parseInt($t.text());
			}
		}
		// return string
		else
		{
			return $t.text();
		}
	}

	// When we start editing contenteditable .set_quantity
	// convert content to int and store it in data().value
	// of its container.
	$(document).on("focus", "[contenteditable]", function(event)
	{
		// var i,v:number,t:string,$t = $(event.target);
		var $t:JQuery = $(event.target);
		
		// save .text() inside .data().value
		$t.data().value = content2value($t);
	});

	// handle pressing `enter` on contenteditables
	// - trigger blur
	// - prevent default
	$(document).keypress(function(event)
	{
		var $t;
		if(event.which === 13 && typeof ($t=$(event.target)).attr("contenteditable") !== 'undefined')
		{
			$t.trigger("blur");
			return false;
		}
	});

	// save data on `blur` event
	$(document).on("blur", "[contenteditable]", function(event)
	{
		var oldValue = $(this).data().value;
		var newValue = content2value($(this));
		$(this).trigger("change", [newValue,oldValue]);
	});

}