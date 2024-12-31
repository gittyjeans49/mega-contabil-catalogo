var popup = document.getElementById('popup');

var popupBtn = document.getElementById('popupBtn');

popupBtn.onclick = function() {
    popup.style.display = 'block';
    }

window.onclick = function(event) {
    if(event.target == popup) {
        popup.style.display = 'none';
    }
}