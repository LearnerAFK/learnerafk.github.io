$(document).ready(function () {
    // Add Topic
    $('#addTopicForm').submit(function (e) {
        e.preventDefault();
        var password = prompt("Please enter the password:");
        if (password === '0110') {
            var TopicName = $('#TopicName').val();
            var TopicLink = $('#TopicLink').val();
            var topicName = $('#topicName').val();
            // Add Topic logic here
            // For example, you can append a new list item to the Topic list
            $('#TopicList').append('<li class="Topic"><a href="' + TopicLink + '">' + TopicName + '</a> <button type="button" class="btn btn-danger delete-button">Delete</button></li>');
            // Clear form fields
            $('#TopicName').val('');
            $('#TopicLink').val('');
        } else {
            alert("Incorrect password");
        }
    });

    // Delete Topic
    $(document).on('click', '.delete-button', function () {
        var TopicName = $(this).parent().find('a').text();
        var password = prompt("Please enter the password:");
        if (password === '0110') {
            // Delete Topic logic here
            // For example, you can remove the corresponding list item from the Topic list
            $(this).parent().remove();
        } else {
            alert("Incorrect password");
        }
    });
});