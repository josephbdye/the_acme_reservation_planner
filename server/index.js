const db = require('./db');
const client = db.client;
const createTables = db.createTables;
const createCustomer = db.createCustomer;
const createRestaurant = db.createRestaurant;
const fetchCustomers = db.fetchCustomers;
const fetchRestaurants = db.fetchRestaurants;
const createReservation = db.createReservation;
const fetchReservations = db.fetchReservations;
const destroyReservation = db.destroyReservation;

const init = async()=> {
    console.log('connecting to database');
    await client.connect();
    console.log('connected to database');
    await createTables();
    console.log('tables created');
    const [joe, sara, tom, applebees, chilis, outback, olivegarden] = await Promise.all([
        createCustomer({ name: 'joe'}),
        createCustomer({ name: 'sara'}),
        createCustomer({ name: 'tom'}),
        createRestaurant({ name: 'applebees'}),
        createRestaurant({ name: 'chilis'}),
        createRestaurant({ name: 'outback'}),
        createRestaurant({ name: 'olivegarden'}),
    ]);
    console.log(await fetchCustomers());
    console.log(await fetchRestaurants());
    const reservation = await createReservation({
        date: '04/17/2024',
        restaurant_id: applebees.id,
        customer_id: sara.id
    });
    console.log(await(fetchReservations(sara.id)));
    await destroyReservation(reservation);
    console.log(await(fetchReservations(sara.id)));
};

init();