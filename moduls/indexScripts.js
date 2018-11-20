$(function(){
    $("#id_enter_field_phone").mask("+7(999)999-99-99");
});

$('#id_enter_form').submit(function(event)
{
    event.preventDefault();
    event.stopImmediatePropagation();

    $('#id_enter_alert_text').fadeOut(0);
    var pattern_password = /^[A-Za-zА-Яа-я0-9]{6,}/;

    $('#id_enter_password_alert_text, #id_enter_alert_text').fadeOut(0);

    if (!pattern_password.test($('#id_enter_field_password').val()))
    {
        $('#id_enter_password_alert_text').fadeIn(300);
        document.getElementById('id_enter_field_password').focus();
    }
    else
    {
        $.ajax(
            {
                url: 'http://velomessenger.ru/wp-content/themes/velomessenger/mobApk/loginMobApk.php',
                type: 'POST',
                dataType: 'html',
                async: false,
                data: $('#id_enter_form').serialize(),
                success: function(response)
                {
                    result = $.parseJSON(response);
                },
                error: function(){
                    console.log(data);
                }
            });
        if (result != 'Телефон или пароль неверные.')
        {
            storage.setItem('user_name', result)
            storage.setItem('user_logged', 'true')
            setTimeout(RedirectFreeOrd, 100);
        }
        else
        {
            $('#id_enter_alert_text').text(result);
            $('#id_enter_alert_text').fadeIn(300);
        }
    }
});

function RedirectFreeOrd()
{
    window.location.href = 'freeOrders';
}