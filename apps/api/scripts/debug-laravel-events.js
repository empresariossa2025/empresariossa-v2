const mysql = require('mysql2/promise');

async function debugLaravelEvents() {
  const connection = await mysql.createConnection({
    host: '195.35.43.10',
    port: 3306,
    user: 'root',
    password: 'Ibdm3p1dqdp0d1s1701@',
    database: 'empresariossa_api'
  });

  try {
    const [laravelEvents] = await connection.execute(`
      SELECT id, name, date, time_i, time_f, local, description, units_id
      FROM events 
      WHERE is_active = 1 
      LIMIT 1
    `);

    console.log('Raw Laravel event data:');
    console.log(JSON.stringify(laravelEvents[0], null, 2));
    
    const event = laravelEvents[0];
    console.log('\nField types:');
    console.log('date:', typeof event.date, event.date);
    console.log('time_i:', typeof event.time_i, event.time_i);
    console.log('time_f:', typeof event.time_f, event.time_f);
    
    console.log('\nDate construction test:');
    const testDate = `${event.date}T${event.time_i}`;
    console.log('Combined string:', testDate);
    console.log('Date object:', new Date(testDate));

  } catch (error) {
    console.error('Debug failed:', error);
  } finally {
    await connection.end();
  }
}

debugLaravelEvents();
