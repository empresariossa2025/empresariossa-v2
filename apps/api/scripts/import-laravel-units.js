const { PrismaClient } = require('@prisma/client');
const mysql = require('mysql2/promise');

const prisma = new PrismaClient();

async function importLaravelUnits() {
  const connection = await mysql.createConnection({
    host: '195.35.43.10',
    port: 3306,
    user: 'root',
    password: 'Ibdm3p1dqdp0d1s1701@',
    database: 'empresariossa_api'
  });

  try {
    console.log('Importing Laravel Units...');
    
    const [laravelUnits] = await connection.execute(`
      SELECT id, type, name, responsible_name, responsible_cpf, responsible_email,
             responsible_cell_phone, companie_legal_name, companie_cnpj, 
             companie_taxation, companie_share_capital, companie_name, companie_cpf,
             address, number, complement, district, zip_code, countries_id, 
             states_id, cities_id, is_active, created_at, updated_at
      FROM units 
      WHERE is_active = 1
      ORDER BY id
    `);

    console.log('Found units:', laravelUnits.length);

    for (const laravelUnit of laravelUnits) {
      try {
        const newUnit = await prisma.unit.create({
          data: {
            laravelId: laravelUnit.id,
            type: laravelUnit.type,
            name: laravelUnit.name,
            responsibleName: laravelUnit.responsible_name,
            responsibleCpf: laravelUnit.responsible_cpf,
            responsibleEmail: laravelUnit.responsible_email,
            responsibleCellPhone: laravelUnit.responsible_cell_phone,
            companieLegalName: laravelUnit.companie_legal_name,
            companieCnpj: laravelUnit.companie_cnpj,
            companieTaxation: laravelUnit.companie_taxation,
            companieShareCapital: laravelUnit.companie_share_capital,
            companieName: laravelUnit.companie_name,
            companieCpf: laravelUnit.companie_cpf,
            address: laravelUnit.address,
            number: laravelUnit.number,
            complement: laravelUnit.complement,
            district: laravelUnit.district,
            zipCode: laravelUnit.zip_code,
            countriesId: laravelUnit.countries_id,
            statesId: laravelUnit.states_id,
            citiesId: laravelUnit.cities_id,
            isActive: laravelUnit.is_active === 1,
            createdAt: laravelUnit.created_at,
            updatedAt: laravelUnit.updated_at
          }
        });
        
        console.log('SUCCESS:', laravelUnit.name, '- Laravel ID:', laravelUnit.id, '- Prisma UUID:', newUnit.id);
        
      } catch (error) {
        console.log('FAILED:', laravelUnit.name, '-', error.message);
      }
    }

  } catch (error) {
    console.error('Import failed:', error);
  } finally {
    await connection.end();
    await prisma.$disconnect();
  }
}

importLaravelUnits();
