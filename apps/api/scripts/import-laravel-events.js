const { PrismaClient } = require('@prisma/client');
const mysql = require('mysql2/promise');

const prisma = new PrismaClient();

async function importLaravelEvents() {
  const connection = await mysql.createConnection({
    host: '195.35.43.10',
    port: 3306,
    user: 'root',
    password: 'Ibdm3p1dqdp0d1s1701@',
    database: 'empresariossa_api'
  });

  try {
    console.log('Importing Laravel Events...');
    
    const [laravelEvents] = await connection.execute(`
      SELECT id, name, date, time_i, time_f, local, description,
             units_id, is_active, created_at, updated_at
      FROM events 
      WHERE is_active = 1 
      ORDER BY id
      LIMIT 5
    `);

    console.log('Found events:', laravelEvents.length);

    // Get Units mapping for relations
    const units = await prisma.unit.findMany({
      select: { id: true, laravelId: true }
    });
    const unitMap = {};
    units.forEach(u => unitMap[u.laravelId.toString()] = u.id);

    for (const laravelEvent of laravelEvents) {
      try {
        // Mapping Laravel → Prisma
        const startTime = laravelEvent.time_i || '00:00:00';
        const endTime = laravelEvent.time_f || '23:59:59';
        
        const startDate = new Date(`${laravelEvent.date}T${startTime}`);
        const endDate = new Date(`${laravelEvent.date}T${endTime}`);
        
        // Clean HTML from description
        const cleanDescription = laravelEvent.description
          ?.replace(/<[^>]*>/g, '') // Remove HTML tags
          ?.replace(/&nbsp;/g, ' ') // Replace &nbsp;
          ?.trim() || '';

        const eventData = {
          title: laravelEvent.name,
          description: cleanDescription || null,
          startDate: startDate,
          endDate: endDate,
          location: laravelEvent.local,
          capacity: null, // Laravel number_invitations sempre NULL
          unitsId: laravelEvent.units_id ? unitMap[laravelEvent.units_id.toString()] : null,
          createdAt: laravelEvent.created_at
        };

        const newEvent = await prisma.event.create({
          data: eventData
        });
        
        console.log('SUCCESS:', laravelEvent.name, '- Unit:', laravelEvent.units_id, '→', eventData.unitsId?.slice(0,8));
        
      } catch (error) {
        console.log('FAILED:', laravelEvent.name, '-', error.message);
      }
    }

  } catch (error) {
    console.error('Import failed:', error);
  } finally {
    await connection.end();
    await prisma.$disconnect();
  }
}

importLaravelEvents();
