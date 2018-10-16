const $container = $('#container');
const count = [0, 12];
const moreCount = 6;
const one = 1;
let idCounter = 0;

(function content() {
    let json = 'data/media.json';

    $.getJSON(json, {
            format: 'json'
        })
        .done(function (data) {
            let wrap = [];
            let objects = [];
            let user = {
                profile_pic_url: data.profile_pic_url,
                "username": data.username
            };

            $.each(data.media, function (i, item) {
                let $block = $('<div>').attr('data-id', idCounter);

                $('<img>').attr('src', item.display_url).appendTo($block);
                $block.append(`<ul><li class='like'><span></span><span>${item.edge_liked_by.count}</span></li><li class='comment'><span></span><span>${item.edge_media_to_comment.count}</span></li></ul>`);

                wrap.push($block);
                objects.push(item);
                idCounter += one;
            });

            $('<p class="more" id="more">View More</p>').insertAfter($container);

            function add() {
                for (let key in wrap) {
                    if (key >= count[0] && key < count[1]) {
                        $(wrap[key]).appendTo($container)
                    };
                };

                if (count[1] >= wrap.length) {
                    $('#more').css('display', 'none');
                }
            };

            add();

            $('#more').on('click', function () {
                count[0] = count[1];
                count[1] += moreCount;
                add();
            });

            $('#container').on('click', '[data-id]', function () {
                createModal(user, objects, $(this).data('id'));
            });

        });
})()

function createModal(user, objects, id) {
    let $modalWindow = $(`<div id="myModal" class="modal">
        <div class="closeModal"><span>×</span></div>
        <a class="prev"></a>
        <div class="closeModal"><span>×</span></div>
        <div class="modal-content">
            <div class="imgWrap">
                <img src=${objects[id].display_url} alt="">
            </div>
            <div class="textWrap">
              <div class="userBlock"><img src='${user.profile_pic_url}' alt=""><p>${user.username}•</p><p class="follow">Follow</p></div>
                <p>${objects[id].edge_media_to_caption}</p>
                <div class="likeBlock"><p>${objects[id].edge_liked_by.count} likes</p></div>
                <div class="comBlock"><p>Add Comment</p></div>
            </div>
        </div>
        <a class="next"></a>
    </div>`);

    $modalWindow.insertAfter($container);

    if (id === 0) {
        $('.prev').remove();
    } else if (id === objects.length - 1) {
        $('.next').remove();
    };

    $('.closeModal').on('click', () => $($modalWindow).remove());
    
    $('html').keydown(function (e) {
        if (e.keyCode == 27) {
            $($modalWindow).remove()
        };
    });

    function change() {
        $($modalWindow).remove();
        createModal(user, objects, id);
        window.getSelection().removeAllRanges();
    };

    $('.next').on('click', () => {
        if (id < objects.length) {
            id += one;
            change();
        };
    });

    $('.prev').on('click', () => {
        if (id > 0) {
            id -= one;
            change();
        };
    });
};
