# MIGRATION PLAN: Laravel VPS → Prisma PostgreSQL

## ENTITIES DA MIGRARE
1. **users** (226+ membri) → User + password hash
2. **points** + **rules_points** → MemberPoints + PointTransaction  
3. **events** → Event + EventAttendee
4. **meetings** → Meeting
5. **indications** → Recommendation
6. **businesses** → Business
7. **branches** + **units** → Organization structure

## CHALLENGES TECNICI
- Password migration (Laravel bcrypt → NestJS bcrypt)
- ID mapping (bigint → uuid conversion)
- Foreign key relationships
- File uploads/images
- Data integrity validation

## TIMELINE STIMATO
- Schema alignment: 1 giorno
- Migration script: 2 giorni  
- Testing & debugging: 2 giorni
- **TOTAL: 5 giorni**
