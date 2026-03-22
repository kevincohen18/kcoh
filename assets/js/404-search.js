(function() {
    'use strict';

    function searchSite() {
        var input = document.getElementById('searchInput');
        if (input && input.value.trim()) {
            window.location.href = 'index.html#search=' + encodeURIComponent(input.value);
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        var searchBtn = document.getElementById('searchBtn');
        var searchInput = document.getElementById('searchInput');

        if (searchBtn) {
            searchBtn.addEventListener('click', searchSite);
        }
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchSite();
                }
            });
        }
    });
})();
