const fs = require('fs');

const axios = require('axios');

class Busquedas {
    historial = ['tegucigalpa', 'madrid', 'san Jose'];
    dbPath = './db/database.json';

    constructor() {
        this.leerDB();
    }

    get paramsMapBox() {
        return {
            'limit': '5',
            'language': 'es',
            'access_token': process.env.MAPBOX_KEY,
        }
    }

    get paramsWeeather() {
        return {
            appid: process.env.OPEN_WEATHER,
            units: 'metric',
            lang: 'es'
        }
    }

    get historialCapitalizado() {
        return this.historial.map( h => {
            return h.replace(/^\w/, c => c.toUpperCase());
        })
    }

    async ciudad(lugar = '') {
        try {
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            });

            const resp = await intance.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));
        } catch (error) {
            console.log(error)
            return [];
        }

    }

    async climaLugar(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: { ...this.paramsWeeather, lat, lon }
            });

            const resp = await instance.get();
            const { weather, main } = resp.data;
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp

            }
        } catch (error) {
            console.error(error)
            return {}
        }
    }

    agregarHistorial( lugar = '') {
        if ( this.historial.includes( lugar.toLocaleLowerCase() )) {
            return;
        }

        this.historial.unshift( lugar );
        this.guardarDB();
    }

    guardarDB() {
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerDB() {
        if (!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' })
        const data = JSON.parse(info);

        this.historial = data.historial;
    }

}

module.exports = Busquedas;