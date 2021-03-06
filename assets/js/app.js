$(document).ready(function () {
    console.log('script ready')

    $('.menu_area').click(function (event) {
        $(this).closest('.sidebar_position').toggleClass('active');
        if ($(this).closest('.sidebar_position').addClass('sidebar_animation_hide')) {
            $(this).closest('.sidebar_position').addClass('sidebar_animation_hide');
        }
        if (!$(this).closest('.sidebar_position').hasClass('block_open_sub_menu')) {
            setTimeout(function () {
                $('.menu_area').closest('.sidebar_position').addClass("block_open_sub_menu");
            }, 500);
        } else {
            $(this).closest('.sidebar_position').removeClass('block_open_sub_menu');
        }
    });

    $('.field_section_header').click(function (event) {
        $(this).closest('.field_section').toggleClass('hid_block');
    });


    $('.main_menu').click(function (event) {
        if ($(this).closest('.control_menu').hasClass('active')) {
            $(this).closest('.control_menu').toggleClass('active');
        } else {
            $('.control_menu').removeClass('active');
            $(this).closest('.control_menu').addClass('active');
        }
    });
    $('.header_admin_notification').click(function (e) {
        $(this).closest('.header_admin').find('.show').find('.notification_message').toggleClass('active_show');

        if ($('.notification').hasClass('none')) {
            $('.notification').removeClass('none')
        }

        if (!$(this).closest('.header_admin').hasClass('show_not')) {
            $('.show_triangle').removeClass('none');
            if (!$('.notification_not_found').hasClass('none')) {
                console.log('not_none')
                $('.notification_not_found').removeClass("animate_not_open");
                setTimeout(function () {
                    $('.notification_not_found').addClass('none animate_not_open');
                    $('.show_triangle').addClass('none');
                }, 300);
            } else {
                console.log('remove_none')
                // $('.show_triangle').toggleClass('none');
                $('.notification_not_found').removeClass('none');
            }
        } else {
            if ($('.show_triangle').hasClass('none')) {
                $('.show_triangle').removeClass('none');
            } else {
                setTimeout(function () {
                    $('.show_triangle').addClass('none');
                }, 300);
            }
        }
    });

    $('.delete_notif').click(function (event) {
        let notification_mess = $(this).closest('.notification_message');
        notification_mess.removeClass('active_show');
        setTimeout(function () {
            notification_mess.remove();
            let header_admin = $('.header_admin');
            if (header_admin.find('.notification_message').length === 0) {
                console.log('9999');
                header_admin.find('.header_admin_notification').removeClass('active');
                header_admin.find('.show_triangle').addClass('none');
                header_admin.removeClass('show_not');
                $('.show_triangle').addClass('none');
            } else {
                // console.log(header_admin.find('.notification_message'))
            }
        }, 300);
    })

    $('.single_selected_item').click(single_selected_item)

    function single_selected_item(event) {
        $(this).closest('.single_selected_field').find('.single_items_container').toggleClass('container_hidden');
        $(this).find('.item_icon').toggleClass('open_single');
    }

    $('.custom_selection_item').click(custom_selection_item)

    function custom_selection_item(event) {
        let selected_val = $(this).find('.title_section').text();
        $(this).closest('.single_selected_field').find('.item_text').text(selected_val);
        $(this).closest('.single_items_container').find('.custom_selection_item').attr('data-value', 0);
        $(this).attr('data-value', 1);
        $(this).closest('.single_items_container').toggleClass('container_hidden');
        $(this).closest('.select_list').find('.item_icon').toggleClass('open_single');
    }

    $('.click').click(check_box)

    function check_box(event) {
        if ($(this).closest('.custom_checkbox').hasClass('checked')) {
            $(this).closest('.custom_checkbox').find('.custom_input_text').attr('value', '0');
        } else {
            $(this).closest('.custom_checkbox').find('.custom_input_text').attr('value', '1');
        }
        $(this).closest('.custom_checkbox').toggleClass('checked')
    }

    $('.switch_closed').click(switch_closed);

    function switch_closed(event) {
        $(this).closest('.custom_switch').toggleClass('switch_off');
        if ($(this).closest('.custom_switch').hasClass('switch_off')) {
            console.log('0');
            $(this).closest('.switch_section').find('.switch_status').attr('value', '0');
        } else {
            console.log('1');
            $(this).closest('.switch_section').find('.switch_status').attr('value', '1');
        }
    }

    $('.copy_item').click(control_multiple_item);

    function control_multiple_item(event) {
        if (!$(this).hasClass('remove') && !$(this).hasClass('checked')) {
            let clone_item = $(this).clone()
            clone_item.appendTo($(this).closest('.multiple_control').find('.multiple_section_2').find('.paste_clone')).addClass('remove');
            clone_item.click(control_multiple_item);
            $(this).addClass('checked');
        }
        if ($(this).hasClass('remove')) {
            console.log("+++ ");
            let data_item_id = $(this).attr("data-item_id");
            console.log("data_item_id = " + data_item_id);
            $(this).closest('.multiple_control').find('.multiple_section_1').find("[data-item_id=" + data_item_id + "]").removeClass('checked').find('.custom_selection_item').attr('data-value', '0');
            $(this).remove();
        }
    }

    $('.tab_section_tab_title').click(function (event) {
        $('.tab_section_tab_title').removeClass('active');
        $(this).addClass('active');
        let data_index = $(this).attr('data-index-selected');

        let $fields = $(this).closest('.tab_section').find('.fields');

        $fields.find('.section_tab_field').removeClass('active');
        // setTimeout(function () {
        //     }, 300);
        $fields.find('.section_tab_field').addClass('none');
        $fields.find("[data-index-selected=" + data_index + "]").removeClass('none').addClass('active');

    })

    // $('.repeater_button .add_item').click(add_button);
    $('.js_add_section').on('click', add_section);

    function add_section(event) {
        let clone = $(this).closest('.repeater').children('.repeater_field').children('.content_section').clone();
        clone.find('.repeater_button').click(add_section);
        clone.find('.add_item').click(add_section);
        clone.find('.switch_closed').click(switch_closed);
        clone.find('.js-open-file-popup').click(js_open_file_popup);
        clone.find('.delete_item').click(delete_item_repeat);
        clone.find('.single_selected_item').click(single_selected_item);
        clone.find('.custom_selection_item').click(custom_selection_item);
        clone.find('.click').click(check_box)

        if ($(this).children('.position').length > 0) {
            console.log('1111');
            $(this).closest('.content_section').before(clone);
        } else {
            console.log('2222');
            clone.appendTo($(this).closest('.repeater').children('.content_repeater'));
        }

        set_attr_repeat($(this));

        if (!($(this).closest('.repeater').children('.button_section').hasClass('border_top'))) {
            $(this).closest('.repeater').children('.button_section').addClass('border_top');
        }
    }

    $('.delete_item').click(delete_item_repeat);

    function delete_item_repeat(event) {
        let repeater = $(this).closest('.repeater');
        $(this).closest('.content_section').remove();
        console.log('count: ' + repeater.children('.content_repeater').children('.content_section').length);
        if (repeater.children('.content_repeater').children('.content_section').length === 0) {
            repeater.children('.button_section').removeClass('border_top');
        }
        set_attr_repeat(repeater);
    }

    function set_attr_repeat(this_) {
        let prefix;
        if (!this_.hasClass('.repeater'))
            this_ = this_.closest('.repeater');
        prefix = this_.attr('name');
        let count_repeater = this_.children('.content_repeater').children('.content_section').children('.content_item').length;
        console.log('count_repeater = ' + count_repeater);
        console.log('prefix = ' + prefix);

        let $items = this_.children('.content_repeater').children('.content_section').children('.content_item');

        $items.each
        (
            function (index) {
                let $element = $(this).children('.js_find_elem');
                console.log('index =' + index);
                $(this).closest('.content_section').children('.count_item').text(++index);
                $element.each
                (
                    function (index2) {
                        $current_elem = $(this).find('.js_paste_name');
                        $find_base_name = $current_elem.attr('data-base_name');
                        if (typeof $find_base_name === typeof undefined || $find_base_name === false) {
                            $current_elem.attr('data-base_name', $current_elem.attr('name'));
                        }
                        $current_elem.attr('name', prefix + '_' + index + '_' + $current_elem.attr('data-base_name'));
                    }
                );
                let $repeater = $(this).children('.repeater');
                $repeater.each
                (
                    function (index2) {
                        $repeater_base_name = $(this).attr('data-base_name');
                        if (typeof $repeater_base_name === typeof undefined || $repeater_base_name === false) {
                            $(this).attr('data-base_name', $(this).attr('name'));
                        }
                        console.log('prefix = ' + prefix);
                        console.log('index = ' + index);
                        console.log('repeater_base_name = ' + $(this).attr('data-base_name'));
                        $(this).attr('name', prefix + '_' + index + '_' + $(this).attr('data-base_name'))
                        set_attr_repeat($(this));
                    }
                );
            }
        );
    }

    // popup

    function openPopup(id) {
        // closePopup();
        console.log('show popup')
        let elem = $(".js-media-popup[data-id='" + id + "']");
        elem.removeClass('animate-bg-popup-close')
        elem.addClass('animate-bg-popup');
    }

    function closePopup() {
        console.log('hide popup')
        let elem = $(this).closest('.popup');
        elem.removeClass('animate-bg-popup');
        elem.addClass('animate-bg-popup-close')
    }

    $('.js-popup-close').click(closePopup);

    $('.js-open-file-popup').click(js_open_file_popup)

    function js_open_file_popup(event) {
        event.preventDefault();
        let indexBtnPopup = $(this).attr('data-popup');
        openPopup(indexBtnPopup);
    }

    $('.js-close-popup').click(closePopup
    );
})