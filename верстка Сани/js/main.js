'use strict'

$(document).ready
(
	function() 
	{
		/*
			Всплывающие окна
		*/
		function openPopup(id) 
		{
			closePopup();
			$(".js-popup[data-id='" + id + "']").slideDown(500);
		}
	
		function closePopup() 
		{
			$('.js-popup').slideUp(500);
		}
	
		$('.js-popup-close').click(closePopup);
	
		$('.js-btn-popup').click
		(
			function (event) 
			{
				event.preventDefault();
				let indexBtnPopup = $(this).attr('data-popup');
				openPopup(indexBtnPopup);
			}
		);
	
		$('.js-popup').click
		(
			function (e) 
			{
				let popup = $('.js-popup-wrap');
				if (!popup.is(e.target) && popup.has(e.target).length === 0)
					closePopup();
			}
		);



		/*
			Скрыть/показать меню
		*/

		$('.js-show-mainmenu').click
		(
			function(event)
			{
				event.preventDefault();

				let $btn = $(this);
				let $menu = $('.js-mainmenu');
				let $main = $('.main-container');
				let $right = $('.right-sidebar')

				if($menu.hasClass('minimize'))
				{
					$menu.removeClass('minimize');
					$main.removeClass('minimize');
					$right.removeClass('minimize');
				}
				else
				{
					$menu.addClass('minimize');
					$main.addClass('minimize');
					$right.addClass('minimize');
				}

			}
		);

		/*
			Скрыть/показать контейнер с содержимым
		*/
		$('.js-show-container').click
		(
			function(event)
			{
				event.preventDefault();

				let $base = $(this).closest('.base-container');

				let $container = $base.find('.base-container_content');

				if($container.hasClass('none'))
				{
					$container.removeClass('none');
					$base.find('.icon-down').removeClass('icon-down').addClass('icon-up');
				}
				else
				{
					$container.addClass('none');
					$base.find('.icon-up').removeClass('icon-up').addClass('icon-down');
				}
			}
		);

		/*
			Повторитель
		*/

		function updateRepeater($repeater)
		{
			$repeater.children('.repeater-container').children('.repeater-item').each
			(
				function(index)
				{
					$(this).children('.repeater-item_number').find('span').html(index + 1);
				}
			);

			updateRepeaterIndexes($repeater);
		}

		function initRepeaterItem($repeater, $item)
		{
			function addUpButtonEvent($button)
			{
				let $html = $($repeater.children('.js-repeater-fields').html());

				$html.find('[name]').each
				(
					function(index)
					{
						let $input = $(this);

						$input.attr('data-basename', $input.attr('name'));
					}
				);

				$html.find('.container-field_repeater').each
				(
					function(index)
					{
						let $repeterr = $(this);
						$repeterr.attr('data-basename', $repeterr.attr('data-name'));
						initRepeater($repeterr);
					}
				);

				let $item = $('<div class="repeater-item">' + 
								'<div class="repeater-item_number">' +
									'<button class="hide_btn"><div class="icon icon-down"></div></button>' +
									'<span></span>'+
								'</div>'+
								'<div class="repeater-item_content"></div>'+
								'<div class="repeater-item_btns">'+
									'<button class="add-up_btn">+</button>'+
									'<button class="rm_btn">-</button>'+
								'</div>'+
							'</div>');

				initRepeaterItem($repeater, $item);
				$item.find('.repeater-item_content').append($html);

				//$repeter.children('.repeater-container').append($item);
				$button.closest('.repeater-item').before($item);

				updateRepeater($repeater);
			}

			function removeButtonEvent($button)
			{
				$repeater = $button.closest('.container-field_repeater');
				$button.closest('.repeater-item').remove();
				updateRepeater($repeater)
			}

			/*
				клик по кнопке добавить перед
			*/
			$item.find('.add-up_btn').click
			(
				function(event)
				{
					event.preventDefault();
					addUpButtonEvent($(this));
				}
			);

			/*
				клик по кнопке удалить
			*/
			$item.find('.rm_btn').click
			(
				function(event)
				{
					event.preventDefault();
					removeButtonEvent($(this));
				}
			);

			/*
				Обновление имен
			*/
			$item.find('[name]').each
			(
				function(index)
				{
					let $input = $(this);

					$input.attr('data-basename', $input.attr('name'));
				}
			);

			$item.find('.container-field_repeater').each
			(
				function(index)
				{
					let $repeterr = $(this);
					$repeterr.attr('data-basename', $repeterr.attr('data-name'));
					initRepeater($repeterr);
				}
			);
		}

		function updateRepeaterIndexes($repeater)
		{
			let repeaterName = $repeater.attr('data-name');

			$repeater.children('.repeater-container').children('.repeater-item').each
			(
				function(indexItem)
				{
					let $repeaterItem = $(this);

					//let index = 0;

					$repeaterItem.find('[name]').each
					(
						function()
						{
							let $element = $(this);

							if($element.parent().parent().parent().hasClass('js-repeater-fields'))
								return;

							$element.attr('name', repeaterName + '_' + indexItem + '_' + $element.attr('data-basename'))
						}
					);

					$repeaterItem.find('.container-field_repeater').each
					(
						function(index)
						{
							let $repeterr = $(this);

							
							$repeterr.attr('data-name', repeaterName + '_' + indexItem + '_' + $repeterr.attr('data-basename'));
							//initRepeater($repeterr);
						}
					);
				}
			);
		}

		function initRepeater($repeater)
		{
			function initRepeaterItems()
			{
				$repeater.find('.repeater-item').each
				(
					function(index)
					{
						let $item = $(this);
						initRepeaterItem($repeater, $item);
					}
				);

				updateRepeater($repeater);
			}


			function addButtonEvent()
			{
				let $html = $($repeater.children('.js-repeater-fields').html());

				$html.find('[name]').each
				(
					function(index)
					{
						let $input = $(this);
						$input.attr('data-basename', $input.attr('name'));
					}
				);

				$html.find('.container-field_repeater').each
				(
					function(index)
					{
						let $repeterr = $(this);
						$repeterr.attr('data-basename', $repeterr.attr('data-name'));
						initRepeater($repeterr);
					}
				);

				let $item = $('<div class="repeater-item">' + 
								'<div class="repeater-item_number">' +
									'<button class="hide_btn"><div class="icon icon-down"></div></button>' +
									'<span></span>'+
								'</div>'+
								'<div class="repeater-item_content"></div>'+
								'<div class="repeater-item_btns">'+
									'<button class="add-up_btn">+</button>'+
									'<button class="rm_btn">-</button>'+
								'</div>'+
							'</div>');

				initRepeaterItem($repeater, $item);
				$item.find('.repeater-item_content').append($html);

				$repeater.children('.repeater-container').append($item);

				updateRepeater($repeater);
			}

			
			/*
				клик по кнопке добавить
			*/
			$repeater.find('.add_btn').click
			(
				function(event)
				{
					event.preventDefault();
					addButtonEvent();
				}
			);

			initRepeaterItems();
		}

		$('.container-field_repeater').each
		(
			function(index)
			{
				let $repeater = $(this);
				initRepeater($repeater);
				
			}
		);

		/*
			END Повторитель
		*/

		/*
			CkeckBox
		*/
		$('.js-checkbox').click 
		(
			function(event)
			{
				event.preventDefault();
				let $button = $(this);

				let $input = $button.closest('.container-field_wrap').find('input');
				$input.val($input.val()=='1'?'0':'1');

				$button.toggleClass('active');
			}
		);
		/*
			END CkeckBox
		*/
	}
);