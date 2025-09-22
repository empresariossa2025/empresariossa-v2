const { PrismaClient } = require('@prisma/client');
const mysql = require('mysql2/promise');

const prisma = new PrismaClient();

async function importLaravelUsersComplete() {
  const connection = await mysql.createConnection({
    host: '195.35.43.10',
    port: 3306,
    user: 'root',
    password: 'Ibdm3p1dqdp0d1s1701@',
    database: 'empresariossa_api'
  });

  try {
    console.log('Starting CORRECTED Laravel import...');
    
    const [laravelUsers] = await connection.execute(`
      SELECT id, who, name, email, type, nickname, slug, status, 
             birth, cell_phone, avatar, logo, description, movie,
             companie_name, companie_cnpj, func_companie, 
             allows_contact, website, linkedIn, twitter,
             instagram, facebook, password, is_admin, is_active,
             created_at, updated_at
      FROM users 
      WHERE is_active = 1 
      ORDER BY id
      
    `);

    console.log('Found users:', laravelUsers.length);

    for (const laravelUser of laravelUsers) {
      try {
        // Split name 
        const nameParts = (laravelUser.name || '').split(' ');
        const firstName = nameParts[0] || 'User';
        const lastName = nameParts.slice(1).join(' ') || 'Laravel';
        
        const newUser = await prisma.user.create({
          data: {
            // REQUIRED FIELDS
            email: laravelUser.email,
            password: laravelUser.password,
            firstName: firstName,
            lastName: lastName,
            
            // ENUM FIELD  
            role: laravelUser.is_admin ? 'ADMIN' : 'USER',
            
            // EXISTING FIELDS ONLY
            isActive: laravelUser.is_active !== false,
            type: laravelUser.type || 'member',
            
            // LARAVEL FIELDS (safe)
            laravelId: laravelUser.id,
            who: laravelUser.who,
            nickname: laravelUser.nickname,
            userSlug: laravelUser.slug,
            userStatus: laravelUser.status || 0,
            birth: laravelUser.birth,
            cellPhone: laravelUser.cell_phone,
            avatar: laravelUser.avatar,
            logo: laravelUser.logo,
            movie: laravelUser.movie,
            companieName: laravelUser.companie_name,
            companieCnpj: laravelUser.companie_cnpj,
            funcCompanie: laravelUser.func_companie,
            allowsContact: laravelUser.allows_contact !== false,
            website: laravelUser.website,
            linkedIn: laravelUser.linkedIn,
            twitter: laravelUser.twitter,
            instagram: laravelUser.instagram,
            facebook: laravelUser.facebook
          }
        });
        
        console.log('SUCCESS:', laravelUser.email, '-', firstName, lastName);
        
      } catch (error) {
        console.log('FAILED:', laravelUser.email, '-', error.message);
      }
    }

  } catch (error) {
    console.error('Import failed:', error);
  } finally {
    await connection.end();
    await prisma.$disconnect();
  }
}

importLaravelUsersComplete();
