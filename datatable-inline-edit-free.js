const url = "http://localhost:8080/update/";
const updateField = (_id, data, callback) => {
    $.ajax({
        url: `${url}${_id}`,
        data,
        type: 'POST',
        success: (data) => {
            callback(null);
        },
        error: (err) => {
            callback(err);
        }
    });
};
$(document).ready(function () {
    var table = $('#table').DataTable();
    $("#table tbody").on('click', 'th', function () {
        var myCell = table.cell(this);
        var _id = myCell.context[0].aoData[0]._aData[0];
        console.log(_id);
        var column = myCell["0"][0].column;
        var field = myCell.context[0].aoColumns[column].sTitle;
        var data = myCell.data();
        if (data.search('<input') === -1) {
            myCell.data('<input type="text" id="input' + _id + '" value="' + data + '"/>');
            var input = document.getElementById(`input${_id}`);
            input.addEventListener("keyup", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    var newData = {};
                    newData[field] = input.value;
                    updateField(_id, newData, (err) => {
                        if (err) alert(err);
                        else {
                            myCell.data(input.value);
                        }
                    });
                }
            })
        }
    })
});
