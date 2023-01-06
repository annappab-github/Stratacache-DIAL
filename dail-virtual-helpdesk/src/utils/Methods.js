import json from '@/local-data/data.json';
import Constants from './Constants';

const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
export default {
    padLeadingZeros(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    },
    time24hourformat(d) {
        var day = days[d.getDay()]
        var hr = d.getHours()
        var min = d.getMinutes()
        if (min < 10) {
            min = '0' + min
        }
        var ampm = 'AM'
        if (hr >= 12) {
            ampm = (hr != 24 ? 'PM' : 'AM')
                // hr = (hr == 12 ? hr : hr - 12)
        }
        hr = (hr < 10 ? '0' + hr : hr)
        return {
            time: `${hr}:${min}`,
            ampm: ampm,
            day: day
        }

    },
    time12hourformat(d) {
        var day = days[d.getDay()]
        var hr = d.getHours()
        var min = d.getMinutes()
        if (min < 10) {
            min = '0' + min
        }
        var ampm = 'AM'
        if (hr >= 12) {
            ampm = (hr != 24 ? 'PM' : 'AM')
            hr = (hr == 12 ? hr : hr - 12)
        }
        hr = (hr < 10 ? '0' + hr : hr)
        return {
            time: `${hr}:${min}`,
            ampm: ampm,
            day: day
        }

    },
    flightStatus(status) {
        let statusData = Constants.statusData
        let res = status.toUpperCase()
        for (const iterator of statusData) {
            if (iterator.status.toUpperCase() == status.toUpperCase()) {
                res = iterator.value
                break;
            }
        }
        return res;
    },
    getAminitiesData(catId, id) {
        let aminityArr = []
        let park = json.park[0].zone
        for (let i = 0; i < park[id].building[0].floor.length; i++) {
            let hotspotlist = park[id].building[0].floor[i].hotspotlist
            for (let k = 0; k < hotspotlist.length; k++) {
                if (catId == hotspotlist[k].categoryid) {
                    aminityArr.push(hotspotlist[k])
                }
            }
        }
        // console.log('aminity data', aminityArr)
        return aminityArr
    },
    searchableList(zoneName) {
        let datalist = []
        let floorData;
        if (zoneName == "DOMESTIC DEPARTURE") {
            floorData = getAllFloorData(json)
        } else if (zoneName == "INTERNATIONAL DEPARTURE") {
            floorData = getInternationalFloorData(json)
        }
        if (Constants.kioskid == 115) {
            for (let i = 0; i < floorData.length; i++) {
                for (let j = 0; j < floorData[i].hotspotlist.length; j++) {
                    if ((floorData[i].hotspotlist[j].categoryid == 110 || floorData[i].hotspotlist[j].categoryid == 120 || floorData[i].hotspotlist[j].categoryid == 122) && (!(floorData[i].hotspotlist[j].path.length < 2 && floorData[i].hotspotlist[j].transithotspot == 'no'))) {
                        datalist.push({ searchparam: floorData[i].hotspotlist[j].hotspotname, hotspotid: floorData[i].hotspotlist[j].hotspotid, hotspotname: floorData[i].hotspotlist[j].hotspotname, svggroupid: floorData[i].hotspotlist[j].svggroupid, hotspotdisplayname: floorData[i].hotspotlist[j].hotspotdisplayname, icon: floorData[i].hotspotlist[j].hotspoticon, description: floorData[i].hotspotlist[j].hotspotdescription, path: floorData[i].hotspotlist[j].path, hotspotxpos: floorData[i].hotspotlist[j].hotspotxpos, hotspotypos: floorData[i].hotspotlist[j].hotspotypos, catId: floorData[i].hotspotlist[j].categoryid })
                    }
                }
            }
            // console.log('datalist', datalist);
        } else {
            if (zoneName == "DOMESTIC DEPARTURE") {
                for (let i = 0; i < floorData.length; i++) {
                    for (let j = 0; j < floorData[i].hotspotlist.length; j++) {
                        if (floorData[i].hotspotlist[j].categoryid == 110 || floorData[i].hotspotlist[j].categoryid == 120 || floorData[i].hotspotlist[j].categoryid == 122) {
                            datalist.push({ searchparam: floorData[i].hotspotlist[j].hotspotname, hotspotid: floorData[i].hotspotlist[j].hotspotid, hotspotname: floorData[i].hotspotlist[j].hotspotname, svggroupid: floorData[i].hotspotlist[j].svggroupid, hotspotdisplayname: floorData[i].hotspotlist[j].hotspotdisplayname, icon: floorData[i].hotspotlist[j].hotspoticon, description: floorData[i].hotspotlist[j].hotspotdescription, path: floorData[i].hotspotlist[j].path, hotspotxpos: floorData[i].hotspotlist[j].hotspotxpos, hotspotypos: floorData[i].hotspotlist[j].hotspotypos, catId: floorData[i].hotspotlist[j].categoryid })
                        }
                    }
                }
            } else if (zoneName == "INTERNATIONAL DEPARTURE") {
                for (let i in floorData) {
                    for (let j = 0; j < floorData[i].hotspotlist.length; j++) {
                        if (floorData[i].hotspotlist[j].categoryid == 110 || floorData[i].hotspotlist[j].categoryid == 120 || floorData[i].hotspotlist[j].categoryid == 122) {
                            datalist.push({ searchparam: floorData[i].hotspotlist[j].hotspotname, hotspotid: floorData[i].hotspotlist[j].hotspotid, hotspotname: floorData[i].hotspotlist[j].hotspotname, svggroupid: floorData[i].hotspotlist[j].svggroupid, hotspotdisplayname: floorData[i].hotspotlist[j].hotspotdisplayname, icon: floorData[i].hotspotlist[j].hotspoticon, description: floorData[i].hotspotlist[j].hotspotdescription, path: floorData[i].hotspotlist[j].path, hotspotxpos: floorData[i].hotspotlist[j].hotspotxpos, hotspotypos: floorData[i].hotspotlist[j].hotspotypos, catId: floorData[i].hotspotlist[j].categoryid })
                        }
                    }
                }
            } else if (Constants.kioskid == 990) {
                for (let i = 0; i < floorData.length; i++) {
                    for (let j = 0; j < floorData[i].hotspotlist.length; j++) {
                        if ((floorData[i].hotspotlist[j].categoryid == 110 || floorData[i].hotspotlist[j].categoryid == 120) && (!(floorData[i].hotspotlist[j].path.length < 2 && floorData[i].hotspotlist[j].transithotspot == 'na'))) {
                            datalist.push({ searchparam: floorData[i].hotspotlist[j].hotspotname, hotspotid: floorData[i].hotspotlist[j].hotspotid, hotspotname: floorData[i].hotspotlist[j].hotspotname, svggroupid: floorData[i].hotspotlist[j].svggroupid, hotspotdisplayname: floorData[i].hotspotlist[j].hotspotdisplayname, icon: floorData[i].hotspotlist[j].hotspoticon, description: floorData[i].hotspotlist[j].hotspotdescription, path: floorData[i].hotspotlist[j].path, hotspotxpos: floorData[i].hotspotlist[j].hotspotxpos, hotspotypos: floorData[i].hotspotlist[j].hotspotypos, catId: floorData[i].hotspotlist[j].categoryid })
                        }
                    }
                }
                // console.log('datalist', datalist);
            }
        }
        // console.log('datalist', datalist);
        return datalist
    },

    getAllFloorData(floorJson) {
        return getAllFloorData(floorJson)
    },

    getFloorData(floorNo) {
        let items = json.park[0].zone[0].building[0].floor
        let floorData = []
        for (let i in items) {
            if (floorNo == items[i].floornumber) {
                floorData.push(items[i]);
                break;
            }
        }
        return floorData;
    },

    getKioskFloorNo() {
        let kioskId = Constants.kioskid
        let floorNo = ''
        var zones = json.park[0].zone
        var checkflag = false
        for (let k in zones) {
            let floors = zones[k].building[0].floor
            for (let i = 0; i < floors.length; i++) {
                for (let j = 0; j < floors[i].kiosklist.length; j++) {
                    if (floors[i].kiosklist[j].kioskid == kioskId) {
                        floorNo = (floors[i].floornumber)
                        checkflag = true
                        break;
                    }
                }
                if (checkflag) break;
            }
            if (checkflag) break;
        }
        return floorNo
    },

    getKioskPossision(zoneName) {
        var floors = []
        if (zoneName == 'INTERNATIONAL DEPARTURE') {
            floors = json.park[0].zone[1].building[0].floor
        } else {
            let items = json.park[0].zone[0].building[0].floor
            for (let i in items) {
                floors.push(items[i]);
            }
        }
        let kioskId = Constants.kioskid
        let kioskData = []
            // var floors = getAllFloorData(json)
        var checkflag = false
        for (let i = 0; i < floors.length; i++) {
            for (let j = 0; j < floors[i].kiosklist.length; j++) {
                if (floors[i].kiosklist[j].kioskid == kioskId) {
                    kioskData = floors[i].kiosklist[j]
                    checkflag = true
                    break;
                }
            }
            if (checkflag) break;
        }
        return kioskData
    },

    getHotspotFloorNo(hotspotId) {
        let floorNo = ''
        var zones = json.park[0].zone
        var checkflag = false
        for (let k in zones) {
            let floors = zones[k].building[0].floor
            for (let i = 0; i < floors.length; i++) {
                for (let j = 0; j < floors[i].hotspotlist.length; j++) {
                    if (floors[i].hotspotlist[j].hotspotid == hotspotId) {
                        floorNo = (floors[i].floornumber)
                        checkflag = true
                        break;
                    }
                }
                if (checkflag) break;
            }
            if (checkflag) break;
        }
        return floorNo
    },

    getTransitPathPoints(kioskFloorNo, HotspotFloorNo, hotspotId, departureType) {
        let kioskId = Constants.kioskid

        let floorData = []
        if (departureType == "DOMESTIC DEPARTURE") {
            let items = json.park[0].zone[0].building[0].floor
            for (let i in items) {
                floorData.push(items[i]);
            }
        } else {
            let items = json.park[0].zone[1].building[0].floor
            for (let i in items) {
                floorData.push(items[i]);
            }
        }

        let map1Data = floorData.filter((element, index) => {
            return (element.floornumber == (kioskFloorNo))
        })
        let map2Data = floorData.filter((element, index) => {
            return (element.floornumber == (HotspotFloorNo))
        })

        let map2path = []
        for (let i = 0; i < map2Data[0].hotspotlist.length; i++) {
            if (map2Data[0].hotspotlist[i].hotspotid == hotspotId) {
                map2path = map2Data[0].hotspotlist[i]
                break;
            }
        }
        let map2pathPoints = {}
        let transitmode = []
        for (let i = 0; i < map2path.path.length; i++) {
            for (let j = 0; j < map2Data[0].hotspotlist.length; j++) {
                if (map2path.path[i].kioskid == map2Data[0].hotspotlist[j].hotspotid && map2Data[0].hotspotlist[j].transithotspot == 'yes') {
                    map2pathPoints = {
                        "mapname": map2Data[0].mapname,
                        "transitmode": map2Data[0].hotspotlist[j].transitmode,
                        "hotspotxpos": map2path.hotspotxpos,
                        "hotspotypos": map2path.hotspotypos,
                        "hotspoticon": map2path.hotspoticon,
                        "hotspotdescription": map2path.hotspotdescription,
                        "hotspotid": map2path.hotspotid,
                        "hotspotdisplayname": map2path.hotspotdisplayname,
                        "hotspotname": map2path.hotspotname,
                        "path": map2path.path[i]
                    }
                    transitmode.push(map2Data[0].hotspotlist[j].transitmode)
                }
            }
        }

        let map1pathPoints = {};
        let breakloop = false
        for (let i = 0; i < transitmode.length; i++) {
            for (let j = 0; j < map1Data[0].hotspotlist.length; j++) {
                for (let k = 0; k < map1Data[0].hotspotlist[j].path.length; k++) {
                    if (transitmode[i] == map1Data[0].hotspotlist[j].transitmode && kioskId == map1Data[0].hotspotlist[j].path[k].kioskid) {
                        map1pathPoints = {
                            "mapname": map1Data[0].mapname,
                            "transitmode": map1Data[0].hotspotlist[j].transitmode,
                            "hotspotxpos": map1Data[0].hotspotlist[j].hotspotxpos,
                            "hotspotypos": map1Data[0].hotspotlist[j].hotspotypos,
                            "hotspoticon": map1Data[0].hotspotlist[j].hotspoticon,
                            "hotspotdescription": map1Data[0].hotspotlist[j].hotspotdescription,
                            "hotspotid": map1Data[0].hotspotlist[j].hotspotid,
                            "hotspotdisplayname": map1Data[0].hotspotlist[j].hotspotdisplayname,
                            "hotspotname": map1Data[0].hotspotlist[j].hotspotname,
                            "path": map1Data[0].hotspotlist[j].path[k]
                        }
                        breakloop = true
                        break;
                    }
                }
                if (breakloop) break;
            }
            if (breakloop) break;
        }

        return {
            map1points: map1pathPoints,
            map2points: map2pathPoints
        }
    }

}



function getAllFloorData(floorJson) {

    let items = floorJson.park[0].zone[0].building[0].floor
    let floorData = []
    for (let i in items) {
        floorData.push(items[i]);
    }

    return floorData;


}

function getInternationalFloorData(floorJson) {

    let items = floorJson.park[0].zone[1].building[0].floor
    let floorData = []
    for (let i in items) {
        floorData.push(items[i]);
    }

    return floorData;


}