var idcounter = 2;

// Simuloitu tietokantadata
var sensors = [
    {
        "id":0,
        "name":"temperature",
        "value":0,
        "unit":"celsius"
    },
    {
        "id":1,
        "name":"humidity",
        "value":0,
        "unit":"percentage"
    }
]

var switches = [
    {
        "id":0,
        "name":"lights",
        "value":false
    },
    {
        "id":1,
        "name":"ventilation",
        "value":false
    }
]

module.exports = {
    // haku- ja päitivysoperaatiot sensors-taulukolla simuloidusta tietokannasta
    findSwitches : function(callback) {
        return callback(switches)
    },

    findSwitchById : function ( id, callback ) {
        for ( let i = 0; i < switches.length; i++ ) {
            if ( switches[i].id == id )
                return callback( switches[ i ] )
        }
        return callback( null )
    },

    findSensorById : function ( id, callback ) {
        for ( let i = 0; i < sensors.length; i++ ) {
            if ( sensors[i].id == id )
                return callback( sensors[ i ] )
        }
        return callback( null )
    },

    findSensorByName : function ( name, callback ) {
        for ( let i = 0; i < sensors.length; i++ ) {
            if ( sensors[i].name == name )
                return callback( sensors[ i ] )
        }
        return callback( null )
    },

    findSensors : function(callback) {
        return callback(sensors)
    },

    createSensor : function ( msg, callback ) {
        let id = idcounter++
        sensors[ id ] = msg
        sensors[ id ].id = id
        callback(id)
    },

    modifySensorById : function ( id, updatedata, callback ) {
        module.exports.findSensorById(id, (aSensor) => {
            if (aSensor != null) {
                for ( key in updatedata ) {
                    if ( updatedata.hasOwnProperty( key )) {
                        aSensor[key] = updatedata[key]
                    }
                }
            }
            callback()
        })
    }

}