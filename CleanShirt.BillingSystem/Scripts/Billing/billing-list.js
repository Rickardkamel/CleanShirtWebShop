$(document).ready(function () {

});
getAllOrders();
getNewOrder();


function getAllOrders() {
    $.get("http://localhost:53365/api/order/",
       function (data, status) {
           $.ajax({
               url: 'Home/BillingList',
               traditional: true,
               data: JSON.stringify(data),
               contentType: "application/json; charset=utf-8",
               type: 'POST',
               success: function (data) {
                   $("#partialView").append(data);
               }
           });
       });
}

function getNewOrder() {
    $.get("http://localhost:53365/api/order/GetNewOrders/" + "NewOrder",
        function (messageResponse) {
            if (messageResponse === "") {
                getNewOrder();
            } else {
                $.get("http://localhost:53365/api/order/" + messageResponse,
                function (order) {
                    $.ajax({
                        url: 'Home/BillingList',
                        traditional: true,
                        data: JSON.stringify([order]),
                        contentType: "application/json; charset=utf-8",
                        type: 'POST',
                        success: function (orderToAppend) {
                            $("#partialView").append(orderToAppend);
                            getNewOrder();
                        }
                    });
                });
            }
        });
}

function showDetails(itemId) {
    $("#productlist-" + itemId).toggle(1000);
};

function invoiceOrder(order) {
    order.BilledDate = new Date().toUTCString();
    order.OrderedDate = parseDate(order.OrderedDate);
    order.Billed = true;
    $.post("http://localhost:53365/api/order/" + "InvoiceOrder", order)
    .done(function (response) {
        $.ajax({
            url: 'Home/BillingList',
            traditional: true,
            data: JSON.stringify([response]),
            contentType: "application/json; charset=utf-8",
            type: 'POST',
            success: function (orderToAppend) {
                $("#row-"+order.Id).replaceWith(orderToAppend);
            }
        });
    });
};

function unInvoiceOrder(order) {
    if (order.Sent === true) {
        swal({
            title: "BillingError",
            text: "The order has already been marked as SENT!",
            type: "error",
            timer: 3000,
            showConfirmButton: false
        });
        return;
    }
    order.BilledDate = new Date().toUTCString();
    order.OrderedDate = parseDate(order.OrderedDate);
    order.Billed = false;
    $.post("http://localhost:53365/api/order/" + "InvoiceOrder", order)
    .done(function (response) {
        $.ajax({
            url: 'Home/BillingList',
            traditional: true,
            data: JSON.stringify([response]),
            contentType: "application/json; charset=utf-8",
            type: 'POST',
            success: function (orderToAppend) {
                $("#row-" + order.Id).replaceWith(orderToAppend);
            }
        });
    });
};

function parseDate(date) {
    var parsed = new Date(date.match(/\d+/)[0] * 1).toUTCString();
    return parsed;
};