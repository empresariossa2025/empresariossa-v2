const { PrismaClient } = require('@prisma/client');
const mysql = require('mysql2/promise');

const prisma = new PrismaClient();

async function verifyEventsCorrespondence() {
  const connection = await mysql.createConnection({
    host: '195.35.43.10',
    port: 3306,
    user: 'root',
    password: 'Ibdm3p1dqdp0d1s1701@',
    database: 'empresariossa_api'
  });

  try {
    console.log('VERIFICA CORRISPONDENZA EVENTI LARAVEL ↔ PRISMA');
    
    // 1. Count Laravel events
    const [laravelCount] = await connection.execute(`
      SELECT COUNT(*) as count FROM events WHERE is_active = 1
    `);
    
    // 2. Count Prisma events
    const prismaCount = await prisma.event.count();
    
    console.log('\n=== COUNTS COMPARISON ===');
    console.log('Laravel VPS eventi attivi:', laravelCount[0].count);
    console.log('Prisma eventi dopo pulizia:', prismaCount);
    console.log('Differenza:', prismaCount - laravelCount[0].count);
    
    // 3. Get Laravel event titles
    const [laravelEvents] = await connection.execute(`
      SELECT id, name, date, time_i, local 
      FROM events 
      WHERE is_active = 1 
      ORDER BY name
    `);
    
    // 4. Get Prisma event titles  
    const prismaEvents = await prisma.event.findMany({
      select: { title: true, startDate: true, location: true },
      orderBy: { title: 'asc' }
    });
    
    console.log('\n=== TITLE CORRESPONDENCE CHECK ===');
    
    // Laravel titles
    const laravelTitles = laravelEvents.map(e => e.name.trim());
    const prismaTitles = prismaEvents.map(e => e.title.trim());
    
    // Find Laravel events missing in Prisma
    const missingInPrisma = laravelTitles.filter(title => 
      !prismaTitles.some(pTitle => pTitle.includes(title) || title.includes(pTitle))
    );
    
    // Find Prisma events not from Laravel  
    const extraInPrisma = prismaTitles.filter(title =>
      !laravelTitles.some(lTitle => title.includes(lTitle) || lTitle.includes(title))
    );
    
    console.log('Laravel eventi mancanti in Prisma:', missingInPrisma.length);
    if (missingInPrisma.length > 0) {
      console.log('Missing titles:');
      missingInPrisma.slice(0, 5).forEach(title => console.log('  -', title.slice(0, 50)));
    }
    
    console.log('\nPrisma eventi extra (non da Laravel):', extraInPrisma.length);
    if (extraInPrisma.length > 0) {
      console.log('Extra titles:');
      extraInPrisma.slice(0, 5).forEach(title => console.log('  -', title.slice(0, 50)));
    }
    
    // 5. Sample correspondence check
    console.log('\n=== SAMPLE CORRESPONDENCE ===');
    laravelEvents.slice(0, 5).forEach(lEvent => {
      const matchingPrisma = prismaEvents.find(pEvent => 
        pEvent.title.toLowerCase().includes(lEvent.name.toLowerCase().slice(0, 20))
      );
      
      console.log(`Laravel: "${lEvent.name.slice(0, 40)}"`);
      console.log(`Prisma:  "${matchingPrisma ? matchingPrisma.title.slice(0, 40) : 'NOT FOUND'}"`);
      console.log('---');
    });
    
    console.log('\n=== MIGRATION SUMMARY ===');
    const matchedEvents = laravelTitles.length - missingInPrisma.length;
    const migrationAccuracy = ((matchedEvents / laravelTitles.length) * 100).toFixed(1);
    
    console.log(`Eventi Laravel migrati con successo: ${matchedEvents}/${laravelTitles.length}`);
    console.log(`Accuratezza migrazione: ${migrationAccuracy}%`);
    console.log(`Eventi extra (pre-esistenti/test): ${extraInPrisma.length}`);
    
  } catch (error) {
    console.error('Errore verifica:', error);
  } finally {
    await connection.end();
    await prisma.$disconnect();
  }
}

verifyEventsCorrespondence();
