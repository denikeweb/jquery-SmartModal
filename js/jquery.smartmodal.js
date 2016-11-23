/*!
 * jQuery SmartModal Plugin v1.0
 * https://github.com/denikeweb/jquery-SmartModal
 *
 * Copyright 2015 Denis Dragomirik
 * Released under the MIT license
 */
(function( $ ) {
	var     isSetModals = false,
			iScrolled = undefined,
			selector = 'smartModal',
			wrapperSelector = 'wrapper',
			keyListeners = true,
			speed = 200;

		var init = function (_selector, _wrapperSelector) {
			if (_selector != undefined) selector = _selector;
			if (_wrapperSelector != undefined) wrapperSelector = _wrapperSelector;
			
			$('.' + selector + '.layer, .' + selector + '.layer-bg, .' + selector + '.modalClose')
				.on ('click', close);
			$('.' + selector + '.modalBox').on ('click', function () {return false;});

			if (keyListeners === true)
				$(document).on ('keydown', function(e) {
					if (e.which == 27) $('.' + selector + '.layer') .click(); // esc   (does not work)
				});
		};
		var open = function (winClassName) {
			iScrolled = $(window).scrollTop();
			$(window).scrollTop(0);
			$('.' + wrapperSelector).css('position', 'fixed').css(
				'margin-top', '-' + iScrolled + 'px'
			);
			$('.' + selector + '.layer-bg').fadeIn (speed);
			$('.' + selector + '.' + winClassName + '.layer').fadeIn (speed);
		};
		var close = function () {
			//close
			$('.' + wrapperSelector).css('margin-top', '0px').css('position', 'absolute');
			$(window).scrollTop(iScrolled);
			$('.' + selector + '.layer').   fadeOut (speed);
			$('.' + selector + '.layer-bg').fadeOut (speed);
		};
		var create = function (title, contentSelector, className) {
			var $contentObg = $(contentSelector);
			if ($contentObg.length == -1)
				return false; // !!!
			var $body = $('body'),
				content = $contentObg.html ();
			$contentObg.remove();
			if (isSetModals === false) {
				$body.append('<div class="' + selector + ' layer-bg"></div>');
				isSetModals = true;
			}

			$body.append(
				'<div class="' + selector + ' layer ' + className + '">'+
				'<div class="' + selector + ' modalBox">'+
				'<div class="' + selector + ' modalClose"></div>'+
				'<div class="' + selector + ' modalHeader">'+
				title +
				'</div>'+
				'<div class="' + selector + ' modalContent">'+
				content +
				'</div>'+
				'<div class="' + selector + ' modalFooter">'+
				'</div>'+
				'</div>'+
				'</div>'
			);
		};

	var plugin = $.smartModal = $.sm = {
		init : function (selector, wrapperSelector) {
			init(selector, wrapperSelector);
		},
		create : function (title, contentSelector, className) {
			create(title, contentSelector, className);
		},
		open : function (winClassName) {
			open(winClassName);
		},
		close : function () {
			close();
		}

	};
})(jQuery);
