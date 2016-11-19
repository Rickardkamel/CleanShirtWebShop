$(document).ready(function () {
    $("form").submit(function (data) {
        console.log(data);
        getFormObj("contact-form");
        return false;
    });

    // TODO: SEND TO CHECKOUT
});

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
    var totalPrice = 0;
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

