
function allQueries(option){
    let all = ['Future-Time','Conflict','Players','Motivation','Location']
    for (const ind in all) {
        queryCSV(all[ind],option)
    }
}

const chooseMod = async (mods,language) => {

    let mod_eng;
    let flag = true;

    if (language != 'English'){
        let options = Object.keys(mods[language]);
        // Get English translation of mod
        for (let option in options) {
            if (mods[language][options[option]].translation == mod) {
                mod_eng = options[option]
                flag = false;
            }
        }
    } else {
        mod_eng = mod;
    }

    let params = mods[language][mod_eng]

    let overrides = Object.keys(params.overrides);

    let all = ['Future','Time','Conflict','Players','Motivation','Location']

    // Reset cards
    for (let ind in all) {
        [1,2,3].forEach(function(i) {
            if ((i) != 3 && all[ind] != 'Time') {
                document.getElementById(all[ind] + (i)).className = ''
            } else{
                document.getElementById(all[ind]).className = ''
            }
        });
    }

    for (let override in overrides){
        document.getElementById(overrides[override]).innerHTML = params.overrides[overrides[override]]
        document.getElementById(overrides[override]).className = 'lock'
    }
}

async function reset(mod, mods, language){
    if (language == 'Ελληνικά'){
        language = 'Greek'
    }

    resetInterface(mods,language)
    chooseMod(mods, language)
    allQueries(language)
}

function resetInterface(mods,language){

    // Reset Cards and Non-Selector Interface Elements
    let file = 'assets/futures/interface' + language + '.csv'
    let el;
    d3.csv(file).then(function (data) {
        let headers = Object.keys( data[0] ) // then taking the first row object and getting an array of the keys
        for (const header in headers) {
            document.getElementById(headers[header]+0).innerHTML = data[0][headers[header]];
            if ((headers[header] != "Name" && headers[header] != "Description" && headers[header] != "Generate" && headers[header] != "Creators" && headers[header] != "Attribution")){
                for (let row=0; row < data.length; row++) {
                    el = document.getElementById(headers[header] + (row))
                    if (el.className != 'lock') {
                        el.innerHTML = data[row][headers[header]];
                    }
                }
            }
        }})

    populateExamples(language)

    // Reset Language Selector
    let selector = document.getElementById("language-selection")
    if (selector.className != 'remove') {
        if (language == 'Greek') {
            document.getElementById('language').innerHTML = 'Επιλέξτε τη γλώσσα σας'
        } else {
            document.getElementById('language').innerHTML = 'Choose your Language'
        }
    }

    // Reset Mod Selector
    $("#mods").empty()
    if ($("#mod-selection").className != 'remove') {
        if (language == 'Greek') {
            document.getElementById('mod').innerHTML = 'Επιλογή έκδοσης'
        } else {
            document.getElementById('mod').innerHTML = 'Choose a Mod'
        }
    }

    let options = Object.keys(mods[language]);
    let blank;
    let comparison

    // Dynamically generate a new mod selector
    for (let option in options) {

        // Get English translation of selected element
        if (language != 'English'){
            blank = mods[language][options[option]].translation
            if (mods[language][options[option]].translation  == mod){
                comparison = mods[language][options[option]].translation
            } else{
                comparison = options[option]
            }
        } else {
            blank = options[option]
            comparison = options[option]
        }

        if (comparison == mod) {
            $('#mods').append(`<option selected>` + blank + `</option>`)
        } else{
            $('#mods').append(`<option>` + blank + `</option>`)
        }
    }
    mod = $('#mods').val()
}

function populateExamples(language) {
    if (language == 'Ελληνικά') {
        language = 'Greek'
    }

    let file = 'assets/futures/examples' + language + '.csv'
    d3.csv(file).then(function (data) {
        let headers = Object.keys(data[0]) // then taking the first row object and getting an array of the keys
        document.getElementById('exampleName').innerHTML = data[0]['Name'];
        document.getElementById('exampleDescription').innerHTML = data[0]['Description'];
        document.getElementById('examples').innerHTML = null;
        for (let game = 0; game < data.length; game++) {
            document.getElementById('examples').innerHTML += "<div class=\"example\">\n" +
                "            <div class=\"example_text\">\n" +
                "                <h2>" + data[game]['Game'] + " </h2>\n" +
                "                <h3>" + data[game]['Creator'] + "</h3>\n" +
                "                <p class=\"prompt\">" + data[game]['Prompt']+ "</p>\n" +
                "                <p>" + data[game]['Details'] + "</p>\n" +
                "            </div>\n" +
                "            <a href=\"./assets/futures/" + data[game]['Game'].replace(/\s/g, '') + ".jpg\" target=\"_blank\">\n" +
                "                <img alt=data[game]['Game'] src=\"./assets/futures/" + data[game]['Game'].replace(/\s/g, '') + ".jpg\">\n" +
                "            </a>\n" +
                "        </div>" +
                "<hr/>"
        }
    })
}

function queryCSV(text_id,option) {
    let file_id = ''
    if (option == 'Ελληνικά'){
        option = 'Greek'
    }

    switch(option) {
        case 'Classic':
            switch(text_id){
                case 'Future-Time':
                    file_id = 'tgftf';
                    break;
                case 'Conflict':
                    file_id = 'tgftf';
                    break;
                case 'Players':
                    file_id = 'tgftf';
                    break;
                case 'Motivation':
                    file_id = 'tgftf';
                    break;
                case 'Location':
                    file_id = 'tgftf';
                    break;
            }
            break;
        default:
            file_id = 'tgftf';
    }
    let file = 'assets/futures/' + file_id + option + '.csv'
    console.log(option)
    d3.csv(file).then(function (data) {
        let flag = true;
        let inner_flag;
        let row;
        let str = text_id.split('-');
        let output;
        let freq;


        if (str.length > 1) {
            for (const col in str) {
                inner_flag = true;
                while (inner_flag) {
                    row = Math.floor(Math.random() * data.length);
                    output = data[row][str[col]];
                    if (output != '') {
                        inner_flag = false;
                        if (str[col] == 'Time' && option == 'English') {
                            output += ' from now'
                        }
                        let el = document.getElementById(str[col])
                        if (el.className != 'lock') {
                            el.innerHTML = output;
                        }
                    }
                }
            }
        } else {

            // Create bag of words (to account for frequency)
            let bag = [];
            let data_;
            let word;
            let components;
            for (const r in data) {
                data_ = data[r][str[0]]
                if (data_ != undefined && data_ != []) {
                    if (data_.split(' (').length == 2) {
                        components = data_.split(' (')
                        word = components[0];
                        freq = components[1].split(')')[0]
                        for (let i = 0; i < freq; i++) {
                            bag.push(word)
                        }
                    } else{
                        bag.push(data_)
                    }
                }
            }

            while (flag) {
                row = Math.floor(Math.random() * bag.length);
                output = bag[row]
                if (output != '') {
                    flag = false;
                    let el = document.getElementById(text_id)
                    if (el.className != 'lock') {
                        el.innerHTML = output;
                        if (text_id == 'Players') {
                            switch (option) {
                                case 'Ελληνικά':
                                    // switch (output) {
                                    //   case 'one': // 'έναν':
                                    //     document.getElementById('Players2').innerHTML = 'παίκτης';
                                    //     break;
                                    //   default:
                                    document.getElementById('Players2').innerHTML = 'παίκτες';
                                    // break;
                                    break
                                case 'English':
                                    // switch (output) {
                                    //   case 'one':
                                    //     document.getElementById('Players2').innerHTML = 'player';
                                    //     break;
                                    //   default:
                                    document.getElementById('Players2').innerHTML = 'players';
                                // break;
                            }
                            break;
                        }
                    }
                }
            }
        }
        updatePrompt();
    })
}

function updatePrompt(){
    let all = ['Future','Conflict','Players','Motivation','Location']
    let text = [];
    for (let ind in all){
        if (ind != undefined){
            if (ind != 4){
                if (ind == 0) {
                    text.push(document.getElementById(all[ind] + 1).innerHTML)
                } else{
                    text.push(document.getElementById(all[ind] + 1).innerHTML.toLowerCase())
                }}
            if (ind != 4) {
                text.push('<strong>' + document.getElementById(all[ind]).innerHTML + '</strong>')
            } else{
                text.push('<strong>' + document.getElementById(all[ind]).innerHTML + '</strong>' + '.')
            }

            if (ind != 3) {
                text.push(document.getElementById(all[ind] + 2).innerHTML)
            }

            if (all[ind] == 'Future'){
                text.push('<strong>' + document.getElementById('Time').innerHTML + '</strong>' + ",")
            }
            let prompt = text.join(' ')
            document.getElementById('Prompt').innerHTML = prompt
        }}}
