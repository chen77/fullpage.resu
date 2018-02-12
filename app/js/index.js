$('.wp-inner').fullpage({
     change: function (e) {
         // 移除动画属性
         $('.page').eq(e.cur).find('.js-animate').each(function() {
             $(this).removeClass($(this).data('animate')).hide();
         });
     },
     afterChange: function (e) {
         // 添加动画属性
         $('.page').eq(e.cur).find('.js-animate').each(function () {
             var $this = $(this);
             var time = $this.data('time');
             setTimeout(function () {
                 $this.addClass($this.data('animate')).show();
             }, time)
         });
     }
});
//播放音乐
var bgAudio = new Audio();
bgAudio.loadStatus = 'unload';
bgAudio.loop = true;
function loadAudio(audio, url, callback) {
    audio.src = url;
    audio.load();
    audio.addEventListener('canplay', function () {
        bgAudio.loadStatus = 'loaded';
        callback();
    });
    audio.addEventListener('loadstart', function () {
        bgAudio.loadStatus = 'loading';
    });
}
function playAudio(){
    if (bgAudio.loadStatus === 'unload') {
        loadAudio(bgAudio, 'media/bg.mp3', function () {
            playAudio();
        });
        return 1;
    }

    bgAudio.play();
}
function stopAudio() {
    bgAudio.pause();
}
bgAudio.addEventListener('playing' ,function (e) {
    $('#music .music-btn').addClass('play');
});
bgAudio.addEventListener('pause' ,function (e) {
    $('#music .music-btn').removeClass('play');
});

$('body').one('touchstart', function () {
    playAudio();
    $('#music').on('touchstart', function (e) {
        if (bgAudio.paused) {
            playAudio();
            return 0;
        }
        stopAudio();
        return 1;
    });
});
window.onload = function() {
    if (bgAudio.loadStatus !== 'unload') {return;}
    playAudio();
};