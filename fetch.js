fetch(`${process.env.AUTH_URL}api/class/1dfz`, {
    method: 'GET',
    headers: {
        'API': APIKEY,
        'Content-Type': 'application/json'
    }
})
    .then((response) => {
        // Convert received data to JSON
        return response.json();
    })
    .then((data) => {
        // Log the data if the request is successful
        console.log(data);
    })
    .catch((err) => {
        // If there's a problem, handle it...
        if (err) {
            console.error('connection closed due to errors', err);
            process.exit(1);
        }
    });
