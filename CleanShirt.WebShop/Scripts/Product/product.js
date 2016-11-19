
$(document).ready(function () {
});

function addToCart(value) {
    $.get("http://localhost:53365/api/product/" + value,
        function (data, status) {
            $.post('Home/AddToCart', data, function () {
                updateCartTotal(data.Price);
            });
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

