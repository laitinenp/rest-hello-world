# Tietokanta-API, jossa tässä tapauksessa simuloidaan tietokantaa ja sen sensorit-taulua
# yksinkertaisella kokoelma-tietorakenteella. Tosielämässä tähän moduuliin koodataan tietokantaan
# liittyvät perusoperaatiot

# Simuloidaan tietokantaa sensors-kokoelmalla.

index = 0
sensors = []

def connect():
    global index, sensors
    index = 0
    sensors = []
    return

def findAll():
    global sensors
    return sensors

# Tässä esimerkissä haetaan sensor-taulusta yksittäisen sensorin tietue nimen perusteella
def findByName(name):
    global sensors
    for s in sensors:
        if s['name'] == name:
            return s
    return None

def findById(id):
    global sensors
    for s in sensors:
        if s['id'] == id:
            return s
    return None

# Lisätään taulukkoon uusi sensori
def create(object):
    global sensors, index
    object['id'] = index
    sensors.append( object )
    index = index + 1
    return object

# Poistetaan taulukosta yksi sensori tunnuksen (id) perusteella
def deleteById(id):
    global sensors
    for s in sensors:
        if s['id'] == id:
            sensors.remove(s)
    return

# Muokataan yksittäistä sensoritietoa
def modifyById(id, updates):
    global sensors
    s = findById(id)
    if s != null:
        s.update( updates )
    return sen
