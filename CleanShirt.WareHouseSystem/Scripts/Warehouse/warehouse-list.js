$(document).ready(function () {
});


getAllOrders();
getNewOrder();

function getAllOrders() {
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
}

function getNewOrder() {
    $.get("http://localhost:53365/api/order/GetNewOrders/" + "InvoiceOrder",
        function (messageResponse) {
            if (messageResponse === "") {
                getNewOrder();
            } else {
                $.get("http://localhost:53365/api/order/" + messageResponse,
                function (order) {
                    $.ajax({
                        url: 'Home/WarehouseList',
                        traditional: true,
                        data: JSON.stringify([order]),
                        contentType: "application/json; charset=utf-8",
                        type: 'POST',
                        success: function (orderToAppend) {
                            //var rows = $("table").find("> tbody > tr");

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
                                //$(this).parent().remove();
                                //$('table>tbody > tr > td').slice(spot, spot).parent().remove();
                                $('td:first-child')
                                    .each(function (e) {
                                        if (e === spot) {
                                            $(this).parent().remove();
                                            getNewOrder();
                                        }
                                    });

                            } else {
                                $("#partialView").append(orderToAppend);
                                getNewOrder();
                            }

                            //var flag = 0;
                            //$("table").find("tr").each(function () {
                            //    var td1 = $(this).find("td:first-child").text();
                            //    if (messageResponse == td1) {
                            //        flag = 1;
                            //    }
                            //});
                            //if (flag == 1) {

                            //} else {
                            //    $('#test').append('<tr><td>' + test + '</td><td>' + sample + '</td></tr>');
                            //}
                            //$("#add").val("");
                            //$("#add2").val("");

                            //var xc = $('td:first-child').length;
                            //if ($('td:first-child').length > 0) {
                            //    $('td:first-child')
                            //        .each(function(e) {
                            //            if ($(this).text() === messageResponse) {
                            //                console.log("duplicate");
                            //                $(this).parent().remove();
                            //                return false;
                            //            } else if (xc === e) {
                            //                $("#partialView").append(orderToAppend);
                            //                return false;
                            //            }
                            //        });
                            //} else {
                            //    $("#partialView").append(orderToAppend);
                            //    getNewOrder();
                            //}
                            ////
                            //getNewOrder();

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


        //TODO: DELIVER ORDER
        //console.log("Checked");
        //$.ajax({
        //    url: "http://localhost:53365/api/order/" + "NewOrder",
        //    traditional: true,
        //    data: JSON.stringify(order),
        //    contentType: "application/json; charset=utf-8",
        //    type: "POST",
        //    success: function (orderToAppend) {
        //        swal({
        //            title: "Delivered",
        //            text: "The package has been registered as sent!",
        //            type: "success",
        //            timer: 2000,
        //            showConfirmButton: false
        //        });
        //        $('#checkModal').modal('hide');
        //        $("#row-" + order.Id).replaceWith(orderToAppend);
        //    }

        //});


        $.post("http://localhost:53365/api/order/" + "NewOrder", order)
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
    //$.ajax({
    //    url: "http://localhost:53365/api/order/" + "NewOrder",
    //    traditional: true,
    //    data: JSON.stringify(order),
    //    contentType: "application/json; charset=utf-8",
    //    type: "POST",
    //    success: function (data) {
    //        swal({
    //            title: "Returned",
    //            text: "The package has been returned",
    //            type: "success",
    //            timer: 2500,
    //            showConfirmButton: false
    //        });
    //    }
    //});


    $.post("http://localhost:53365/api/order/" + "NewOrder", order)
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