# Xiaomi Mi Bluetooth Temperature and Humidity Sensor

![hygrothermograph](https://user-images.githubusercontent.com/5991122/89080862-54cead80-d38a-11ea-8c26-b21e27835be4.png)

Technical details can be found here: [https://github.com/hannseman/homebridge-mi-hygrothermograph#technical-details](https://github.com/hannseman/homebridge-mi-hygrothermograph#technical-details)

## Device Config Entry
```
{
  "type": "MiHygrothermographDevice",
  "friendlyName": "Xiaomi Mi Bluetooth Temperature and Humidity Sensor",
  "mac": "FF:FF:FF:FF:FF:FF"
  "publishInterval": 60000
}
```

`publishInterval`  in milliseconds


## MQTT

#### Autoconfig
The device will attempt to autoconfigure Home Assistant for state information on the following topics:
`homeassistant/sensor/mihygrothermograph_ffffffffffff/ffffffffffff_temperature/config`
`homeassistant/sensor/mihygrothermograph_ffffffffffff/ffffffffffff_humidity/config`
`homeassistant/sensor/mihygrothermograph_ffffffffffff/ffffffffffff_battery/config`
