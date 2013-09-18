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

console.log("Processing JQL filter...");
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