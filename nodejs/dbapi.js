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


module.exports = {

    // haku- ja päitivysoperaatiot sensors-taulukolla simuloidusta tietokannasta

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
        let obj = findSensorById(id)
        if (obj != null) {
            for ( key in updatedata ) {
                if ( updatedata.hasOwnProperty( key ))
                    obj[key] = updatedata[key]
            }
        }
        callback()
    }

}