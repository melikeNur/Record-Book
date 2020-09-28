$(document).ready(function(){
	$('.delete-user').on('click', function(){
		var id = $(this).data('id');
		var url = 'users/delete/' +id;
		if(confirm('Delete User?')){
			$.ajax({
				url: url,
				type:'DELETE',
				success: function(result){
					console.log('Deleting');
					window.location.href='/';
				},
				error: function(err){
					console.log(err);
				}
			});
		}
	});
		$('.edit-user').on('click', function(){
		$('#edit-form-name').val($(this).data('name'));
		$('#age').val($(this).data('age'));
		$('#edit-form-job').val($(this).data('job'));
		$('#edit-form-id').val($(this).data('id'));
	});
});

