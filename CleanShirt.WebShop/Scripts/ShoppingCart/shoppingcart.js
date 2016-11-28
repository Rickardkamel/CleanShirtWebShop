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
});

function registerCart() {
    var customerData = getFormObj("contact-form");

    $.post("ShoppingCart/RegisterCart", customerData, function (response) {
        $.post("http://localhost:53365/api/order/", response).done(function (data) {
            //window.location.href = '/Home/Index/';
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

//function parseDate(date) {
//    var dateInString = '{ "billedDate": ' + '"' + date + '"' + '}';
//    var parsed = JSON.parse(dateInString, function (key, value) {
//        if (typeof value === 'string') {
//            var d = /\/Date\((\d*)\)\//.exec(value);
//            return (d) ? new Date(+d[1]) : value;
//        }
//        return value;
//    });
//    return parsed;
//}

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

