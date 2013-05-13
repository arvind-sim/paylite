var min_amount = 999;
var annual_apr = 0.36;
var monthly_apr_split = 0.015;
var monthly_apr_mindue = 0.03;
var minimum_due_rate = 0.05;
var prev_tv_img = '#image_1';
var main_tv_img = '#image_1';
var calc_click_img = new Image(152,55);
var calc_norm_img = new Image(152,55);
var calc_hover_img = new Image(152,55);
      
var tenures_array = [6,12,24,36,48];


var PayliteCalculator = {
  init: function(){
	  
	calc_click_img.src = './images/button_calculate_click.png';
	calc_hover_img.src = './images/button_calculate_over.png';
	calc_norm_img.src = './images/button_calculate_norm.png';
	
    $('#purchase_amount').blur(function() {
	  //PayliteCalculator.populate_payment_amount();
    });
    $('#calculate').click(function() {
      PayliteCalculator.calculate_results();
    });
    
    $('#calculate_img').mouseover(function(){
      $(this).attr("src", calc_hover_img.src);
    });

    $('#calculate_img').mouseout(function(){
      $(this).attr("src", calc_norm_img.src);
    });

    $('#calculate_img').mousedown(function(){
      $(this).attr("src", calc_click_img.src);
    });
    $('#calculate_img').mouseup(function(){
      $(this).attr("src", calc_norm_img.src);
    });
    
  },
	 
  populate_payment_amount: function(){
    p_amount = jQuery.trim($('#purchase_amount').val());
	if(p_amount != ''){
	  p_amount_val = parseInt(p_amount);
	  if(p_amount_val != NaN && p_amount_val > min_amount){
        PayliteCalculator.fill_payment_options(p_amount_val);
	  }else{
	    PayliteCalculator.display_amount_error(p_amount_val);	  
		PayliteCalculator.reset_payment_options();	 
      }
	}else{
	  PayliteCalculator.reset_payment_options();	 
	}
  },

  reset_selection: function(sel_val){
    if(sel_val == 1){
	  if($("#payment_tenure")){
	    $("#payment_tenure").val(0);
      }
      if($("#selectpayment_tenure")){
        $("#selectpayment_tenure").html('Tenure');
      }
      if($("#selectpayment_amount")){
		if($('#payment_amount').val() == 0){
          $("#selectpayment_amount").html('Amount');
	    }else{
          $("#selectpayment_amount").html($('#payment_amount').val());
	    }
      }        
    }else{
	  if($("#payment_amount")){
        $("#payment_amount").val(0);
      }	  
      if($("#selectpayment_amount")){
        $("#selectpayment_amount").html('Amount');
      }
      if($("#selectpayment_tenure")){
		if($('#payment_tenure').val() == 0){
          $("#selectpayment_tenure").html('Tenure');
	    }else{
          $("#selectpayment_tenure").html($('#payment_tenure').val());
        }
      }
    }
  },

  display_amount_error: function(p_amount_val){
    if(p_amount_val <= min_amount){
	  alert('Purchase amount can only be '+(min_amount+1)+ ' or more.');
	}else{
	  alert('Purchase enter numeric value for purchase amount which can be '+(min_amount+1)+ ' or more.');
	}
  },
  	 
  reset_payment_options: function(){    
	if($('#payment_amount')){
      $('#payment_amount').find('option').remove().end().append('<option value="0">Amount</option>');
      $("#payment_amount").prop('disabled','disabled');
      $("#payment_tenure").prop('disabled','disabled');
    }
  },
	 
  fill_payment_options:	function(amount){
	if($('#payment_amount')){
      $('#payment_amount').find('option').remove().end().append('<option value="0">Amount</option>');
	  $.each(tenures_array, function(index, value) {
	    denominator = PayliteCalculator.get_denominator(value);
        p_amount = Math.floor((amount / denominator));
  	    p_amount = Math.floor(p_amount) / 10;
	    p_amount = Math.floor(p_amount) * 10;

        $('#payment_amount').append($("<option></option>").attr("value",p_amount).text(p_amount));  
        if(index == 0){
		  $('#payment_amount').val(p_amount);
	    }
      });
	  PayliteCalculator.update_select_css('amount');
      $("#payment_amount").removeAttr('disabled');
    }
  },
	 
  get_denominator: function(tenure){
    return ((1 - 1/Math.pow((1+monthly_apr_split),tenure)) * (1/monthly_apr_split));
  },

  enable_options:  function(){
    selected_val = $('input:radio[name=payment_mode]:checked').val();
	p_amount = jQuery.trim($('#purchase_amount').val());
    if(p_amount != ''){
	  if(selected_val == 'payment'){
	    $("#payment_tenure").val(0);
        $("#payment_tenure").prop('disabled','disabled');
        $("#payment_amount").removeAttr('disabled');
        $('#payment_amount option:eq(1)').attr('selected', 'selected');
        PayliteCalculator.update_select_css('amount');
	  }else{
	    $("#payment_amount").val(0);
        $("#payment_amount").prop('disabled','disabled');
        $("#payment_tenure").removeAttr('disabled');
        $('#payment_tenure option:eq(1)').attr('selected', 'selected');
        PayliteCalculator.update_select_css('tenure');
	  }
    }
  },

  update_select_css: function(sel_val){
    if(sel_val == 'amount'){
      $("#selectpayment_tenure").removeClass('select');
      $("#selectpayment_tenure").addClass('select disabled');
      $("#selectpayment_tenure").html('Tenure');
      $("#label_2").removeClass('label');
      $("#label_2").addClass('label_disabled');         
      $("#label_2_end").removeClass('label_end');
      $("#label_2_end").addClass('label_end_disabled');         

      $("#selectpayment_amount").removeClass('select disabled');
      $("#selectpayment_amount").addClass('select');
      $("#label_1").removeClass('label_disabled');
      $("#label_1").addClass('label');         
      $("#label_1_end").removeClass('label_end_disabled');
      $("#label_1_end").addClass('label_end');         
      $("#selectpayment_amount").html($('#payment_amount').val());
	}else{
      $("#selectpayment_amount").removeClass('select');
      $("#selectpayment_amount").addClass('select disabled');
      $("#selectpayment_amount").html('Amount');
      $("#label_1").removeClass('label');
      $("#label_1").addClass('label_disabled');         
      $("#label_1_end").removeClass('label_end');
      $("#label_1_end").addClass('label_end_disabled');         
         
      $("#selectpayment_tenure").removeClass('select disabled');
      $("#selectpayment_tenure").addClass('select');
      $("#selectpayment_tenure").html($('#payment_tenure').val());
      $("#label_2").removeClass('label_disabled');
      $("#label_2").addClass('label');         
      $("#label_2_end").removeClass('label_end_disabled');
      $("#label_2_end").addClass('label_end');         
	}
  },
	
  disable_select_options: function(){
      $("#selectpayment_tenure").removeClass('select');
      $("#selectpayment_tenure").addClass('select disabled');
      $("#selectpayment_tenure").html('Tenure');
      $("#label_2").removeClass('label');
      $("#label_2").addClass('label_disabled');         
      $("#label_2_end").removeClass('label_end');
      $("#label_2_end").addClass('label_end_disabled');         

      $("#selectpayment_amount").removeClass('select');
      $("#selectpayment_amount").addClass('select disabled');
      $("#selectpayment_amount").html('Amount');
      $("#label_1").removeClass('label');
      $("#label_1").addClass('label_disabled');         
      $("#label_1_end").removeClass('label_end');
      $("#label_1_end").addClass('label_end_disabled');
  }, 
  
  calculate_results:  function(){
    p_amount = jQuery.trim($('#purchase_amount').val());
	if(p_amount != ''){
	  p_amount_val = parseInt(p_amount);
	  if(p_amount_val != NaN && p_amount_val > min_amount){
	    min_due_interest = PayliteCalculator.calculate_min_due_amount(p_amount_val);
		PayliteCalculator.calculate_split_results(p_amount_val, min_due_interest);
	  }else{
		PayliteCalculator.display_amount_error(p_amount_val);	  
	  }  
	}else{
 	  alert('Purchase amount cannot be blank');
      $('input[name="payment_mode"]:radio:nth(0)').attr("checked","checked");
      $('#payment_tenure option:eq(0)').attr('selected', 'selected');
      $("#selectpayment_amount").removeClass('select');
      $("#selectpayment_amount").addClass('select disabled');
      $("#selectpayment_amount").html('Amount');
      $("#label_1").removeClass('label');
      $("#label_1").addClass('label_disabled');         
      $("#label_1_end").removeClass('label_end');
      $("#label_1_end").addClass('label_end_disabled');         
      PayliteCalculator.reset_calculated_results();	     
	 }
  },
	 
  reset_calculated_results:  function(){
    PayliteCalculator.animate_payment_image(0);
	$("#min_due_field_1").html('');
	$("#min_due_field_2").html('');
	$("#split_field_1").html('');
	$("#split_field_2").html('');
	$("#interest_saved").html('');	   
  },
 
  calculate_min_due_amount:  function(total_amount){
    min_due = total_amount * minimum_due_rate;
	first_min_due = Math.floor(min_due);
	total_interest = 0.0;
	month_count = 0;
	while(total_amount > 5.0){
   	  bal_before_apr = total_amount - min_due;
	  interest_comp = bal_before_apr * monthly_apr_mindue;
	  total_amount = bal_before_apr + interest_comp;			 
   	  total_interest += interest_comp;
   	  min_due = total_amount * minimum_due_rate;
   	  month_count += 1; 
    }
	$("#min_due_field_1").html(month_count);
	month_inst = PayliteCalculator.intToFormat(""+first_min_due);
	$("#min_due_field_2").html("Rs. "+month_inst);
	return total_interest;
  },
	 
  calculate_split_results:  function(total_amount, min_due_interest){
    monthly_inst = $("#payment_amount").val();
	tenure_based = false;
	if(monthly_inst == 0){
      tenure_val = $("#payment_tenure").val();
	  if(tenure_val != 0){
        monthly_inst = PayliteCalculator.installment_for_tenure(tenure_val,total_amount);
	  }
   	  tenure_based = true;
	}
	if(monthly_inst == 0){
	  alert('Please select either Monthly payment or number of payments');
	  return;
	}
	initial_val = min_due_interest + total_amount;
	total_interest = 0.0;
	if(tenure_based){
  	  month_count = tenure_val;
  	}else{
	  month_count = PayliteCalculator.month_count_for_amount(total_amount, monthly_inst);
	}
	interest_savings = initial_val - (monthly_inst * (month_count));
	PayliteCalculator.animate_payment_image(month_count);
	$("#split_field_1").html(month_count);
	month_inst = PayliteCalculator.intToFormat(""+monthly_inst);
	$("#split_field_2").html("Rs. "+month_inst);
	number = Math.floor(interest_savings);
	number = PayliteCalculator.intToFormat(""+number);
	$("#interest_saved").html("Rs. "+number);
  },
	 
  animate_payment_image:  function(month_count){
    switch(parseInt(month_count)){
	  case 0:
	    curr_tv_img = "#image_1";
	    break;  
	  case 6:
	    curr_tv_img = "#image_2";
	    break;  
	  case 12:
	    curr_tv_img = "#image_3";
	    break;  
	  case 24:
	    curr_tv_img = "#image_4";
	    break;  
	  case 36:
	    curr_tv_img = "#image_5";
	    break;  
	  case 48:
	    curr_tv_img = "#image_6";
	    break;  
	 }
	 if(prev_tv_img != curr_tv_img){
	   $(prev_tv_img).fadeOut(2000);
	   if(prev_tv_img != main_tv_img){
	     $(main_tv_img).fadeIn(2000, function(){
			 $(curr_tv_img).fadeIn(2000);
	     });
	     //$(main_tv_img).fadeOut(1000);	     
       }else{
	     $(curr_tv_img).fadeIn(1000);
	   }
	   prev_tv_img = curr_tv_img;
     }
  },
  
  handle_key_press: function(){
	amount = $('#purchase_amount').val();
	if(amount > 1000){
	  PayliteCalculator.populate_payment_amount();
      PayliteCalculator.calculate_results();
    }else{
      PayliteCalculator.disable_select_options();
	  PayliteCalculator.reset_calculated_results(0);
	  //PayliteCalculator.reset_payment_options();	 
	}
  },
     
  month_count_for_amount:  function(total_amount, monthly_inst){
    dnr_1 = (1 - ((monthly_apr_split  * total_amount) / monthly_inst));
	dnr = Math.log(1 / dnr_1) / Math.log(10);
	nmr = Math.log(1 + monthly_apr_split) / Math.log(10);
	month_count = Math.floor((dnr/nmr) * 10);
	return Math.floor(month_count / 10);
  },
	 
  installment_for_tenure:  function(tenure,total_amount){
    inst_val = total_amount / PayliteCalculator.get_denominator(tenure);
	inst_val = Math.floor(inst_val) / 10;
	return Math.floor(inst_val) * 10;
  },

  intToFormat: function(nStr)
    {
     nStr += '';
     x = nStr.split('.');
     x1 = x[0];
     x2 = x.length > 1 ? '.' + x[1] : '';
     var rgx = /(\d+)(\d{3})/;
     var z = 0;
     var len = String(x1).length;
     var num = parseInt((len/2)-1);
 
      while (rgx.test(x1))
      {
        if(z > 0)
        {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        else
        {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
          rgx = /(\d+)(\d{2})/;
        }
        z++;
        num--;
        if(num == 0)
        {
          break;
        }
      }
     return x1 + x2;
  }
}
