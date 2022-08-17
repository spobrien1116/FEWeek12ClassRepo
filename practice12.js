$(document).ready(() => {
    console.log("Document loaded.");

    let bookList;

    $.get('http://localhost:3000/posts', data => {
        bookList = data
    }).done(() => buildInfoList())

    const buildInfoList = () => {
        $('#content').empty();
        bookList.forEach(book => {
            $('#content').append(
                `<div class="info-box" id="book${book.id}"> 
                id: ${book.id} ${book.title} ${book.author} 
                </div>`
            )
            $(`book${book.id}`).click(() => removeItem(book.id))
        });
    };

    $('#myForm').submit((event) => {
        event.preventDefault();
        const formData = {
            title: $('#title').val(),
            author: $('#author').val()
        };

        $.post('http://localhost:3000/posts',
            {title: formData.title, author: formData.author},
            (data) => { console.log(data)
        });
    });

    const removeItem = (id) => {
        $.ajax({
            url: `http://localhost:3000/posts/${id}`,
            type: 'DELETE',
            success: function() {
                buildInfoList()
            }
        })
    }

    $('#myUpdateForm').submit((event) => {
        event.preventDefault();
        const formData = {
            id: $('#updateId').val(),
            title: $('#updateTitle').val(),
            author: $('#updateAuthor').val()
        }

        $.ajax({
            url: `http://localhost:3000/posts/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(formData)
        }).done(() => buildInfoList());

        $('#myUpdateForm').trigger('reset');
    });
});