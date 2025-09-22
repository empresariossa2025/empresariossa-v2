const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function identifyDuplicates() {
  try {
    console.log('ANALISI DUPLICATI COMPLETA');
    
    // Trova tutti gli eventi
    const events = await prisma.event.findMany({
      select: { id: true, title: true, createdAt: true, startDate: true },
      orderBy: { title: 'asc' }  // CORREZIONE: 'asc' invece di true
    });
    
    console.log('Totale eventi nel database:', events.length);
    
    // Raggruppa per titolo
    const groupedByTitle = {};
    events.forEach(event => {
      if (!groupedByTitle[event.title]) {
        groupedByTitle[event.title] = [];
      }
      groupedByTitle[event.title].push(event);
    });
    
    // Identifica duplicati
    const duplicates = Object.entries(groupedByTitle)
      .filter(([title, events]) => events.length > 1);
    
    console.log('Titoli duplicati trovati:', duplicates.length);
    
    const totalDuplicateEvents = duplicates.reduce((sum, [title, events]) => sum + events.length, 0);
    const eventsToRemove = duplicates.reduce((sum, [title, events]) => sum + (events.length - 1), 0);
    
    console.log('Totale eventi duplicati:', totalDuplicateEvents);
    console.log('Eventi da rimuovere:', eventsToRemove);
    console.log('Eventi che rimarranno dopo pulizia:', events.length - eventsToRemove);
    
    // Mostra primi 10 gruppi duplicati
    console.log('\nPrimi 10 gruppi di duplicati:');
    duplicates.slice(0, 10).forEach(([title, events], index) => {
      console.log(`\n${index + 1}. "${title.slice(0, 50)}"`);
      events.forEach(e => {
        console.log(`  - ID: ${e.id.slice(0, 8)} | Created: ${e.createdAt.toISOString().slice(0, 16)}`);
      });
    });
    
  } catch (error) {
    console.error('Errore analisi:', error);
  } finally {
    await prisma.$disconnect();
  }
}

identifyDuplicates();
