(function($, undefined){
	
	var Field = acf.models.DatePickerField.extend({
		
		type: 'inline_date_time_picker',
		
		$control: function(){
			return this.$('.acf-date-time-picker');
		},
		
		initialize: function(){
			
			// vars
			var $input = this.$input();						// hidden
			var $inputText = this.$('.calendar-inline');	// inline DIV

			// args
			var args = {
				dateFormat:			this.get('date_format'),
				timeFormat:			this.get('time_format'),
				altField:			$input,
				altFieldTimeOnly:	false,
				altFormat:			'yy-mm-dd',
				altTimeFormat:		'HH:mm:ss',
				changeYear:			true,
				yearRange:			"-100:+100",
				changeMonth:		true,
				showButtonPanel:	true,
				firstDay:			this.get('first_day'),
				controlType: 		'select',
				oneLine:			true,
			};
			
			// filter
			args = acf.applyFilters('inline_date_time_picker_args', args, this);
			
			// add date time picker
			acf.newInlineDateTimePicker( $inputText, args );
			
			// action
			acf.doAction('inline_date_time_picker_init', $inputText, args, this);
		}
	});
	
	acf.registerFieldType( Field );
	
	
	// manager
	var inlineDateTimePickerManager = new acf.Model({
		priority: 5,
		wait: 'ready',
		initialize: function(){
			
			// vars
			var locale = acf.get('locale');
			var rtl = acf.get('rtl');
			var l10n = acf.get('DateTimePickerL10n');
			
			// bail ealry if no l10n
			if( !l10n ) {
				return false;
			}
			
			// bail ealry if no datepicker library
			if( typeof $.timepicker === 'undefined' ) {
				return false;
			}
			
			// rtl
			l10n.isRTL = rtl;
			
			// append
			$.timepicker.regional[ locale ] = l10n;
			$.timepicker.setDefaults(l10n);
		}
	});
	
	
	// add
	acf.newInlineDateTimePicker = function( $input, args ){
		
		// bail ealry if no datepicker library
		if( typeof $.timepicker === 'undefined' ) {
			return false;
		}
		
		// defaults
		args = args || {};
		
		// Remember date/time
		$date = args.altField[0].value;

		// initialize
		$picker = $input.datetimepicker( args );

		// update to current datetime.
		$picker.datetimepicker('setDate', (new Date($date)) );
		
		// wrap the datepicker (only if it hasn't already been wrapped)
		if( $('body > #ui-datepicker-div').exists() ) {
			$('body > #ui-datepicker-div').wrap('<div class="acf-ui-datepicker" />');
		}
	};
	
})(jQuery);