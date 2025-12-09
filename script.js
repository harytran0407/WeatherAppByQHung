const container = document.querySelector('.container');
const searchBtn = document.querySelector('.search-box button');
const inputCity = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const image = document.querySelector('.weather-box img');
const temperature = document.querySelector('.weather-box .temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('.weather-details .humidity span');
const wind = document.querySelector('.weather-details .wind span');

searchBtn.addEventListener('click', () => {
    const city = inputCity.value.trim();
    if (city === '') return;

    // Bạn có thể thay key này bằng key của mình
    const APIKey = '6ac666dcf39a1437f1d8465f6c151278';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or server error');
            }
            return response.json();
        })
        .then(json => {
            // Ẩn lỗi nếu trước đó hiển thị
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            // Reset ảnh trước khi gán mới
            image.src = '';

            // Xử lý các kiểu thời tiết phổ biến hơn
            const weatherMap = {
                Clear: 'images/clear.png',
                Clouds: 'images/cloud.png',
                Rain: 'images/rain.png',
                Drizzle: 'images/rain.png',
                Thunderstorm: 'images/rain.png',
                Snow: 'images/snow.png',
                Mist: 'images/mist.png',
                Smoke: 'images/mist.png',
                Haze: 'images/mist.png',
                Dust: 'images/mist.png',
                Fog: 'images/mist.png',
                Sand: 'images/mist.png',
                Ash: 'images/mist.png',
                Squall: 'images/mist.png',
                Tornado: 'images/mist.png'
            };

            const weatherType = json.weather[0].main;
            image.src = weatherMap[weatherType] || 'images/cloud.png'; // fallback

            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${Math.round(json.wind.speed * 3.6)} km/h`;

            // Hiển thị lại thông tin thời tiết
            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'flex';

            // Reset animation (xóa trước khi thêm để tránh duplicate)
            weatherBox.classList.remove('fadeIn');
            weatherDetails.classList.remove('fadeIn');
            void weatherBox.offsetWidth; // trigger reflow
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');

            container.style.height = '590px';
        })
        .catch(err => {
            // Khi thành phố không tồn tại hoặc lỗi mạng
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
        });
});
inputCity.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});