// var device = await navigator.bluetooth.requestDevice(
//     {
//         filters:[
//             {services:['OPPO Reno4 5G']}
//         ]
//     }
// ).then(
//     device => service.gatt.connect()
// ).then(
//     service => service.getPrimaryService('OPPO Reno4 5G')
// ).then()
let chosenHeartRateService = null;

navigator.bluetooth.requestDevice({
    filters: [{
        services: ['heart_rate'],
    }]
}).then(device => device.gatt.connect())
    .then(server => server.getPrimaryService('heart_rate'))
    .then(service => {
        chosenHeartRateService = service;
        return Promise.all([
            service.getCharacteristic('body_sensor_location')
                .then(handleBodySensorLocationCharacteristic),
            service.getCharacteristic('heart_rate_measurement')
                .then(handleHeartRateMeasurementCharacteristic),
        ]);
    });