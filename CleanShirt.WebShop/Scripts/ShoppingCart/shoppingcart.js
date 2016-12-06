$(document).ready(function () {
    $("form").submit(function (data) {
        registerCart();
        return false;
    });
    
    $("#cart")
        .on("focus", ".quantity",
            function () {
                prev = parseInt($(this).val());
            });

    $.get("http://localhost:53365/api/product/",
        function (data) {
            $.each(data, function(e) {
                validateQuantity(data[e]);
            });
        });
    checkCart();
});

function validateQuantity(value) {
    $(".item-grp")
        .each(function (e) {
            var productId = $(this).find(":first-child").attr("id");

            if (value.Id == productId) {
                var quantityValue = $(this).find("input");

                if (quantityValue.val() > value.QuantityInStorage) {
                    $(this).find("input").val(value.QuantityInStorage);
                    updateItemQuantity(productId);
                }
            }
        });
}

function checkCart() {
    var count = $("#cart").children(":visible").length;
    if (count === 0) {
        $("#contact-info").remove();
    }
}

function updateCartSummary() {
    $.post("Home/CartSummary",
                   function (data) {
                       $("#cartSummaryPartialView").html(data);
                   });
}

function registerCart() {
    var customerData = getFormObj("contact-form");

    $.post("ShoppingCart/RegisterCart", customerData, function (response) {
        $.post("http://localhost:53365/api/order/" + "NewOrder", response).done(function (data) {
            swal({
                title: "Purchase complete!",
                text: "Thank you for your purchase!",
                type: "success",
                confirmButtonText: "Back to home",
                closeOnConfirm: false,
                allowEscapeKey: false
            },
            function () {
                window.location.href = "/";
            });
        });
    });
}

function getFormObj(formId) {
    var formObj = {};
    var inputs = $('#' + formId).serializeArray();
    $.each(inputs, function (i, input) {
        formObj[input.name] = input.value;
    });
    return formObj;
}

function updateItemQuantity(itemId, optionalValue) {
   
    if (optionalValue > 0) {
        $("#quantity" + itemId).val(optionalValue);
    }

    var quantityToUpdate = $("#quantity" + itemId).val();
    if (quantityToUpdate <= 0) {
        removeItem(itemId);
        return;
    }
    $.get("http://localhost:53365/api/product/" + itemId,
   function (data, status) {
       if (quantityToUpdate > data.QuantityInStorage) {
           swal({
               title: "QuantityError",
               text: "We don't have that quantity of this item! \n We only have " + data.QuantityInStorage + " in storage.",
               type: "error",
               timer: 2000,
               showConfirmButton: false
           });
           $("#quantity" + itemId).val(prev);
           return;
       }
       var dataToSend = {
           "Product": data,
           "Quantity": quantityToUpdate
       };
       $.post('ShoppingCart/UpdateItemInCart', dataToSend, function (response) {
           $("#cart-price").html(countCartPrice(response)).stop().css("opacity", "0").animate({
               opacity: 1
           });
       }, "json");
   });
}

function removeItem(itemId) {
    $.post("/ShoppingCart/RemoveFromCart", { "id": itemId },
            function (response) {
                $("#item-" + itemId).fadeOut(function() {
                    $("#cart-price").html(countCartPrice(response)).stop().css("opacity", "0").animate({
                        opacity: 1
                    });
                });
                
            });
}

function countCartPrice(data) {

    var totalPrice = 0;
    data.ShoppingCartItems.forEach(function (i) {
        totalPrice += (i.Quantity * i.Product.Price);
    });

    checkCart();
    updateCartSummary();

    return totalPrice;
}

