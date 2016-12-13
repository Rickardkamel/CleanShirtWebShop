clearMessages();

function clearMessages() {
    $.get("http://cleanshirtwebapi.azurewebsites.net/api/order/ClearMessages/" + "InvoiceOrder",
        function () {
            getAllOrders();
        });
}


function getAllOrders() {
    $.get("http://cleanshirtwebapi.azurewebsites.net/api/order/warehouseorders",
       function (data, status) {
           $.ajax({
               url: 'Home/WarehouseList',
               traditional: true,
               data: JSON.stringify(data),
               contentType: "application/json; charset=utf-8",
               type: 'POST',
               success: function (data) {
                   $("#partialView").html(data);
                   getNewOrder();
               }
           });
       });
}

function getNewOrder() {
    $.get("http://cleanshirtwebapi.azurewebsites.net/api/order/GetNewOrders/" + "InvoiceOrder",
        function (messageResponse) {
            if (messageResponse === "") {
                getNewOrder();
            } else {
                $.get("http://cleanshirtwebapi.azurewebsites.net/api/order/" + messageResponse,
                function (order) {
                    $.ajax({
                        url: 'Home/WarehouseList',
                        traditional: true,
                        data: JSON.stringify([order]),
                        contentType: "application/json; charset=utf-8",
                        type: 'POST',
                        success: function (orderToAppend) {
                            if (!$("#row-" + order.Id).length) {
                                if (order.Billed) {
                                    $("#partialView").append(orderToAppend);
                                    getNewOrder();
                                }
                            } else {
                                $("#row-" + order.Id).remove();
                                getNewOrder();
                            }
                        }
                    });
                });
            }
        });
}



function openCheckList(item) {
    item.BilledDate = parseJsonDate(item.BilledDate);
    item.OrderedDate = parseJsonDate(item.OrderedDate);
    $.ajax({
        url: 'Home/CheckList',
        traditional: true,
        data: JSON.stringify(item),
        contentType: "application/json; charset=utf-8",
        type: 'POST',
        success: function (data) {
            $("#checkListForm").html(data);

            $('#checkModal').modal('show');
        }
    });
    console.log(item);
}

function deliverOrder(order) {
    if ($(".checkbox:checked").length === $(".checkbox").length) {
        order.Sent = true;

        order.SentDate = new Date().toUTCString();
        order.OrderedDate = parseDate(order.OrderedDate);
        order.BilledDate = parseDate(order.BilledDate);

        $.post("http://cleanshirtwebapi.azurewebsites.net/api/order/" + "NewOrder", order)
    .done(function (response) {
        $.ajax({
            url: 'Home/WarehouseList',
            traditional: true,
            data: JSON.stringify([response]),
            contentType: "application/json; charset=utf-8",
            type: 'POST',
            success: function (orderToAppend) {
                swal({
                    title: "Delivered",
                    text: "The package has been registered as sent!",
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                $('#checkModal').modal('hide');
                $("#row-" + order.Id).replaceWith(orderToAppend);
            }
        });
    });


    }
    else {
        swal({
            title: "CheckError",
            text: "You need to check all items in the order!",
            type: "error",
            timer: 2000,
            showConfirmButton: false
        });
    }
}

function undoSent(order) {
    order.Sent = false;

    order.SentDate = null;
    order.OrderedDate = parseDate(order.OrderedDate);
    order.BilledDate = parseDate(order.BilledDate);

    $.post("http://cleanshirtwebapi.azurewebsites.net/api/order/" + "NewOrder", order)
.done(function (response) {
    $.ajax({
        url: 'Home/WarehouseList',
        traditional: true,
        data: JSON.stringify([response]),
        contentType: "application/json; charset=utf-8",
        type: 'POST',
        success: function (orderToAppend) {
            swal({
                title: "Returned",
                text: "The package has been returned",
                type: "success",
                timer: 2500,
                showConfirmButton: false
            });
            $("#row-" + order.Id).replaceWith(orderToAppend);
        }
    });
});
}

function parseDate(date) {
    var parsed = new Date(date.match(/\d+/)[0] * 1).toUTCString();
    return parsed;
};

function parseJsonDate(date) {
    return new Date(parseInt(date.replace("/Date(", "").replace(")/", ""), 10));
}