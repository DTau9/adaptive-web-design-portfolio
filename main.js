const $body = $('body');
const $navMenu = $('.nav-menu');
const $description = $('.description');
const $viewSite = $('.view-site');
const $sections = $($navMenu).add($viewSite);
const $navMenuItems = $('.nav-menu__item');
const $contents = $('.content');
const $iconSelectDevice = $('.device-switcher__item ');
const $iframeContainer = $('.site-on-device')
const $iframe = $('.iframe-wrapper');
const $iframeForTechnicalTask = $('.technical-task iframe');
const $swipeDescription = $('.swipe-description');
const shiftToZero = 'animated-section_shifted';
const visibilityVisible = 'visibility-visible';
const swipeUp = 'swipe-up';

const state = {
	section: 'contacts',
	device: 'phone'
};
const config = {
	contacts: ['about'],
	lmarkt: ['phone', 'tablet', 'desktop'],
	russgaz: ['phone', 'tablet', 'desktop'],
	kvast: ['desktop'],
	techtask: ['tt']
};

// решение, чтобы спрятать кнопку свайпа при загрузке(плохое)
function descriptionHide() {
	if (screen.width <= 1250 && !config[state.section].includes('phone')) {
		$description.css('display', 'none')
	}
}

descriptionHide();

// спрятать кнопку свайпа при изменнении ширины окна
$(window).resize(function () {
	console.log(screen.width)
	descriptionHide()
});

// обновление приложения
function updateApp() {
	// отображение секции описания в "мобильном" виде
	if (screen.width <= 1250) {
		if (config[state.section].includes('phone')) {
			$description.css('display', 'block');
		} else {
			setTimeout(function () {
				$description.css('display', 'none')
			}, 700)
		}
	}


	if ($body.hasClass(state.section) && $body.hasClass(state.device)) {
		return;
	} else {
		$navMenuItems.removeClass('nav-menu__item_active');
		$description.removeClass(shiftToZero);
		$viewSite.removeClass(shiftToZero);
		$iconSelectDevice.removeClass('device-switcher__item_active');
		$description.removeClass(swipeUp);
		$navMenuItems.filter('[data-item=' + state.section + ']').addClass('nav-menu__item_active');
		$iconSelectDevice.filter('[data-device=' + state.device + ']').addClass('device-switcher__item_active');
	}

	// отложенный код
	setTimeout(function () {
		$contents.removeClass('content_active');
		$contents.filter('[data-item=' + state.section + ']').addClass('content_active');
		$description.addClass(shiftToZero);
		$viewSite.addClass(shiftToZero);

		// определяем ширину экрана с девайсами 
		$body.removeClass().addClass(state.device).addClass(state.section);

		// добавляем классы на iframe и родительский контейнер
		// удаляем все классы, кроме одного
		$iframeContainer.removeClass().addClass('site-on-device')
		$iframeContainer.addClass('site-on-device_' + state.device);

		// отображаем доступные для выбора девайсы
		const availableDevices = config[state.section];
		$iconSelectDevice.each(function (index) {
			// console.log(index)
			// console.log(this)
			const $deviceSwitcherItem = $(this);
			const deviceSwitcherItemType = $deviceSwitcherItem.attr('data-device');
			for (let i = 0; i < availableDevices.length; i++) {
				if (availableDevices[i] === deviceSwitcherItemType) {
					$deviceSwitcherItem.addClass('device-switcher__item_visible');
					break;
				} else {
					$deviceSwitcherItem.removeClass('device-switcher__item_visible');
				}
			}
		})


		//условие для технических задач
		$iframeForTechnicalTask.attr('src', state.urlSite);

		// показываем iframe
		$iframe.removeClass(visibilityVisible);
		$iframe.filter('[data-item=' + state.section + ']').addClass(visibilityVisible);

		// смещение описания
		if (state.device !== 'phone') {
			$description.removeClass(shiftToZero);
		}
	}, 700)
}

function setSectionState(sectionName) {
	state.section = sectionName;
	if (!config[state.section].includes(state.device)) {
		state.device = config[state.section][0]
	}
	updateApp();
}

function showTechnicalTask(url) {
	state.urlSite = url;
	// updateApp();
}

function setDeviceState(deviceName) {
	state.device = deviceName;
	updateApp();
}

// класс с transition накидываем после загрузки документа
$(document).ready(function () {
	setSectionState('contacts');
	$sections.addClass('animated-section');
	$sections.addClass(shiftToZero);
})

$navMenuItems.click(function (e) {
	const htmlNode = e.target;
	const $jQeryNode = $(htmlNode);
	const sectionName = $jQeryNode.attr('data-item');
	const addressSite = $jQeryNode.attr('data-urlsite');
	showTechnicalTask(addressSite);
	setSectionState(sectionName);

})

$iconSelectDevice.click(function (e) {
	const htmlNode = e.target;
	const $jQeryNode = $(htmlNode);
	const deviceName = $jQeryNode.attr('data-device');
	setDeviceState(deviceName);
})

$swipeDescription.click(function (e) {
	$description.toggleClass(swipeUp);
})

$swipeDescription.swipe({
	swipeUp: function (event, direction, distance, duration, fingerCount) {
		$description.addClass(swipeUp);
	},
	swipeDown: function (event, direction, distance, duration, fingerCount) {
		$description.removeClass(swipeUp);
	},
	threshold: 5 //дистанция движения пальца по дисплею
})