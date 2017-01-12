/*global $*/
$(document).ready(function () {
    readRecords(); // calling function
});

//Read records
function readRecords(){
    $.get("/news/", {}, function(data,status){
        data.forEach(function(value){
            var row='<tr id="row_id_'+ value.id +'">' + displayColumns(value) + '</tr>';
            $('#news').append(row);
        });
    });
}

function displayColumns(value) {
    return 	'<td>'+value.id+'</td>'
			+ '<td class="title">'+ value.title+ '</td>'
			+ '<td class="text">'+ value.text +'</td>'
			+ '<td class="date">'+ value.date +'</td>'
			+ '<td class="type">'+ value.type +'</td>'
			+ '<td align="center">'
			+	'<button onclick="viewRecord('+ value.id +')" class="btn btn-edit">Update</button>'
			+ '</td>'
			+ '<td align="center">'
			+	'<button onclick="deleteRecord('+ value.id +')" class="btn btn-danger">Delete</button>'
			+ '</td>';
}

function addRecord() {
    $('#id').val('');
    $('#title').val('');
    $('#text').val('');
    $('#date').val('');
    $('#type').val('');
    $('#myModalLabel').html('Add News');
    $('#add_new_record_modal').modal('show');
}

function viewRecord(id) {
    var url = "/news/" + id;
    
    $.get(url, {}, function (data, status) {
       
       //bind the values to the form fields
        $('#title').val(data.title);
        $('#text').val(data.text);
        $('#date').val(data.date);
        $('#type').val(data.type);

        $('#id').val(id);
        $('#myModalLabel').html('Edit List');
        
        $('#add_new_record_modal').modal('show');
    });
}

function saveRecord() {
    var formData = $('#record_form').serializeObject();
    if(formData.id) {
        updateRecord(formData);
    } else {
        createRecord(formData);
    }
}

function createRecord(formData) {
    $.ajax({
        url: '/news/',
        type: 'POST',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#add_new_record_modal').modal('hide');
            
            var row = '<tr id="row_id_'+ data.id +'">'
            			+ displayColumns(data)
        				+ '</tr>';
            $('#events').append(row);
        } 
    });
}

function updateRecord(formData) {
    $.ajax({
        url: '/news/'+formData.id,
        type: 'PUT',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#row_id_'+formData.id+'>td.title').html(formData.title);
            $('#row_id_'+formData.id+'>td.text').html(formData.preview);
            $('#row_id_'+formData.id+'>td.date').html(formData.date);
            $('#row_id_'+formData.id+'>td.type').html(formData.text);
            $('#add_new_record_modal').modal('hide');
        } 
    });
}

//delete record
function deleteRecord(id) {
    $.ajax({
        url: '/news/'+id,
        type: 'DELETE',
        success: function(data) {
            $('#row_id_'+id).remove();
        }
    });
}

//extending jQuery with a serializeObject method so that form values can be retrieved as JSON objects
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

