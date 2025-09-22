const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function removeDuplicateEvents() {
  try {
    console.log('PULIZIA DUPLICATI EVENTS - INIZIO');
    
    // Trova tutti gli eventi raggruppati per titolo
    const events = await prisma.event.findMany({
      select: { id: true, title: true, createdAt: true },
      orderBy: { title: 'asc' }
    });
    
    // Raggruppa per titolo
    const groupedByTitle = {};
    events.forEach(event => {
      if (!groupedByTitle[event.title]) {
        groupedByTitle[event.title] = [];
      }
      groupedByTitle[event.title].push(event);
    });
    
    let duplicatesRemoved = 0;
    let groupsProcessed = 0;
    
    // Per ogni gruppo di duplicati
    for (const [title, eventGroup] of Object.entries(groupedByTitle)) {
      if (eventGroup.length > 1) {
        groupsProcessed++;
        
        // Ordina per createdAt (più recente primo)
        eventGroup.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        // Mantieni il primo (più recente), rimuovi gli altri
        const toKeep = eventGroup[0];
        const toRemove = eventGroup.slice(1);
        
        console.log(`${groupsProcessed}/69 "${title.slice(0, 40)}"`);
        console.log(`  KEEP: ${toKeep.id.slice(0, 8)} (${toKeep.createdAt.toISOString().slice(0, 16)})`);
        
        for (const eventToRemove of toRemove) {
          await prisma.event.delete({
            where: { id: eventToRemove.id }
          });
          console.log(`  REMOVED: ${eventToRemove.id.slice(0, 8)}`);
          duplicatesRemoved++;
        }
      }
    }
    
    console.log(`\nPULIZIA COMPLETATA:`);
    console.log(`- Gruppi duplicati processati: ${groupsProcessed}`);
    console.log(`- Eventi duplicati rimossi: ${duplicatesRemoved}`);
    
    // Verifica finale
    const finalCount = await prisma.event.count();
    console.log(`- Eventi rimanenti: ${finalCount}`);
    
  } catch (error) {
    console.error('Errore pulizia:', error);
  } finally {
    await prisma.$disconnect();
  }
}

removeDuplicateEvents();
