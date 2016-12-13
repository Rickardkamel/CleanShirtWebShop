getAllOrders();


function getAllOrders() {
    $.get("http://cleanshirtwebapi.azurewebsites.net/api/order/GetCompletedOrders",
       function (response, status) {
           $.ajax({
               url: '/Order/OrderStatusList',
               traditional: true,
               data: JSON.stringify(response),
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