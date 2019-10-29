function $(id) {
    return document.getElementById(id)
}

function create(name, props) {
    element = document.createElement(name)

    for (var i in props) {
        element[i] = props[i]
    }

    return element
}

function get(url, nameFunct) {
    // ajax js native
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // res = JSON.parse(this.responseText)
            nameFunct(res = JSON.parse(this.responseText))
            // console.log(this.responseText)
            // $('ayat').innerHTML = res.ayat.data.ar[0].teks
        }
    }

    xhttp.open("GET", url, true)
    xhttp.send()
}

function listSurah(res) {
    var msgContainer = document.createDocumentFragment()

    for (var i = 0; i < res.hasil.length; i++) {
        msgContainer.appendChild(create('option', {
            text: res.hasil[i].nama,
            value: res.hasil[i].nomor,
            id: res.hasil[i].nomor
        }))
    }

    $('listSurah').appendChild(msgContainer)
}

function listAyat(res) {
    $('listAyat').innerHTML = ""
    var msgContainer = document.createDocumentFragment()

    for (var i = 1; i <= res.hasil[0].ayat; i++) {
        msgContainer.appendChild(create('option', {
            text: i,
            value: i
        }))
    }

    $('listAyat').appendChild(msgContainer)
    $('listAyat').value = 1
}

function ayat(res) {
    $('ayat').innerHTML = res.ayat.data.ar[0].teks
    $('terjemah').innerHTML = res.ayat.data.id[0].teks
}

window.onload = function () {
    //event surah
    this.$('listSurah').addEventListener('change', function () {
        // console.log(this.value);
        get("https://api.banghasan.com/quran/format/json/surat/" + this.value, listAyat)
    })

    get("https://api.banghasan.com/quran/format/json/surat/1/ayat/1", ayat)
    get("https://api.banghasan.com/quran/format/json/surat", listSurah)
    get("https://api.banghasan.com/quran/format/json/surat/1", listAyat)
}