function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    window.FirebasePlugin.getToken(function(token) {
        SentTokenAjax(token);
        console.log(token);
    }, function(error) {
        console.error(error);
    });

    // window.FirebasePlugin.onTokenRefresh(function(token) {
    //     SentTokenAjax(token);
    //     console.log(token);
    //     alert(token);
    // }, function(error) {
    //     console.error(error);
    // });

    // window.FirebasePlugin.onNotificationOpen(function(notification) {
    //     alert(notification);
    //     console.log(notification);
    // }, function(error) {
    //     console.error(error);
    // });
}

function SentTokenAjax(token) {

    $.ajax(
    {
        url: 'http://velomessenger.ru/wp-content/themes/velomessenger/mobApk/addTokenMobApk.php',
        type: 'POST',
        dataType: 'json',
        async: false,
        data: { post_token: token },
        success: function(response)
        {
            result = $.parseJSON(response);
        },
        error: function(){
            console.log(data);
        }
    });

}
