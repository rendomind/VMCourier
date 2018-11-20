<!--/*
* Template name: finishOrders
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
                <div class="nav_type_orders">
                    <div class="left_arrow">
                        <img src="../img/arrowL.png" class="s_img_class" id="id_left_arrow">
                    </div>
                    <div class="nav_type_text backgr_green_color">
                        <h2>Выполненные</h2>
                    </div>
                    <div class="right_arrow">
                        <img src="../img/arrowR_unvis.png" class="s_img_class">
                    </div>
                </div>
                <form action="" method="POST" class="sorting_ord" id="id_sorting_ord" enctype="multipart/form-data">
                    <a class="sort_hrefs" id="id_show_all_href" href="javascript:ShowNewEntries('all')">Все</a>
                    <a class="sort_hrefs marked_href" id="id_show_week_href" href="javascript:ShowNewEntries('week')">За неделю</a>
                    <a class="sort_hrefs" id="id_show_month_href" href="javascript:ShowNewEntries('month')" >За месяц</a>
                    <input type="text" class="inp_search" id="id_inp_search" name="n_inp_search" placeholder="Поиск">
                    <input type="hidden" id="id_type_selection" name="n_type_selection">
                    <input type="hidden" id="id_user_name" name="n_user_name">
                </form>
                <div class="fo_orders"></div>
                <div class="final_summ" id="id_final_earnings"></div>
                <div class="final_summ" id="id_final_earnings_nal"></div>
                <div class="final_summ" id="id_final_earnings_no_nal"></div>
            </div>
        </div>

        <script type="text/javascript" src="../moduls/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="../moduls/jquery.touchSwipe.min.js"></script>
        <script type="text/javascript" src="../moduls/finOrdersScripts.js" defer></script>
        <script type="text/javascript" src="../moduls/functions.js" defer></script>
        <script type="text/javascript" src="../cordova.js"></script>

    </body>
</html>
