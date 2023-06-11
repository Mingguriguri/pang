$(document).ready(function() {
    $(".level3").contextmenu(function(e) {
        e.preventDefault();
        var itemId = $(this).data('item-id');
        var confirmDelete = confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            deleteItem(itemId);
            $(this).remove();  // remove element from the page
        }
    });
});

function deleteItem(itemId) {
    $.ajax({
        url: '/delete_item/',
        type: 'POST',
        data: {
            'item_id': itemId,
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
        },
        success: function(response) {
            alert("Item deleted successfully.");
            location.reload();
        },
                
        // error: function(response) {
        error: function(response) {
            console.log("deleteItem called with itemId:", itemId);
            alert('AJAX error');
            // location.reload();

        }
            // Handle any AJAX errors here.
            
        
    });
}

