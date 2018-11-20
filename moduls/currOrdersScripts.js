var free_order_exist=false;
var storage = window.localStorage;
var user_name = storage.getItem('user_name');
if (user_name == '') window.location.href = 'index';
$('.LK_text').text(user_name);
$('#id_user_name').val(user_name);

function ChangeMonth(Month) {
    switch (Month)
    {
        case 1: fMonth="Янв"; break;
        case 2: fMonth="Фев"; break;
        case 3: fMonth="Мар"; break;
        case 4: fMonth="Апр"; break;
        case 5: fMonth="Май"; break;
        case 6: fMonth="Июн"; break;
        case 7: fMonth="Июл"; break;
        case 8: fMonth="Авг"; break;
        case 9: fMonth="Сен"; break;
        case 10: fMonth="Окт"; break;
        case 11: fMonth="Ноя"; break;
        case 12: fMonth="Дек"; break;
    }
    return fMonth
}

var tomorrowData = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
var tday = tomorrowData.getDate();
var tmonth = tomorrowData.getMonth() + 1;
var tyear = tomorrowData.getFullYear();
var ftmonth = ChangeMonth(tmonth);
var TomorrowDate = tday+"-"+ftmonth+"-"+tyear;

var Data = new Date();
var Year = Data.getFullYear();
var Month = Data.getMonth()+1;
var Day = Data.getDate();
var fMonth = ChangeMonth(Month);

var TodayDate = Day+"-"+fMonth+"-"+Year;

$.ajax(
    {
        url: 'http://velomessenger.ru/wp-content/themes/velomessenger/mobApk/currOrdersMobApk.php',
        type: 'POST',
        dataType: 'html',
        async: false,
        data: $('#id_form_cur_orders').serialize(),
        success: function (response) {
            res = $.parseJSON(response);
        }
    });

free_order_exist = res[0].free_order_exist;
if (res[0].number_fields > 0) {
    var curDate = res[1].date, showDate, lastOrderClass = '';

    showDate = curDate;
    if (curDate == TodayDate) showDate = 'сегодня'; else if (curDate == TomorrowDate) showDate = 'завтра';
    $('.fo_orders').append('<div class="day_divider">Доставить: ' + showDate + '</div>');

    for (var i = 1; i <= res[0].number_fields; i++) {

        if (curDate != res[i].date) {
            curDate = res[i].date;
            showDate = curDate;
            if (curDate == TodayDate) showDate = 'сегодня'; else if (curDate == TomorrowDate) showDate = 'завтра';
            $('.fo_orders').append('<div class="day_divider">Доставить: ' + showDate + '</div>');
        }

        if (i == res[0].number_fields) lastOrderClass = ' s_order_last'; else if (res[i].date != res[i + 1].date) lastOrderClass = ' s_order_last'; else lastOrderClass = '';

        $('.fo_orders').append('<div class="short_order' + lastOrderClass + '"></div>');
        $('.short_order:last').append('<div class="s_order_numb">№ ' + res[i].numb_ord + '</div>');
        $('.short_order:last').append('<div class="s_order_price_div"></div>');
        $('.s_order_price_div:last').append('<div class="s_order_price">' + res[i].price + ' руб</div>');
        $('.s_order_price_div:last').append('<div class="s_order_type_pay">' + res[i].pay_type_ord + '</div>');
        $('.short_order:last').append('<div class="s_order_address_div"></div>');
        $('.s_order_address_div:last').append('<div class="s_order_address"></div>');
        $('.s_order_address:last').append('<div class="s_order_address_img_div"><img src="../img/several_addr.png" class="s_order_address_img"></div>');
        $('.s_order_address:last').append('<div class="s_order_address_text">Адресов: ' + res[i].count_addresses + '</div>');
        $('.s_order_address_div:last').append('<div class="s_order_address"></div>');
        $('.s_order_address:last').append('<div class="s_order_address_img_div"><img src="../img/icon_addr_from.png" class="s_order_address_img"></div>');
        $('.s_order_address:last').append('<div class="s_order_address_text">' + res[i].addr_from + '</div>');
        $('.s_order_address_div:last').append('<div class="s_order_address"></div>');
        $('.s_order_address:last').append('<div class="s_order_address_img_div"><img src="../img/times.png" class="s_order_address_img"></div>');
        $('.s_order_address:last').append('<div class="s_order_address_text">с ' + res[i].time_from_from + ' до ' + res[i].time_from_to + '</div>');
        $('.short_order:last').append('<div class="clear"></div>');
    }
}

setInterval(function () {
    $.ajax(
        {
            url: 'http://velomessenger.ru/wp-content/themes/velomessenger/mobApk/checkFreeOrdMobApk.php',
            type: 'POST',
            dataType: 'html',
            async: false,
            success: function (response) {
                res_check = $.parseJSON(response);
            }
        });
    free_order_exist = res_check.free_order_exist;
    ShowFreeOrdMess();
}, 5000);

ShowFreeOrdMess();

function ShowFreeOrdMess() {
    if (free_order_exist)
    {
        $('.new_order_mess').fadeIn(300);
    } else {
        $('.new_order_mess').fadeOut(300);
    }
}

$('.LK_button').click(function () {
    storage.setItem('user_name', '');
    storage.setItem('user_logged', 'false');
    window.location.href = 'index';
});

$('.short_order').click(function () {
    var numb_order_value = $(this).children('.s_order_numb').text().slice(2, 10);
    storage.setItem('one_order_numb', numb_order_value);
    storage.setItem('type_page_from', 'currOrd');
    window.location.href = 'oneOrder';
});

$('.new_order_mess').click(function () {
    window.location.href = 'freeOrders';
});

$('#id_left_arrow').click(function () {
    window.location.href = 'freeOrders';
});

$('#id_right_arrow').click(function () {
    window.location.href = 'finishOrders';
});

$('.nav_type_orders').swipe({
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        if (direction == 'left') {
            window.location.href = 'finishOrders';
        }
        if (direction == 'right') {
            window.location.href = 'freeOrders';
        }
    }
});