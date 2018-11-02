var select = document.getElementsByClassName('jsselect'),
	len = select.length;
for( var i = 0; i<len; i++){
	select[i].onclick = function(){
		for( var j = 0; j < len; j++){
			select[j].id ="";
		}
		this.id = 'select';
	}
}