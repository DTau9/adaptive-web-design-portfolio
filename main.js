const $body = $('body');
const $navMenu = $('.nav-menu');
const $description = $('.description');
const $viewSite = $('.view-site');
const $sections = $($navMenu).add($description).add($viewSite);
const $navMenuItems = $('.nav-menu__item');
const $contents = $('.content');
const $iconSelectDevice = $('.device-switcher__item ');
const $iframeContainer = $('.site-on-device')
const $iframe = $('iframe');
const shiftToZero = 'animated-section_shifted';
const visibilityVisible = 'visibility-visible';

const state = {
	section: 'lmarkt',
	device: 'phone'
};
const config = {
	lmarkt: ['phone', 'tablet', 'desktop'],
	russgaz: ['phone', 'tablet', 'desktop'],
	kvast: ['desktop'],
	contacts: ['about']
};

// обновление приложения
function updateApp() {
	if ($body.hasClass(state.section) && $body.hasClass(state.device)) {
		return;
	} else {
		$navMenuItems.removeClass('nav-menu__item_active');
		$description.removeClass(shiftToZero);
		$viewSite.removeClass(shiftToZero);
		$iconSelectDevice.removeClass('device-switcher__item_active');
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
					break
				} else {
					$deviceSwitcherItem.removeClass('device-switcher__item_visible');
				}
			}
		})

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

function setDeviceState(deviceName) {
	state.device = deviceName;
	updateApp();
}

// класс с transition накидываем после загрузки документа
$(document).ready(function () {
	setSectionState('lmarkt');
	$sections.addClass('animated-section');
	$sections.addClass(shiftToZero);
})

$navMenuItems.click(function (e) {
	const htmlNode = e.target;
	const $jQeryNode = $(htmlNode);
	const sectionName = $jQeryNode.attr('data-item');
	setSectionState(sectionName);
})

$iconSelectDevice.click(function (e) {
	const htmlNode = e.target;
	const $jQeryNode = $(htmlNode);
	const deviceName = $jQeryNode.attr('data-device');
	setDeviceState(deviceName);
})
// !-------------------          ----------                -