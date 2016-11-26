$(document).ready(function () {
    $.get("http://localhost:53365/api/order/warehouseorders",
        function (data, status) {
            $.ajax({
                url: 'Home/WarehouseList',
                traditional: true,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                type: 'POST',
                success: function (data) {
                    $("#partialView").html(data);
                }
            });
        });
});