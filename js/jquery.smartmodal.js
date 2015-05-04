/*!
 * jQuery Lite Alert Plugin v1.0
 * https://github.com/denikeweb/jquery-LiteAlert
 *
 * Copyright 2015 Denis Dragomirik
 * Released under the MIT license
 */
(function( $ ) {
	/*config = {
		classes : {
			box: 'lite-alert-box',
			item: 'lite-alert-item',
			close: 'lite-alert-item-close',
			header: 'lite-alert-item-header',
			content: 'lite-alert-item-content',
			footer: 'lite-alert-item-footer'
		},
		speed: 200
	};
	hide = function () {
		var jQueryObjItem = $(this).parent ();
		jQueryObjItem.slideUp (config.speed, function () {jQueryObjItem.remove()});
	};
	show = function (headerText, contentText, footerText) {
		if (headerText  == undefined) headerText  = '';
		if (contentText == undefined) contentText = '';
		if (footerText  == undefined) footerText  = '';
		jQueryObjBox = $('.' + config.classes.box);
		if (jQueryObjBox.length == 0) {
			$('body').append ('<div class="' + config.classes.box + '"></div>');
			jQueryObjBox = $('.' + config.classes.box);
		}
		jQueryObjBox.prepend (
			'<div class="' + config.classes.item + '" style="display:none">' +
				'<div class="' + config.classes.close + '"></div>' +
				'<div class="' + config.classes.header + '">'  + headerText  + '</div>' +
				'<div class="' + config.classes.content + '">' + contentText + '</div>' +
				'<div class="' + config.classes.footer + '">'  + footerText  + '</div>' +
			'</div>'
		); //create
		var jQueryObjItem = $('.' + config.classes.item).first();
		jQueryObjItem.slideDown (config.speed);
		jQueryObjItem.children('.' + config.classes.close)
			.on('click', hide);
	};*/
	var     isSetModals = false,
			iScrolled = undefined,
			selector = 'smartModal',
			wrapperSelector = 'wrapper',
			keyListeners = true;

		init = function (_selector, _wrapperSelector) {
			if (_selector != undefined) selector = _selector;
			if (_wrapperSelector != undefined) wrapperSelector = _wrapperSelector;
			var _this = this,
				handler = function () { _this.close (); };
			$('.' + selector + '.layer, .' + selector + '.layer-bg, .' + selector + '.modalClose')
				.on ('click', handler);
			$('.' + selector + '.modalBox').on ('click', function () {return false;});

			if (keyListeners === true)
				$(document).on ('keydown', function(e) {
					if (e.which == 27) $('.' + selector + '.layer') .click(); // esc   (does not work)
				});
		};
		open = function (winClassName) {
			iScrolled = $(window).scrollTop();
			$(window).scrollTop(0);
			$('.' + wrapperSelector).css('position', 'fixed').css(
				'margin-top', '-' + iScrolled + 'px'
			);
			$('.' + selector + '.layer-bg').fadeIn (200);
			$('.' + selector + '.' + winClassName + '.layer').fadeIn (200);
		};
		close = function () {
			//close
			$('.' + wrapperSelector).css('margin-top', '0px').css('position', 'absolute');
			$(window).scrollTop(iScrolled);
			$('.' + selector + '.layer').   fadeOut (200);
			$('.' + selector + '.layer-bg').fadeOut (200);
		};
		create = function (title, contentSelector, className) {
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