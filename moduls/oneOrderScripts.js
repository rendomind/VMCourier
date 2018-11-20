var free_order_exist=false;
var storage = window.localStorage;
var user_name = storage.getItem('user_name');
var one_order_numb = storage.getItem('one_order_numb');
var type_page_from = storage.getItem('type_page_from');
if (user_name == '') window.location.href = 'index';
$('#id_one_order_numb').val(one_order_numb);
$('#id_user_name').val(user_name);
$('.LK_text').text(user_name);

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
        url: 'http://velomessenger.ru/wp-content/themes/velomessenger/mobApk/oneOrderMobApk.php',
        type: 'POST',
        dataType: 'html',
        data: $('#id_form_one_order').serialize(),
        async: false,
        success: function(response)
        {
            res = $.parseJSON(response);
        }
    });

free_order_exist = res.free_order_exist;
var showDate = res.date;
var deliv_word;

if (res.date == TodayDate) showDate = 'сегодня'; else if (res.date == TomorrowDate) showDate = 'завтра';
if ((type_page_from == 'freeOrd') || (type_page_from == 'currOrd')) deliv_word = 'Доставить'; else deliv_word = 'Доставлен';
if (res.zone == 'Подмосковье') res.zone='Область';
$('.one_order').append('<div class="day_zone_deliver">'+deliv_word+': ' + showDate + ', '+res.zone+'</div>');

$('.one_order').append('<div class="one_order_numb">№ '+res.numb_ord+'</div>');
$('.one_order').append('<div class="one_order_price_div"></div>');
switch (type_page_from) {
    case 'freeOrd':
        $('.one_order_price_div').append('<div class="one_order_price">' + res.price + ' руб.</div>');
        $('.one_order_price_div').append('<div class="one_order_type_pay">' + res.pay_type_ord + '</div>');
        break;
    case 'currOrd':
    case 'finOrd':
        var pay_type, three_pay_type;
        $('.one_order_price_div').append('<input class="one_order_price courier_input" value="' + res.price + ' руб.">');
        if ((res.pay_type_ord == 'нал') || (res.pay_type_ord == '')) pay_type = 'безнал'; else pay_type = 'нал';
        if (res.pay_type_ord == '') three_pay_type = '<option>нал</option>'; else three_pay_type = '';
        $('.one_order_price_div').append('<select class="one_order_type_pay courier_input courier_input_select"><option selected="selected">' + res.pay_type_ord + '</option><option>' + pay_type + '</option>' + three_pay_type + '</select>');
        break;
}

$('.one_order').append('<div class="one_order_details_div"></div>');
    $('.one_order_details_div').append('<div class="one_order_details"></div>');
        $('.one_order_details:last').append('<div class="one_order_details_img_div"><img src="../img/box.png" class="one_order_details_img"></div>');
        $('.one_order_details:last').append('<div class="one_order_details_text">'+res.weight+',<br>'+res.type_dispatch+'</div>');
    $('.one_order_details_div').append('<div class="one_order_details"></div>');
        $('.one_order_details:last').append('<div class="one_order_details_img_div"><img src="../img/who_pay.png" class="one_order_details_img"></div>');
        $('.one_order_details:last').append('<div class="one_order_details_text">'+res.who_pay+'</div>');
$('.one_order').append('<div class="clear"></div>');

$('.one_order').append('<div class="one_order_address_inf"></div>');
    $('.one_order_address_inf:last').append('<h3>Забрать</h3>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/icon_addr_from.png" class="one_order_addr_inf_img"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">'+res.addr_from+'</div>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/phone_tybe.png" class="one_order_addr_inf_img"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text"><a href="tel:'+res.phone_from+'">'+res.phone_from+'</a></div>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/person_icon_green.png" class="one_order_addr_inf_img"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">'+res.person_from+'</div>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/times.png" class="one_order_addr_inf_img"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">с '+res.time_from_from+' до '+res.time_from_to+'</div>');
    if (res.add_inf_from != '')
    {
        $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/addInf.png" class="one_order_addr_inf_img"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">' + res.add_inf_from + '</div>');
    }

$('.one_order').append('<div class="one_order_address_inf"></div>');
    $('.one_order_address_inf:last').append('<h3>Доставить</h3>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/icon_addr_to.png" class="one_order_addr_inf_img"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">'+res.addr_to+'</div>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/phone_tybe.png" class="one_order_addr_inf_img"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text"><a href="tel:'+res.phone_to+'">'+res.phone_to+'</a></div>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/person_icon_green.png" class="one_order_addr_inf_img"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">'+res.person_to+'</div>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/times.png" class="one_order_addr_inf_img"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">с '+res.time_to_from+' до '+res.time_to_to+'</div>');
    if (res.add_inf_to != '')
    {
        $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/addInf.png" class="one_order_addr_inf_img"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">' + res.add_inf_to + '</div>');
    }

if (res.addr_to_add1 != '')
{
    $('.one_order').append('<div class="one_order_address_inf"></div>');
    $('.one_order_address_inf:last').append('<h3>Доп. адрес 1</h3>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/icon_addr_to.png" class="one_order_addr_inf_img"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">'+res.addr_to_add1+'</div>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/phone_tybe.png" class="one_order_addr_inf_img"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text"><a href="tel:'+res.phone_to_add1+'">'+res.phone_to_add1+'</a></div>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/person_icon_green.png" class="one_order_addr_inf_img"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">'+res.person_to_add1+'</div>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/times.png" class="one_order_addr_inf_img"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">с '+res.time_to_from_add1+' до '+res.time_to_to_add1+'</div>');
    if (res.add_inf_to_add1 != '')
    {
        $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/addInf.png" class="one_order_addr_inf_img"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">' + res.add_inf_to_add1 + '</div>');
    }
}
if (res.addr_to_add2 != '')
{
    $('.one_order').append('<div class="one_order_address_inf"></div>');
    $('.one_order_address_inf:last').append('<h3>Доп. адрес 2</h3>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/icon_addr_to.png" class="one_order_addr_inf_img"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">'+res.addr_to_add2+'</div>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/phone_tybe.png" class="one_order_addr_inf_img"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text"><a href="tel:'+res.phone_to_add2+'">'+res.phone_to_add2+'</a></div>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/person_icon_green.png" class="one_order_addr_inf_img"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">'+res.person_to_add2+'</div>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/times.png" class="one_order_addr_inf_img"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">с '+res.time_to_from_add2+' до '+res.time_to_to_add2+'</div>');
    if (res.add_inf_to_add2 != '')
    {
        $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/addInf.png" class="one_order_addr_inf_img"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">' + res.add_inf_to_add2 + '</div>');
    }
}
if (res.addr_to_add3 != '')
{
    $('.one_order').append('<div class="one_order_address_inf"></div>');
    $('.one_order_address_inf:last').append('<h3>Доп. адрес 3</h3>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/icon_addr_to.png" class="one_order_addr_inf_img"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">'+res.addr_to_add3+'</div>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/phone_tybe.png" class="one_order_addr_inf_img"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text"><a href="tel:'+res.phone_to_add3+'">'+res.phone_to_add3+'</a></div>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/person_icon_green.png" class="one_order_addr_inf_img"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">'+res.person_to_add3+'</div>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/times.png" class="one_order_addr_inf_img"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">с '+res.time_to_from_add3+' до '+res.time_to_to_add3+'</div>');
    if (res.add_inf_to_add3 != '')
    {
        $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/addInf.png" class="one_order_addr_inf_img"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">' + res.add_inf_to_add3 + '</div>');
    }
}
if (res.addr_to_add4 != '')
{
    $('.one_order').append('<div class="one_order_address_inf"></div>');
    $('.one_order_address_inf:last').append('<h3>Доп. адрес 4</h3>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/icon_addr_to.png" class="one_order_addr_inf_img"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">'+res.addr_to_add4+'</div>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/phone_tybe.png" class="one_order_addr_inf_img"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text"><a href="tel:'+res.phone_to_add4+'">'+res.phone_to_add4+'</a></div>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/person_icon_green.png" class="one_order_addr_inf_img"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">'+res.person_to_add4+'</div>');
    $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="img/times.png" class="one_order_addr_inf_img"></div>');
    $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">с '+res.time_to_from_add4+' до '+res.time_to_to_add4+'</div>');
    if (res.add_inf_to_add4 != '')
    {
        $('.one_order_address_inf:last').append('<div class="one_order_addr_inf_div"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_img_div"><img src="../img/addInf.png" class="one_order_addr_inf_img"></div>');
        $('.one_order_addr_inf_div:last').append('<div class="one_order_addr_inf_text">' + res.add_inf_to_add4 + '</div>');
    }
}

switch (type_page_from){
    case 'freeOrd':
        $('.one_order').append('<button type="button" class="button_class one_order_button_free" onclick="javascript:TakeOrderFunc();">Взять в работу</button></div>');
        break;
    case 'currOrd':
        $('.one_order').append('<button type="button" class="button_class one_order_button_curr" onclick="javascript:CancelOrderFunc();">Отменить заказ</button></div>');
        $('.one_order').append('<button type="button" class="button_class one_order_button_curr" onclick="javascript:FinishOrderFunc();">Заказ выполнен</button></div>');
        break;
}

function TakeOrderFunc()
{
    $.ajax(
        {
            url: 'http://velomessenger.ru/wp-content/themes/velomessenger/mobApk/takeOrderMobApk.php',
            type: 'POST',
            dataType: 'html',
            async: false,
            data: $('#id_form_one_order').serialize(),
            success: function(response)
            {
                res = $.parseJSON(response);
            }
        });
    window.location.href = 'currOrders';
}

function CancelOrderFunc()
{
    $.ajax(
        {
            url: 'http://velomessenger.ru/wp-content/themes/velomessenger/mobApk/cancelOrderMobApk.php',
            type: 'POST',
            dataType: 'html',
            async: false,
            data: $('#id_form_one_order').serialize(),
            success: function(response)
            {
                res = $.parseJSON(response);
            }
        });
    window.location.href = 'currOrders';
}

function FinishOrderFunc()
{
    $.ajax(
        {
            url: 'http://velomessenger.ru/wp-content/themes/velomessenger/mobApk/finishOrderMobApk.php',
            type: 'POST',
            dataType: 'html',
            async: false,
            data: $('#id_form_one_order').serialize(),
            success: function(response)
            {
                res = $.parseJSON(response);
            }
        });
    window.location.href = 'currOrders';
}

$('.courier_input').change(function(){

    if ( $(this).hasClass('one_order_price') )
    {
        $('#id_one_order_name_entry').val('price');
    }
    if ( $(this).hasClass('one_order_type_pay') )
    {
        $('#id_one_order_name_entry').val('pay_type_ord');
    }

    $('#id_one_order_val_entry').val($(this).val());

    $.ajax(
        {
            url: 'http://velomessenger.ru/wp-content/themes/velomessenger/mobApk/editEntriesMobApk.php',
            type: 'POST',
            dataType: 'html',
            async: false,
            data: $('#id_form_one_order').serialize(),
            success: function(response)
            {
                res = $.parseJSON(response);
            }
        });
});

ShowFreeOrdMess();

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

function ShowFreeOrdMess() {
    if (free_order_exist)
    {
        $('.new_order_mess').fadeIn(300);
    } else {
        $('.new_order_mess').fadeOut(300);
    }
}

$('.LK_button').click(function () {
    storage.setItem('user_name', '')
    storage.setItem('user_logged', 'false');
    window.location.href = 'index';
});

$('.new_order_mess').click(function () {
    window.location.href = 'freeOrders';
});