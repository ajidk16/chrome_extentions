document.getElementById('newTabOpen').addEventListener('click', function () {
    chrome.tabs.create({
        'url': 'chrome:newtab'
    })
})