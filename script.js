window.addEventListener('load', () => {
    let long;
    let lat;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            //changing the text of pre loader
            const getText = document.querySelector('.pre-loader h2');
            getText.textContent = "Plase Wait . . . ";

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/e5b673d8ea5c9299a7b48201a93e2f38/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    // removing the loading page after fetching the data
                    const loader = document.querySelector('.pre-loader');
                    loader.className += ' hidden';

                    const { temperature, summary, icon } = data.currently;

                    //calling the set icons function
                    setIcons(icon, document.querySelector('.icon'));

                    //set dom from the API
                    tempInCelsius = (temperature - 32) * (5 / 9);
                    temperatureDegree.textContent = Math.floor(tempInCelsius) + '° C';
                    temperatureDescription.textContent = summary;

                    // change degee to celcious on click
                    temperatureDegree.addEventListener('click', () => {
                        if (temperatureDegree.textContent.includes('C')) {
                            temperatureDegree.textContent = Math.floor(temperature) + '° F';
                        }
                        else {
                            temperatureDegree.textContent = Math.floor(tempInCelsius) + '° C';
                        }
                    })
                });
        });
    }
    //set icons
    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: 'white' });
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});

