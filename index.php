<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
        <meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'">
        <link href="../style.css" rel="stylesheet" type="text/css" />
        <link href="../styleBase.css" rel="stylesheet" type="text/css" />
        <title>Velomessenger</title>
    </head>

    <script>
        var storage = window.localStorage;
        if (storage.getItem('user_logged') == 'true') window.location.href = 'freeOrders';
    </script>
    <body onload="onLoad()">
    <div class="wrapper">
        <div class="header_reg">
            <div class="menu_logo">
                <i><span class="red_color">velo</span>messenger</i>
            </div>
        </div>
        <div class="content">
            <div class="empty_header_reg"></div>
            <div class="main_text_div">
                <h1 class="main_text">Курьерская доставка<br> по Москве и Области</h1>
            </div>
            <div class="enter_reg_box">
                <div class="enter_reg_header">
                    <div class="enter_reg_header_href" id="id_enter_header_href">Вход</div>
                </div>
                <form action="" method="POST" name="n_reg_form" class="enter_reg_forms" id="id_enter_form">
                    <div class="enter_reg_alert_text" id="id_enter_password_alert_text">В пароле буквы или цифры! <br> Не менее 6ти символов</div>
                    <div class="enter_reg_alert_text" id="id_enter_alert_text"></div>
                    <div class="enter_reg_field">
                        <div class="enter_reg_field_text">Телефон</div>
                        <input required type="tel" placeholder="+7(___)___-__-__" class="enter_field_input" name="n_enter_field_phone"  id="id_enter_field_phone">
                    </div>
                    <div class="enter_reg_field">
                        <div class="enter_reg_field_text">Пароль</div>
                        <input required type="password" class="enter_field_input" name="n_enter_field_password"  id="id_enter_field_password">
                    </div>
                    <button type="submit" class="button_class enter_reg_button" onclick="">Вход</button>
                </form>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="../cordova.js"></script>
    <script type="text/javascript" src="../moduls/jquery-3.3.1.min.js" defer></script>
    <script type="text/javascript" src="../moduls/indexScripts.js" defer></script>
    <script type="text/javascript" src="../moduls/functions.js"></script>
    <script type="text/javascript" src="../moduls/jquery.maskedinput.min.js" defer></script>
    </body>
</html>
