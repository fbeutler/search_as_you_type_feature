
var opts = {
    lines: 9,    // The number of lines in the spinner
    length: 10,  // The length of each line
    width: 3,    // The line thickness
    radius: 6,   // The radius of the inner circle
    corners: 1,  // Corner roundness (0..1)
    rotate: 58,  // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#000000 ', // #rgb or #rrggbb or array of colors
    speed: 0.9,  // Rounds per second
    trail: 100,  // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 99,  // the modals have zIndex 100
    top: 'auto', // Top position relative to parent
    left: '50%'  // Left position relative to parent
};

function update_job_table() {
    var job_table = document.getElementById('job_market_table');
    job_table.innerHTML = "<td colspan='5'>Updating table</td>";
    var spinner = new Spinner(opts).spin(job_table);

    var search_term = document.getElementById('job_query').value;
    doc = { 'search_term': search_term };
    var timestamp = +new Date();
    doc['timestamp'] = timestamp;
    $.ajax({
        url: $SCRIPT_ROOT + '/search_job_market',
        type: "POST",   
        async: true,
        cache: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(doc, null, '\t'),
        success: function(data) {
            if(data.error){
                console.log("Error = ", data.error);
            }
            else{
                var results_timestamp = document.getElementById('timestamp');
                if(data.timestamp > parseInt(results_timestamp.value)){
                    spinner.stop();
                    results_timestamp.value = data.timestamp;
                    job_table.innerHTML = data.html;
                }
            }
        }
    });
}
