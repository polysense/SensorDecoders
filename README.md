# Codecs

Sample Functions for Polysense IoT Device Encoders and ecoders

Decoder.js is a universal decoding tool that includes all sensors supported by polysense.

You can refer to the sensorList variable under the polyssenseDevicedecode function

If you have any questions, please browse https://www.polysense.net



# Example

Our supports custom combinations, and you can choose any sensor you want to buid a product. Perhaps you would choose from the following options


* Perhaps you choose temperature, humidity and CO2 sensors.
* Perhaps you choose a temperature, humidity, and noise sensor.
* Perhaps you choose PM2.5, CO sensor.


## Temperature + Humidity + CO2

You will receive the following payload. D77E is the header of the data packet.

Please refer to [Payload Definition](#list) for the units of each sensor
```json
D77E 010132 0253 070E63 2800ff
```
```json
{
    "tmp": 30.6,
    "ehum": 83,
    "vbat": 3683,
    "co2": 754
}
```

## Temperature + Humidity + noise
```json
D77E 010132 0253 070E63 080051
```
```json
{
    "tmp": 30.6,
    "ehum": 83,
    "vbat": 3683,
    "sound": 59.3
}
```

## PM2.5 + CO
```json
D77E 070E63 0A000C 2B001C001F0015
```
```json
{
    "vbat": 3683,
    "co": 12,
    "pm2_5": 28,
    "pm10": 31,
    "pm1_0": 21
}
```

# Payload Definition
## list
|        CHANNEL       | TYPE | LENGTH<br/>(Bytes) | UNIT |DESCRIPTION                                    |
| :------------------: | :--: | :----:| :----:     | ---------------------------------------------- |
|         tmp          | 0x01 | 2 |         °C | | 
|         ehum         | 0x02 | 1 |          % | | 
|        3a_acc        | 0x03 | 6 |         mg | | 
|        3a_ang        | 0x04 | 6 |          ° | | 
|        light         | 0x06 | 2 |        lux | | 
|         vbat         | 0x07 | 2 |         mV | | 
|        sound         | 0x08 | 2 |         db | | 
|         gps          | 0x09 | 8 |     second | | 
|          co          | 0x0a | 2 |        ppb | | 
|        ext_mv        | 0x0b | 2 |         mv | | 
|        ap_pa         | 0x0d | 4 |         pa | | 
|       ext_temp       | 0x0e | 2 |         °C | | 
|         duty         | 0x13 | 4 |            | | 
|        switch        | 0x14 | 1 |            | | 
|         nh3          | 0x15 | 2 |        ppb | | 
|         ash3         | 0x16 | 2 |        ppb | | 
|         c6h6         | 0x17 | 2 |        ppb | | 
|         cl2          | 0x18 | 2 |        ppb | | 
|         h2           | 0x19 | 2 |        LEL% | | 
|         h2s          | 0x1a | 2 |        ppb | | 
|         no2          | 0x1e | 2 |      ug/m³ | | 
|          o3          | 0x1f | 2 |      ug/m³ | | 
|         so2          | 0x21 | 2 |      ug/m³ | | 
|         ch4          | 0x22 | 2 |        ppb | | 
|         c2h2         | 0x23 | 2 |        ppb | | 
|         gasoline     | 0x24 | 2 |        ppm | | 
|         c2h4o3       | 0x25 | 2 |        ppb | | 
|       distance       | 0x26 | 2 |         mm | | 
|         co2          | 0x28 | 2 |        ppm | | 
|       current        | 0x29 | 2 |         mA | | 
|         psi          | 0x2a | 2 |        KPA | | 
|          pm          | 0x2b | 6 |      ug/m³ | | 
|         pos          | 0x2c | 1 |            | | 
|       data_pos       | 0x2d | 2 |            | | 
|         dir          | 0x30 | 1 |            | | 
|         wind         | 0x31 | 2 |       mm/s | | 
|        state         | 0x38 | 1 |            | | 
|         voc          | 0x3b | 2 |      ug/m³ | | 
|          o2          | 0x3d | 2 |          % | | 
|         vac          | 0x3f | 4 |          V | | 
|         amp          | 0x40 | 4 |          A | | 
|         watt         | 0x41 | 4 |          W | | 
|      ac_factor       | 0x42 | 4 |            | | 
|          hz          | 0x43 | 4 |         Hz | | 
|         kwh          | 0x44 | 4 |        KWH | | 
|          co          | 0x4c | 2 |      ug/m³ | | 
|          rf          | 0x4d | 4 |          % | | 
|          uv          | 0x4f | 2 |     uw/cm² | | 
|        h_ehum        | 0x50 | 2 |          % | | 
|   dissolved_oxygen   | 0x51 | 2 |       %VOL | | 
|         ntu          | 0x52 | 2 |        NTU | | 
|          ec          | 0x53 | 4 |      mS/cm | | 
|         ch2o         | 0x54 | 2 |        ppb | | 
|   dissolved_oxygen   | 0x55 | 4 |       mg/L | | 
|         chl          | 0x56 | 4 |       ug/L | | 
|         bga          | 0x57 | 4 |       ug/L | | 
|         cod          | 0x58 | 4 |            | | 
|         toc          | 0x59 | 4 |            | | 
|        nh3_n         | 0x5a | 4 |       mg/L | | 
|          k+          | 0x5b | 4 |       mg/L | | 
|         nh4          | 0x5c | 4 |       mg/L | | 
|        bmp64         | 0x5d | 4 |            | | 
|      radiation       | 0x5e | 2 |       w/m² | | 
|         c2h4         | 0x5f | 2 |        ppb | | 
|         ntu          | 0x62 | 4 |        NTU | | 
|       salinity       | 0x63 | 4 |            | | 
|          ph          | 0x64 | 4 |            | | 
|       ph_index       | 0x65 | 2 |            | | 
|       salinity       | 0x66 | 2 |       mg/L | | 
|       soil_ec        | 0x67 | 2 |      uS/cm | | 
|          n           | 0x68 | 2 |            | | 
|          p           | 0x69 | 2 |            | | 
|          k           | 0x6a | 2 |            | | 
|         voc          | 0x6b | 2 |        ppb | | 
|        state         | 0x6c | 1 |            | | 
|         ohm          | 0x6d | 4 |        Ohm | | 
|      flow_speed      | 0x6e | 4 |       m³/h | | 
|         per          | 0x6f | 1 |          % | | 
|   velocity_volume    | 0x70 | 4 |         m³ | | 
|  r_velocity_volume   | 0x71 | 4 |         m³ | | 
|     muil_format      | 0x72 | 4 |            | | 
|     muil_format      | 0x73 | 4 |      L/min | | 
|      ssid_rssi       | 0x78 |   |            | customized sensors| 