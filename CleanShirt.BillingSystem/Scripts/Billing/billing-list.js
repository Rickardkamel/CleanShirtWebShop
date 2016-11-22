$(document).ready(function () {
    $.get("http://localhost:53365/api/order/",
        function (data, status) {
            $.ajax({
                url: 'Home/BillingList',
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

function invoiceOrder(order) {
    order.BilledDate = new Date().toUTCString();
    //order.SentDate = testParse(order.SentDate);
    order.OrderedDate = testParse(order.OrderedDate);
    order.Billed = true;
    $.post("http://localhost:53365/api/order", order)
    .done(function (response) {
        console.log("Data returned: " + response);
    });
};

function unInvoiceOrder(order) {
    order.BilledDate = new Date().toUTCString();
    //order.SentDate = testParse(order.SentDate);
    order.OrderedDate = testParse(order.OrderedDate);
    order.Billed = false;
    $.post("http://localhost:53365/api/order", order)
    .done(function (response) {
        console.log("Data returned: " + response);
    });
};

function testParse(date) {
    var parsed = new Date(date.match(/\d+/)[0] * 1).toUTCString();
    return parsed;
};