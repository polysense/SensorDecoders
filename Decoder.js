/**
 * Payload Decoder
 *
 * Copyright 2025 Polysense Tech
 *
 * @product Common
 */
// Chirpstack v4
function decodeUplink(input) {
    var decoded = polysenseDevicedecode(input.bytes);
    return { data: decoded };
}

// Chirpstack v3
function Decode(fPort, bytes) {
    return polysenseDevicedecode(bytes);
}

// The Things Network
function Decoder(bytes, port) {
    return polysenseDevicedecode(bytes);
}


/**
 * decode payload
 * @param bytes
 * @return Decoded object
 */
function polysenseDevicedecode(bytes) {
    var objRet = {};
    var sensorList = {
        "01": {length: 2, isUnsigned: false, factor: 0.1, toFixed: 1, isFloat: false, hasChild: false, key:"tmp", remark:"tmp", unit:"°C"},
        "02": {length: 1, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"ehum", remark:"humidity", unit:"%"},
        "03": {length: 6, isUnsigned: false, factor: 1,   toFixed: 0, isFloat: false, hasChild: true,  key:"3a_acc", remark:"three axes acceleration", unit:"mg", children: [
            {length: 2, key:"accx", remark:"accx"},
            {length: 2, key:"accy", remark:"accy"},
            {length: 2, key:"accz", remark:"accz"},
        ]},
        "04": {length: 6, isUnsigned: false, factor: 0.01, toFixed: 2, isFloat: false, hasChild: true, key:"3a_ang", remark:"three axes angle", unit:"°", children: [
            {length: 2, key:"angx", remark:"angx"},
            {length: 2, key:"angy", remark:"angy"},
            {length: 2, key:"angz", remark:"angz"},
        ]},
        "06": {length: 2, isUnsigned: true,  factor: 1,     toFixed: 0, isFloat: false, hasChild: false, key:"light", remark:"Light", unit:"lux"},
        "07": {length: 2, isUnsigned: true,  factor: 1,     toFixed: 0, isFloat: false, hasChild: false, key:"vbat", remark:"vbat", unit:"mV"},
        "08": {length: 2, isUnsigned: true,  factor: 0.1,   toFixed: 1, isFloat: false, hasChild: false, key:"sound", remark:"Noise", unit:"db"},
        "09": {length: 8, isUnsigned: true,  factor: 0.001, toFixed: 3, isFloat: false, hasChild: true,  key:"gps", remark:"GPS", unit:"second", children: [
            {length: 4, key:"lati", remark:"latitude"},
            {length: 4, key:"long", remark:"longitude"},
        ]},
        "0a": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"co", remark:"CO", unit:"ppb"},
        "0b": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"ext_mv", remark:"Voltage of ADC Sampling", unit:"mv"},
        "0d": {length: 4, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"ap_pa", remark:"atmosphere pressure", unit:"pa"},
        "0e": {length: 2, isUnsigned: false, factor: 0.1, toFixed: 1, isFloat: false, hasChild: false, key:"ext_temp", remark:"ext_temp", unit:"°C"},
        "0f": {length: 2, isUnsigned: true,  factor: 0.01,toFixed: 2, isFloat: false, hasChild: false, key:"displacement", remark:"displacement", unit:"mm"},
        "13": {length: 4, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"duty", remark:"Numeric Value (RFID or other counters)", unit:""},
        "14": {length: 1, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: true,  key:"switch", remark:"switch", unit:"", isBit: true, children: [
            {start: 0, length: 7, key:"switch_count", remark:"switch count"},
            {start: 7, length: 1, key:"switch", remark:"switch"},	
        ]},
        "15": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"nh3", remark:"NH₃", unit:"ppb"},
        "16": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"ash3", remark:"ASH₃", unit:"ppb"},
        "17": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"c6h6", remark:"C6H6", unit:"ppb"},
        "18": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"cl2", remark:"CL₂", unit:"ppb"},
        "19": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"h2", remark:"H₂", unit:"LEL%"},
        "1a": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"h2s", remark:"H₂S", unit:"ppb"},
        "1b": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"hcl", remark:"HCL", unit:"ppm"},
        "1c": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"hcn", remark:"HCN", unit:"ppb"},
        "1d": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"hf", remark:"HF", unit:"ppb"},
        "1e": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"no2", remark:"NO₂", unit:"ug/m³"},
        "1f": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"o3", remark:"O₃", unit:"ug/m³"},
        "20": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"ph3", remark:"PH₃", unit:"ppb"},
        "21": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"so2", remark:"SO₂", unit:"ug/m³"},
        "22": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"ch4", remark:"ch4", unit:"ppb"},
        "23": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"c2h2", remark:"C₂H₂", unit:"ppb"},
        "24": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"gasoline", remark:"Gasoline", unit:"ppm"},
        "25": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"c2h4o3", remark:"C2H4O3", unit:"ppb"},
        "26": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"distance", remark:"distance", unit:"mm"},
        "28": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"co2", remark:"CO₂", unit:"ppm"},
        "29": {length: 2, isUnsigned: true,  factor: 10,  toFixed: 0, isFloat: false, hasChild: false, key:"current", remark:"Current", unit:"mA"},
        "2a": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"psi", remark:"Water pressure", unit:"KPA"},
        "2b": {length: 6, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: true,  key:"pm", remark:"PM2.5/PM10/PM1.0", unit:"ug/m³", children: [
            {length: 2, key:"pm2_5", remark:"pm2.5"},
            {length: 2, key:"pm10", remark:"pm10"},
            {length: 2, key:"pm1_0", remark:"pm1.0"},
        ]},
        "2c": {length: 1, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"pos", remark:"pos", unit:""},
        "2d": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: true,  key:"data_pos", remark:"Data postition", unit:"", children: [
            {length: 1, key:"collect_id", remark:"collect id"},
            {length: 1, key:"packet", remark:"packet", isBit: true, children: [
                {start: 0, length: 4, key:"packet_count", remark:"packet count"}, 
                {start: 4, length: 4, key:"packet_current", remark:"packet current id(starting from 0)"},	
            ]},
        ]},
        "30": {length: 1, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"dir", remark:"Direction", unit:""},
        "31": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"wind", remark:"Wind Speed", unit:"mm/s"},
        "32": {length: 2, isUnsigned: true,  factor: 0.1, toFixed: 1, isFloat: false, hasChild: false, key:"rainfall", remark:"Rainfall", unit:"mm/s"},
        "38": {length: 1, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"state", remark:"IO State", unit:"", isBit: true, children: [
            {start: 0, length: 7, key:"leak_state_count", remark:"leak state counter"},
            {start: 7, length: 1, key:"leak_state", remark:"leak state"},	
        ]},
        "3b": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"voc", remark:"VOC", unit:"ug/m³"},
        "3d": {length: 2, isUnsigned: true,  factor: 0.1, toFixed: 1, isFloat: false, hasChild: false, key:"o2", remark:"O₂", unit:"%"},
        "3f": {length: 4, isUnsigned: false, factor: 1,   toFixed: 3, isFloat: true,  hasChild: false, key:"vac", remark:"Voltage", unit:"V"},
        "40": {length: 4, isUnsigned: false, factor: 1,   toFixed: 3, isFloat: true,  hasChild: false, key:"amp", remark:"Ampire", unit:"A"},
        "41": {length: 4, isUnsigned: false, factor: 1,   toFixed: 3, isFloat: true,  hasChild: false, key:"watt", remark:"Watt", unit:"W"},
        "42": {length: 4, isUnsigned: false, factor: 1,   toFixed: 2, isFloat: true,  hasChild: false, key:"ac_factor", remark:"AC Power Factor", unit:""},
        "43": {length: 4, isUnsigned: false, factor: 1,   toFixed: 0, isFloat: true,  hasChild: false, key:"hz", remark:"HZ", unit:"Hz"},
        "44": {length: 4, isUnsigned: false, factor: 1,   toFixed: 3, isFloat: true,  hasChild: false, key:"kwh", remark:"KWH", unit:"KWH"},
        "4c": {length: 2, isUnsigned: true,  factor: 1,   toFixed: 0, isFloat: false, hasChild: false, key:"co", remark:"CO", unit:"ug/m³"},
        "4d": {length: 4, isUnsigned: false, factor: 1,   toFixed: 0, isFloat: false, hasChild: true,  key:"rf", remark:"RF signal", unit:"%", children: [
            {length: 2, key:"rssi", remark:"RSSI", unit:"dbm"},
            {length: 2, key:"snr", remark:"SNR", unit:"db"},
        ]},
        "4f": {length: 2, isUnsigned: true,  factor: 1,    toFixed: 0, isFloat: false, hasChild: false, key:"uv", remark:"UV power", unit:"uw/cm²"},
        "50": {length: 2, isUnsigned: true,  factor: 0.1,  toFixed: 1, isFloat: false, hasChild: false, key:"h_ehum", remark:"High Resolution Humidy", unit:"%"},
        "51": {length: 2, isUnsigned: true,  factor: 0.01, toFixed: 2, isFloat: false, hasChild: false, key:"dissolved_oxygen", remark:"Dissolved Oxygen", unit:"%VOL"},
        "52": {length: 2, isUnsigned: true,  factor: 0.1,  toFixed: 1, isFloat: false, hasChild: false, key:"ntu", remark:"NTU", unit:"NTU"},
        "53": {length: 4, isUnsigned: false, factor: 1,    toFixed: 2, isFloat: true,  hasChild: false, key:"ec", remark:"EC", unit:"mS/cm"},
        "54": {length: 2, isUnsigned: true,  factor: 1,    toFixed: 0, isFloat: false, hasChild: false, key:"ch2o", remark:"CH₂O", unit:"ppb"},
        "55": {length: 4, isUnsigned: false, factor: 1,    toFixed: 0, isFloat: true,  hasChild: false, key:"dissolved_oxygen", remark:"Dissolved Oxygen", unit:"mg/L"},
        "56": {length: 4, isUnsigned: false, factor: 1,    toFixed: 0, isFloat: true,  hasChild: false, key:"chl", remark:"CHL", unit:"ug/L"},
        "57": {length: 4, isUnsigned: false, factor: 1,    toFixed: 0, isFloat: true,  hasChild: false, key:"bga", remark:"BGA", unit:"ug/L"},
        "58": {length: 4, isUnsigned: false, factor: 1,    toFixed: 0, isFloat: true,  hasChild: false, key:"cod", remark:"COD", unit:""},
        "59": {length: 4, isUnsigned: false, factor: 1,    toFixed: 0, isFloat: true,  hasChild: false, key:"toc", remark:"TOC", unit:""},
        "5a": {length: 4, isUnsigned: false, factor: 1,    toFixed: 0, isFloat: true,  hasChild: false, key:"nh3_n", remark:"NH3_N", unit:"mg/L"},
        "5b": {length: 4, isUnsigned: false, factor: 1,    toFixed: 0, isFloat: true,  hasChild: false, key:"k+", remark:"K+", unit:"mg/L"},
        "5c": {length: 4, isUnsigned: false, factor: 1,    toFixed: 0, isFloat: true,  hasChild: false, key:"nh4", remark:"NH4", unit:"mg/L"},
        "5d": {length: 4, isUnsigned: true,  factor: 1,    toFixed: 0, isFloat: false, hasChild: false, key:"bmp64", remark:"BMP64", unit:""},
        "5e": {length: 2, isUnsigned: true,  factor: 1,    toFixed: 0, isFloat: false, hasChild: false, key:"radiation", remark:"Radiation", unit:"w/m²"},
        "5f": {length: 2, isUnsigned: true,  factor: 1,    toFixed: 0, isFloat: false, hasChild: false, key:"c2h4", remark:"C2H4", unit:"ppb"},
        "62": {length: 4, isUnsigned: false, factor: 1,    toFixed: 0, isFloat: true,  hasChild: false, key:"ntu", remark:"NTU", unit:"NTU"},
        "63": {length: 4, isUnsigned: false, factor: 1,    toFixed: 0, isFloat: true,  hasChild: false, key:"salinity", remark:"Salinity", unit:""},
        "64": {length: 4, isUnsigned: false, factor: 1,    toFixed: 0, isFloat: true,  hasChild: false, key:"ph", remark:"PH", unit:""},
        "65": {length: 2, isUnsigned: true,  factor: 0.01, toFixed: 2, isFloat: false, hasChild: false, key:"ph_index", remark:"PH Index", unit:""},
        "66": {length: 2, isUnsigned: true,  factor: 1,    toFixed: 0, isFloat: false, hasChild: false, key:"salinity", remark:"Salinity", unit:"mg/L"},
        "67": {length: 2, isUnsigned: true,  factor: 1,    toFixed: 0, isFloat: false, hasChild: false, key:"soil_ec", remark:"Soil EC", unit:"uS/cm"},
        "68": {length: 2, isUnsigned: true,  factor: 1,    toFixed: 0, isFloat: false, hasChild: false, key:"n", remark:"N (Nitrogen) Index", unit:""},
        "69": {length: 2, isUnsigned: true,  factor: 1,    toFixed: 0, isFloat: false, hasChild: false, key:"p", remark:"P (Phosphorus) Index", unit:""},
        "6a": {length: 2, isUnsigned: true,  factor: 1,    toFixed: 0, isFloat: false, hasChild: false, key:"k", remark:"K (Potassium) Index", unit:""},
        "6b": {length: 2, isUnsigned: true,  factor: 1,    toFixed: 0, isFloat: false, hasChild: false, key:"voc", remark:"VOC", unit:"ppb"},
        "6c": {length: 1, isUnsigned: true,  factor: 1,    toFixed: 0, isFloat: false, hasChild: false, key:"state", remark:"IO State (Generic)", unit:"", isBit: true, children: [
            {start: 0, length: 7, key:"io_state_count", remark:"IO state counter"},
            {start: 7, length: 1, key:"io_state", remark:"IO state( Rope-pulling switch and PIR)"},	
        ]},
        "6d": {length: 4, isUnsigned: false, factor: 0.001, toFixed: 3, isFloat: false, hasChild: false, key:"ohm", remark:"Ohm", unit:"ohm"},
        "6e": {length: 4, isUnsigned: false, factor: 1, 	toFixed: 3, isFloat: false, hasChild: false, key:"flow_speed", remark:"Flow speed", unit:"m³/h"},
        "6f": {length: 1, isUnsigned: false, factor: 1, 	toFixed: 0, isFloat: false, hasChild: false, key:"per", remark:"Percentage (VBAT or others)", unit:"%"},
        "70": {length: 4, isUnsigned: false, factor: 0.001, toFixed: 3, isFloat: false, hasChild: false, key:"velocity_volume", remark:"Velocity volume", unit:"m³"},
        "71": {length: 4, isUnsigned: false, factor: 0.001, toFixed: 3, isFloat: false, hasChild: false, key:"r_velocity_volume", remark:"Reversed velocity volum", unit:"m³"},
        "72": {length: 4, isUnsigned: false, factor: 1, 	toFixed: 0, isFloat: false, hasChild: false, key:"muil_format", remark:"Multi sub-type format", unit:""},
        "73": {length: 4, isUnsigned: false, factor: 0.001, toFixed: 0, isFloat: false, hasChild: false, key:"flow_speed_per_miniute", remark:"Minute based Flow speed", unit:"L/min"},
        "78": {length: -1, isUnsigned: false, factor: 1, 	toFixed: 0, isFloat: false, hasChild: false, key:"ssid_rssi", remark:"SSID+RSSI（Variable Length Payload format）", unit:"", diyLength: "", diyLengthHex:""},
    }

    //payload: e.g. D77E14FF0A005C
    var payload = Array.prototype.map.call(bytes, function(byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');

    if(payload!=null){
        var tmpdata = payload.toLowerCase().trim();

        var flag = tmpdata.substr(0, 4);
        var tmpdata = tmpdata.substr(4);

        if(flag == "d77e"){
            while(tmpdata.length>0){
                var key = tmpdata.substr(0, 2);
                var obj = sensorList[key.toLowerCase()];
                if(obj == null){
                    break;
                }

                if(key == "78"){
                    var lengthHex = tmpdata.substr(2, 2);
                    var length = hexToInt(true, lengthHex);
                    objRet[obj.key] = polysense_decode_78(tmpdata, length);
                    tmpdata = tmpdata.substr((2 + length) * 2);
                } else {
                    var itemData = tmpdata.substr(2, obj.length * 2);
                    
                    if(obj.isBit == true){ 
                        // Handle Bit
                        var binary = hexToInt(obj.isUnsigned, itemData).toString(2);
                        let binaryArray = binary.split('');
                        binaryArray.reverse();
                        
                        for (var i = 0; i < obj.children.length; i++) {
                            var info = obj.children[i];
                            if(info.start <= binaryArray.length) {
                                var thisDataArr = binaryArray.slice(info.start, info.start + info.length);
                                thisDataArr.reverse();
                                objRet[info.key] = parseInt(thisDataArr.join(''), 2);
                            }else{
                                objRet[info.key] = 0;
                            }
                        }
                    } else if(obj.hasChild){
                        // Handle child elements
                        var arrChild = obj.children;
                        var tempData = itemData;
                        for (var i = 0; i < arrChild.length; i++) {
                            var info = arrChild[i];
                            info.dataHex = tempData.substr(i * info.length * 2, info.length * 2 );
                            var tmpInfoData = hexToInt(obj.isUnsigned, info.dataHex);
                            if(obj.isFloat){
                                tmpInfoData = hexToFloat(info.dataHex);
                            }

                            var currentVal = obj.factor * tmpInfoData;
                            if(obj.toFixed > 0){
                                currentVal = currentVal?.toFixed(obj.toFixed);
                                currentVal = currentVal.indexOf(".")!=-1 ? parseInt(currentVal) :parseFloat(currentVal);
                            }

                            objRet[info.key] = currentVal;
                        }

                    } else {
                        //Handle individual element
                        var currentVal = hexToInt(obj.isUnsigned, itemData);
                        if(obj.isFloat){
                            currentVal = hexToFloat(itemData);
                        }

                        currentVal  = obj.factor * currentVal;
                        if(obj.toFixed > 0){
                            currentVal = currentVal.toFixed(obj.toFixed || 2);
                            currentVal = currentVal.indexOf(".")==-1 ? parseInt(currentVal) :parseFloat(currentVal);
                        }

                        objRet[obj.key] = currentVal;
                    }

                    tmpdata = tmpdata.substr(2 + obj.length * 2);
                }
            }
        }
    }

    return objRet
}



//--------------------------------------------
// Decoding complex sensors
//--------------------------------------------
function polysense_decode_78(tmpdata, length){
    var ssidArr = [];
    var tempStr = tmpdata.substr(4, length * 2 );
    while(tempStr!=null && tempStr.length>0){
        var currSSID = tempStr.substr(0, 14);
        ssidArr.push(currSSID);
        tempStr = tempStr.substr(14);
    }
   
    return ssidArr;
}


//--------------------------------------------
// hex to number
//--------------------------------------------

function hexToInt(isUnsigned, hex){
    if(isUnsigned){
        return parseInt(hex, 16)
    }else{
        if(hex.length % 2 != 0) {
            hex = "0" + hex;
        }
        var num = parseInt(hex, 16);
        var maxVal = Math.pow(2, hex.length / 2 * 8);
        if(num > maxVal / 2 - 1) {
            num = num - maxVal
        }
        return num;
    }
}

function hexToFloat(hex) {
    var buffer = new ArrayBuffer(4);
    var dataView = new DataView(buffer);
    // Set the buffer to the specified hexadecimal number
    dataView.setUint32(0, parseInt(hex, 16), false);
    // Read float32
    return dataView.getFloat32(0, false);
}