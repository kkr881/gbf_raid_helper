'use strict'

var $optionEl = $('.option');
var $menuEl = $optionEl.find('div.menu');

//OptionInit
function initOption() {
    chrome.storage.local.get(null, result =>{
        // 팝업 노출 위치 옵션 초기화
        $('input:radio[name="position"]').each(function() {
            if(this.value == result['popupPosition']) {
                this.checked = true;
                return false;
            }
        });

        // if(result['popupEnable']) {
        //     this.checked = true;
        //     $('.popup_onoff').find('label').text('ON');
        // } else {
        //     this.checked = false;
        //     $('.popup_onoff').find('label').text('OFF');
        // }

        $('input:checkbox[name="onoff"]').each(function() {
            if(result['popupEnable']) {
                this.checked = true;
                $('.popup_onoff').find('label').text('ON');
                return false;
            } else {
                this.checked = false;
                $('.popup_onoff').find('label').text('OFF');
                return false;
            }
        });

        initEvent();
    });
}

function initEvent() {
    $menuEl.on('click', 'a.item', e => {
        e.preventDefault();

        if (!$(e.currentTarget).hasClass('active')) {
            $menuEl.find('.item').removeClass('active');
            $(e.currentTarget).addClass('active');
            $optionEl.find('.area').removeClass('show');
            $(e.currentTarget).hasClass('popup')
                ? $optionEl.find('.area.popup').addClass('show')
                : $optionEl.parent().find('.area.about').addClass('show');
        }
    });

    $('input[name="position"]').change(() => {
        chrome.storage.local.set({ 'popupPosition': $('input[name="position"]:checked').val() }, () => {
            console.log('Popup Position Changed');
        });
    });

    $('input[name="onoff"]').change(() => {
        chrome.storage.local.set({ 'popupEnable': $('input[name="onoff"]').is(':checked') }, () => {
            $('input[name="onoff"]').is(':checked') ? $('.popup_onoff').find('label').text('ON') : $('.popup_onoff').find('label').text('OFF');
        });
    });
}

window.addEventListener("DOMContentLoaded", initOption, false);