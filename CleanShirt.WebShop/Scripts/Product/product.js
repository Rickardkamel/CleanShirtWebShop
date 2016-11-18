
$(document).ready(function () {
    //var dataToSend;
    //test();
    //function test() {
    //    $.get("http://localhost:53365/api/product", function (data, status) {
    //        sendData(data);
    //    });
    //    function sendData(data) {
    //        $.ajax({
    //            url: '/Home/Index',
    //            type: 'POST',
    //            data: JSON.stringify(data),
    //            dataType: 'json',
    //            contentType: 'application/json; charset=utf-8',
    //        });
    //    }
    //}



});


function addToCart(value) {

    $.get("http://localhost:53365/api/product/" + value,
        function (data, status) {

            $.post('Home/AddToCart', data, function () {
                // Call the custom function here
                updateCartTotal(data.Price);
            });

            //$.ajax({
            //    url: '/Home/AddToCart',
            //    type: 'POST',
            //    data: JSON.stringify(data),
            //    dataType: 'json',
            //    contentType: 'application/json; charset=utf-8'
            //});
        });
}

function getTotalCost(price) {
    var currentPrice = price;
    var valueFromHtml = $("#total-price").text();
    var convertedValue = parseFloat(valueFromHtml);
    var totalPrice = convertedValue + currentPrice;
    return totalPrice;
}

function getTotalItems() {
    var valueFromHtml = $("#item-number").text();
    var convertedValue = parseFloat(valueFromHtml);
    var totalItems = convertedValue+1;
    return totalItems;
}

function updateCartTotal(price) {
    $("#total-price").html(getTotalCost(price));

    $("#item-number").html(getTotalItems());
}

