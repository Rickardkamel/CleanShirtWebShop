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
    //test();
});



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


        //TODO: DELIVER ORDER
        console.log("Checked");
        $.ajax({
            url: "http://localhost:53365/api/order/",
            traditional: true,
            data: JSON.stringify(order),
            contentType: "application/json; charset=utf-8",
            type: "POST",
            success: function (data) {
                swal({
                    title: "Delivered",
                    text: "The package has been registered as sent!",
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                $('#checkModal').modal('hide');
            }
        });
    }
    else {
        //TODO: GIVE ERRORMESSAGE
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

    //TODO: DELIVER ORDER
    $.ajax({
        url: "http://localhost:53365/api/order/",
        traditional: true,
        data: JSON.stringify(order),
        contentType: "application/json; charset=utf-8",
        type: "POST",
        success: function (data) {
            swal({
                title: "Returned",
                text: "The package has been returned",
                type: "success",
                timer: 2500,
                showConfirmButton: false
            });
        }
    });
}

//function test() {
//    var fib = [];

//    fib[0] = 0;
//    fib[1] = 1;
//    console.log(fib[0]);
//    console.log(fib[1]);

//    for (i = 2; fib[i - 1] <= 100; i++) {
//        fib[i] = fib[i - 2] + fib[i - 1];
//        console.log(fib[i]);
//    }
//}

function parseDate(date) {
    var parsed = new Date(date.match(/\d+/)[0] * 1).toUTCString();
    return parsed;
};

function parseJsonDate(date) {
    return new Date(parseInt(date.replace("/Date(", "").replace(")/", ""), 10));
}