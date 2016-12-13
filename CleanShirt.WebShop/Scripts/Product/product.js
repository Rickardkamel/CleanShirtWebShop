$(document).ready(function () {
    $.get("http://cleanshirtwebapi.azurewebsites.net/api/product/",
        function (data, status) {
            $.ajax({
                url: '/Home/Products',
                traditional: true,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                type: 'POST',
                success: function (data) {
                    $("#partialView").html(data);
                }
            });
        });
    updateCartSummary();
});

function updateCartSummary() {
    $.post('/Home/CartSummary',
                   function (data) {
                       $('#cartSummaryPartialView').html(data);
                   });
}

function addToCart(value) {
    $.get("http://cleanshirtwebapi.azurewebsites.net/api/product/" + value,
        function (data, status) {
            $.post('/Home/AddToCart', data, function () {
                updateCartSummary();
            });
        });
}
