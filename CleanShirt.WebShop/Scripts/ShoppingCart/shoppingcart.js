$(document).ready(function () {
    $("form").submit(function (data) {
        registerCart();
        return false;
    });

});

function registerCart() {
    var customerData = getFormObj("contact-form");

    $.post("ShoppingCart/RegisterCart", customerData, function (response) {
        response.BilledDate = parseDate(response.BilledDate);
        response.SentDate = parseDate(response.SentDate);
        response.OrderedDate = parseDate(response.OrderedDate);
        
        // TODO: SEND TO CHECKOUT

        console.log(response);
    });
}

function parseDate(date) {
    var dateInString = '{ "billedDate": ' + '"' + date + '"' + '}';
    var parsed = JSON.parse(dateInString, function (key, value) {
        if (typeof value === 'string') {
            var d = /\/Date\((\d*)\)\//.exec(value);
            return (d) ? new Date(+d[1]) : value;
        }
        return value;
    });
    return parsed;
}

function getFormObj(formId) {
    var formObj = {};
    var inputs = $('#' + formId).serializeArray();
    $.each(inputs, function (i, input) {
        formObj[input.name] = input.value;
    });
    return formObj;

}

function updateItemQuantity(itemId) {
    var quantityToUpdate = $("#quantity" + itemId).val();
    if (quantityToUpdate <= 0) {
        removeItem(itemId);
        return;
    }
    $.get("http://localhost:53365/api/product/" + itemId,
        function (data, status) {
            var dataToSend = {
                "Product": data,
                "Quantity": quantityToUpdate
            };
            $.post('ShoppingCart/UpdateItemInCart', dataToSend, function (response) {
                $("#cart-price").html(countCartPrice(response)).stop().css("opacity", "0").animate({
                    opacity: 1
                }, 1000);
            }, "json");
        });
}

function removeItem(itemId) {
    $.post("/ShoppingCart/RemoveFromCart", { "id": itemId },
            function (response) {
                $("#item-" + itemId).fadeOut(1000);
                $("#cart-price").html(countCartPrice(response)).stop().css("opacity", "0").animate({
                    opacity: 1
                }, 1000);
            });
}

function countCartPrice(data) {

    var totalPrice = 0;

    data.ShoppingCartItems.forEach(function (i) {
        totalPrice += (i.Quantity * i.Product.Price);
    });

    return totalPrice;
}

