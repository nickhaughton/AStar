function attachEvents() {
    $("#canvas").on("click", function(e) {
        var offset = $(this).offset();
        console.log(findBlockAtPixle(e.pageX - offset.left, e.pageY - offset.top));
    });
}