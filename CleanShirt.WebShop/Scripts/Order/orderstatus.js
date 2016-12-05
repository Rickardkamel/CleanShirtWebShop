
getAllOrders();
//getNewOrder();


function getAllOrders() {
    $.get("http://localhost:53365/api/order/GetCompletedOrders",
       function (response, status) {
           $.ajax({
               url: 'Order/OrderStatusList',
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

//function getNewOrder() {
//    $.get("http://localhost:53365/api/order/GetNewOrders/" + "InvoiceOrder",
//        function (messageResponse) {
//            if (messageResponse === "") {
//                getNewOrder();
//            } else {
//                $.get("http://localhost:53365/api/order/" + messageResponse,
//                function (order) {
//                    $.ajax({
//                        url: 'Order/OrderStatusList',
//                        traditional: true,
//                        data: JSON.stringify([order]),
//                        contentType: "application/json; charset=utf-8",
//                        type: 'POST',
//                        success: function (orderToAppend) {
//                            var flag = 0;
//                            var spot = 0;
//                            if ($('td:first-child').length > 0) {
//                                $('td:first-child')
//                                    .each(function (e) {
//                                        if ($(this).text() == messageResponse) {
//                                            flag = 1;
//                                            spot = e;
//                                        }
//                                    });
//                            }
//                            if (flag == 1) {
//                                $('td:first-child')
//                                    .each(function (e) {
//                                        if (e === spot) {
//                                            $(this).parent().remove();
//                                            $("#partialView").append(orderToAppend);
//                                            getNewOrder();
//                                        }
//                                    });
//                            } else {
//                                $("#partialView").append(orderToAppend);
//                                getNewOrder();
//                            }
//                        }
//                    });
//                });
//            }
//        });
//}