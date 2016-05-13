
$(document).ready(function() {
    $(".location").select2(
        {
            placeholder: 'Enter location',
            data: [
                {
                    "id" : "London",
                    "text" : "London"
                },
                {
                    "id" : "Italy",
                    "text" : "Italy"
                },
                {
                    "id" : "America",
                    "text" : "America"
                },
                {
                    "id" : "France",
                    "text" : "France"
                },
                {
                    "id" : "Islamabad",
                    "text" : "Islamabad"
                }
            ]
        }
    );
});


/**
 * Get location and no of trends input
 * validate inputs
 * if valid then redirected to trends page
 * if not then show error message
 *
 */
function getLocationTrends(){
    var place = $('#location1 :selected').text();;
    var noOfTrends = $('#noOfTrends').val();
    if(place){
        if(noOfTrends <= 10 && noOfTrends >= 1) {
            window.location = '/trends/place/'+place+'/'+noOfTrends;
        } else {
            $('#errorMessage').removeClass('hidden');
            $('#errorMessage').text('Please select value between 0-11!');
        }
    } else {
        $('#errorMessage').removeClass('hidden');
        $('#errorMessage').text('Please enter place to get the trends!');
    }
}

/**
 * getting query search for getting related tweets
 * and then sendinfg parameters to the controller
 * on success update tweets section
 * show error
 *
 */
function getTweets(query){
    $.ajax({
        type: "GET",
        url: "/tweets",
        data: {query : query},
        dataType: "json",
        success: function (data) {
            console.log(data);
            var source   = $("#tweets-template").html();
            var template = Handlebars.compile(source);
            var html    = template(data);
            $('#tweets').html(html);
        }
    }).error(function (err) {
        console.log('In error part!');
        console.log(err);
    });

}

/**
 * This function trigger on keydown to input
 * add 'hidden' class if it doesnot exists
 *
 */
var updateErrorField = function(){
    if(!$('#errorMessage').hasClass('hidden')){
        $('#errorMessage').addClass('hidden');
    }
}


// Handlebars helper function for message time
Handlebars.registerHelper('dateTimeHelper', function(value, options) {
    //var timestamp = new Date(value*1000);
    return jQuery.timeago(value);
});
