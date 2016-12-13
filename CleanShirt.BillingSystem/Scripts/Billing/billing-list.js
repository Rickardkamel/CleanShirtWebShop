$(document).ready(function () {
    $(function () {
        $('#datetimepicker-from').datepicker({
            inline: true,
            sideBySide: true
        });

        $('#datetimepicker-to').datepicker({
            inline: true,
            sideBySide: true
        });
    });

});


clearMessages();

function clearMessages() {
    $.get("http://cleanshirtwebapi.azurewebsites.net/api/order/ClearMessages/" + "InvoiceOrder",
        function () {
            getAllOrders();
        });
}


function getReport() {

    var reportDates = {
        fromDate: new Date($("#from-date").val()).toUTCString(),
        toDate: new Date($("#to-date").val()).toUTCString()
    }
    $.post("http://cleanshirtwebapi.azurewebsites.net/api/order/getOrderReport", reportDates)
        .done(function (reportList) {
            $.ajax({
                url: 'Home/ReportList',
                traditional: true,
                data: JSON.stringify(reportList),
                contentType: "application/json; charset=utf-8",
                type: 'POST',
                success: function (data) {
                    $("#reportListView").html(data);

                    $('#reportModal').modal('show');
                }
            });
        });
}


function getAllOrders() {
    $.get("http://cleanshirtwebapi.azurewebsites.net/api/order/",
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
    $.get("http://cleanshirtwebapi.azurewebsites.net/api/order/GetNewOrders/" + "NewOrder",
        function (messageResponse) {
            if (messageResponse === "") {
                getNewOrder();
            } else {
                $.get("http://cleanshirtwebapi.azurewebsites.net/api/order/" + messageResponse,
                function (order) {
                    $.ajax({
                        url: 'Home/BillingList',
                        traditional: true,
                        data: JSON.stringify([order]),
                        contentType: "application/json; charset=utf-8",
                        type: 'POST',
                        success: function (orderToAppend) {
                            var flag = 0;
                            var spot = 0;
                            if ($('td:first-child').length > 0) {
                                $('td:first-child')
                                    .each(function (e) {
                                        if ($(this).text() == messageResponse) {
                                            flag = 1;
                                            spot = e;
                                        }
                                    });
                            }

                            if (flag == 1) {
                                $('td:first-child')
                                    .each(function (e) {
                                        if (e === spot) {
                                            $(this).parent().remove();
                                            $("#partialView").append(orderToAppend);
                                            getNewOrder();
                                        }
                                    });

                            } else {
                                $("#partialView").append(orderToAppend);
                                getNewOrder();
                            }
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
    $("#invoice-button-" + order.Id).prop('disabled', true);
    $("#uninvoice-button-" + order.Id).prop('disabled', true);

    order.BilledDate = new Date().toUTCString();
    order.OrderedDate = parseDate(order.OrderedDate);
    order.Billed = true;
    $.post("http://cleanshirtwebapi.azurewebsites.net/api/order/" + "InvoiceOrder", order)
    .done(function (response) {
        $.ajax({
            url: 'Home/BillingList',
            traditional: true,
            data: JSON.stringify([response]),
            contentType: "application/json; charset=utf-8",
            type: 'POST',
            success: function (orderToAppend) {
                $("#row-" + order.Id).replaceWith(orderToAppend);
                $("#invoice-button-" + order.Id).prop('disabled', false);
                $("#uninvoice-button-" + order.Id).prop('disabled', false);
            }
        });
    });
};

function unInvoiceOrder(order) {
    $("#invoice-button-" + order.Id).prop('disabled', true);
    $("#uninvoice-button-" + order.Id).prop('disabled', true);

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
    $.post("http://cleanshirtwebapi.azurewebsites.net/api/order/" + "InvoiceOrder", order)
    .done(function (response) {
        $.ajax({
            url: 'Home/BillingList',
            traditional: true,
            data: JSON.stringify([response]),
            contentType: "application/json; charset=utf-8",
            type: 'POST',
            success: function (orderToAppend) {
                $("#row-" + order.Id).replaceWith(orderToAppend);
                $("#invoice-button-" + order.Id).prop('disabled', false);
                $("#uninvoice-button-" + order.Id).prop('disabled', false);
            }
        });
    });
};

function parseDate(date) {
    var parsed = new Date(date.match(/\d+/)[0] * 1).toUTCString();
    return parsed;
};