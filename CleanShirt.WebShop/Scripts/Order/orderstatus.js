
getAllOrders();

function getAllOrders() {
    $.get("http://localhost:53365/api/order",
       function (data, status) {
           $.ajax({
               url: 'Order/OrderStatusList',
               traditional: true,
               data: JSON.stringify(data),
               contentType: "application/json; charset=utf-8",
               type: 'POST',
               success: function (data) {
                   $("#orderPartialView").html(data);
               }
           });
       });
}

function showDetails(itemId) {
    $("#productlist-" + itemId).toggle(1000);
};