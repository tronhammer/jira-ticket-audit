var base = "http://jira.ontraport.com//rest/api/2/search",
	jql = decodeURIComponent(window.location.search),
	map = {
		"browser": {
			"key": "customfield_10700"
		},
		"department": {
			"key": "customfield_10408"
		},
		"os": {
			"key": "customfield_10412"
		},
		"screenshot": {
			"key": "customfield_10413"
		},
		"url": {
			"key": "customfield_10414"
		}
	};

$("head").append( 
	$("<link>").attr({
		rel: "stylesheet", 
		type: "text/css", 
		href: "http://boedesign.com/demos/gritter/css/jquery.gritter.css"
	})
).append( 
	$("<script>").attr({
		src: "http://boedesign.com/demos/gritter/js/jquery.gritter.js", 
		async: true
	})
);

$.gritter.add({
	// (string | mandatory) the heading of the notification
	title: 'Processing!',
	// (string | mandatory) the text inside the notification
	text: 'Attempting to process current JQL filter for incomplete tickets...',
	// (string | optional) the image to display on the left
	// image: 'http://a0.twimg.com/profile_images/59268975/jquery_avatar_bigger.png',
	// (bool | optional) if you want it to fade out on its own or just sit there
	// sticky: false,
	
    // class_name: 'gritter-light'
	
	
	// (int | optional) the time you want it to be alive for before fading out
	time: ''
});

$.get(base + jql).done(function(data){
	$.each(data.issues, function(){
		var ticket_name = this.key,
			fields = this.fields,
			missing = [];
		$.each(map, function(field_name){
			if (!fields[ this.key ]){
				missing.push(ticket_name+" is missing "+field_name);
			}
		});
		if (missing.length){
			var $warning = $("<div/>")
				.addClass("ticket-audit-warning")
				.text("The following fields are missing:");
			var $missing = $("<ol>");
			$.each(missing, function(){
				$missing.append("<li>"+ this +"</li>");
			});
			$("li[data-key='"+ticket_name+"']").append(
				$warning.append( $missing )
			);
		}
	}); 
});