<!--/*
* Template name: oneOrder
*/-->

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
        <link href="../style.css" rel="stylesheet" type="text/css" />
        <link href="../styleBase.css" rel="stylesheet" type="text/css" />
        <title>Velomessenger</title>
    </head>
    <body onload="onLoad()">
        <div class="wrapper">
            <form action="" method="POST" id="id_form_one_order">
                <input type="hidden" id="id_user_name" name="n_user_name">
                <input type="hidden" id="id_one_order_numb" name="n_one_order_numb">
                <input type="hidden" id="id_one_order_name_entry" name="n_one_order_name_entry">
                <input type="hidden" id="id_one_order_val_entry" name="n_one_order_val_entry">
            </form>
            <div class="header">
                <div class="menu_logo_mini">
                    <img src="../img/ICON.png" class="s_img_class">
                </div>
                <div class="LK_button">
                    <div class="LK_icon_div">
                        <img class="LK_icon" src="../img/user_icon.png">
                    </div>
                    <div class="LK_text"></div>
                </div>
                <div class="new_order_mess">
                    <img class="new_order_mess_icon blink1" src="../img/new_order_icon_red.png">
                </div>
            </div>
            <div class="content">
                <div class="empty_header"></div>
                <div class="one_order"></div>
            </div>
        </div>

        <script type="text/javascript" src="../moduls/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="../moduls/oneOrderScripts.js" defer></script>
        <script type="text/javascript" src="../cordova.js"></script>

    </body>
</html>
