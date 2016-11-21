$(document).ready(function () {
    $("form").submit(function (data) {
        registerCart();
        return false;
    });

});

function registerCart() {
    var customerData = getFormObj("contact-form");

    $.post("ShoppingCart/RegisterCart", customerData, function (response) {
        //response.BilledDate = parseDate(response.BilledDate);
        //response.SentDate = parseDate(response.SentDate);
        //response.OrderedDate = parseDate(response.OrderedDate);

        // TODO: SEND TO CHECKOUT

        $.post("http://localhost:53365/api/order/", response).done(function (data) {
            //window.location.href = '/Home/Index/';
            swal({
                title: "Purchase complete!",
                text: "Thank you for your purchase!",
                type: "success",
                //showCancelButton: true,
                //confirmButtonColor: "#DD6B55",
                confirmButtonText: "Back to home",
                closeOnConfirm: false,
                allowEscapeKey: false
            },
            function () {
                window.location.href = "/";
            });
        });
        console.log(response);
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

function updateItemQuantity(itemId) {

    var previous;
    var $el = $("#quantity" + itemId);
    $el.data('oldVal', $el.val());


    $el.change(function () {
        //store new value
        var $this = $(this);
        var newValue = $this.data('newVal', $this.val());
            console.log("new value:" + newValue);
        })
    .focus(function () {
        // Get the value when input gains focus
        var previous = $(this).data('oldVal');
        console.log("old value:" + previous);
    });


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
               text: "We don't have that quantity of this item!",
               type: "error",
               timer: 2000,
               showConfirmButton: false
           });
           $("#quantity" + itemId).val(previous);
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

