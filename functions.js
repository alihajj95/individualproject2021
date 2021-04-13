function loadQuotes(){
    console.log("Loading...");
    const container = document.getElementById('quoteSource1');
    container.innerHTML = '';

    makeRequest('GET', 'home', (quotes) => {

        quotes.forEach((quote) =>
        {
            const wrapper = document.createElement("div");
            wrapper.className = 'card-body';

            let title = document.createElement("h5");
            title.className = 'card-title';

            let quoteSource = document.createTextNode('Quote By: ' + quote.quoteSource);
            title.appendChild(quoteSource);
            wrapper.appendChild(title);

            let quoteBody = document.createTextNode('Quote: ' + quote.quoteBody);
            console.log(quote.ID);

            let message = document.createElement("P");
            message.appendChild(quoteBody);
            
            wrapper.appendChild(message);

            let deleteButton = document.createElement('button');
            deleteButton.classList.add('btn');
            deleteButton.classList.add('btn-danger');
            deleteButton.type = 'button';
            deleteButton.innerHTML = 'Delete';

            // add an event handle to handle the click event
            deleteButton.addEventListener('click', (e) => {
                // fetch delete request
                makeRequest('DELETE', 'quote/' + quote.ID, (data) => {

                    if(data.worked) {
                        // delete the closes wrapper
                        //container.removeChild(wrapper);
                        //console.log('Bingo!!!!');
                        window.location.reload();
                    }

                });
            });

            wrapper.appendChild(deleteButton);


            let linkToEdit = document.createElement('a');
            linkToEdit.classList.add('btn');
            linkToEdit.classList.add('btn-primary');
            linkToEdit.href = 'edit/' + quote.ID
            linkToEdit.innerHTML = 'Edit';
            wrapper.appendChild(linkToEdit);

            // add the edit button
            container.appendChild(wrapper);
        });

    });
}


function populateQuote() {

    // somehow read the reader from quote_info
    // poulate the fields inside the form

    
    var req = new XMLHttpRequest();
    req.open('GET', document.location, false);
    req.send(null);
    var headers = req.getAllResponseHeaders().toLowerCase();

    console.log(headers);
    

    
}

function makeRequest(method, endpoint, onSuccess, data)
{
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200)
        {
            onSuccess(JSON.parse(this.responseText));
        }
    }

    xhttp.open(method, endpoint, true);
    xhttp.send(data || null);
}

function insertQuote()
{
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            let result = JSON.parse(this.responseText);
            console.log(result);

            if(result.worked){
                loadQuotes();
            } else {
                alert('Something went south!');
            }
        }
    }
    let quoteSource = document.getElementById('quoteSource').value;
    let quoteBody = document.getElementById('quoteBody').value;

    xhttp.open("POST", "insert", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send('{"quoteSource":"'+quoteSource+'", "quoteBody":"'+quoteBody+'"}');
}
