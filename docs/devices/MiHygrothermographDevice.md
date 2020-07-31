# Xiaomi Mi Bluetooth Temperature and Humidity Sensor



Technical details can be found here: [https://github.com/hannseman/homebridge-mi-hygrothermograph#technical-details](https://github.com/hannseman/homebridge-mi-hygrothermograph#technical-details)

## Device Config Entry
```
{
  "type": "MiHygrothermographDevice",
  "friendlyName": "Xiaomi Mi Bluetooth Temperature and Humidity Sensor",
  "mac": "FF:FF:FF:FF:FF:FF"
}
```
## MQTT

#### Autoconfig
The device will attempt to autoconfigure Home Assistant for state information on the following topics:
`homeassistant/sensor/mihygrothermograph_ffffffffffff/ffffffffffff_battery/config`
`homeassistant/sensor/mihygrothermograph_ffffffffffff/ffffffffffff_temperature/config`
`homeassistant/sensor/mihygrothermograph_ffffffffffff/ffffffffffff_humidity/config`
