import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserRole, EventType, Priority, LifecycleBucket, AssetStatus, ContractStatus } from '@fleetops/shared';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create users
  const hashedPassword = await bcrypt.hash('password', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
    },
  });

  const viewerUser = await prisma.user.upsert({
    where: { email: 'viewer@example.com' },
    update: {},
    create: {
      email: 'viewer@example.com',
      password: hashedPassword,
      firstName: 'Viewer',
      lastName: 'User',
      role: UserRole.VIEWER,
    },
  });

  console.log('✅ Created users');

  // Create contracts
  const contract1 = await prisma.contract.create({
    data: {
      vendor: 'TechCorp Solutions',
      contractNumber: 'TC-2024-001',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      value: 150000,
      status: ContractStatus.ACTIVE,
      renewalNoticeMonths: 3,
    },
  });

  const contract2 = await prisma.contract.create({
    data: {
      vendor: 'SecureIT Services',
      contractNumber: 'SIT-2024-002',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2025-02-28'),
      value: 75000,
      status: ContractStatus.ACTIVE,
      renewalNoticeMonths: 6,
    },
  });

  console.log('✅ Created contracts');

  // Create lifecycle catalog entries
  const lifecycleEntries = [
    {
      vendor: 'Microsoft',
      product: 'Windows Server',
      version: '2019',
      releaseDate: new Date('2018-10-01'),
      endOfSupport: new Date('2029-01-09'),
      endOfLife: new Date('2029-01-09'),
      bucket: LifecycleBucket.ACTIVE,
    },
    {
      vendor: 'Red Hat',
      product: 'RHEL',
      version: '8',
      releaseDate: new Date('2019-05-07'),
      endOfSupport: new Date('2029-05-31'),
      endOfLife: new Date('2032-05-31'),
      bucket: LifecycleBucket.ACTIVE,
    },
    {
      vendor: 'Ubuntu',
      product: 'Ubuntu Server',
      version: '20.04 LTS',
      releaseDate: new Date('2020-04-23'),
      endOfSupport: new Date('2025-04-23'),
      endOfLife: new Date('2030-04-23'),
      bucket: LifecycleBucket.MATURE,
    },
  ];

  for (const entry of lifecycleEntries) {
    await prisma.lifecycleCatalogEntry.create({ data: entry });
  }

  console.log('✅ Created lifecycle catalog entries');

  // Create assets
  const asset1 = await prisma.asset.create({
    data: {
      name: 'Web Server 01',
      type: 'Server',
      model: 'Dell PowerEdge R740',
      serialNumber: 'DLL-WS01-2024',
      purchaseDate: new Date('2024-01-15'),
      warrantyExpiry: new Date('2027-01-15'),
      status: AssetStatus.ACTIVE,
      contractId: contract1.id,
      lifecycleBucket: LifecycleBucket.ACTIVE,
      riskScore: 15,
    },
  });

  const asset2 = await prisma.asset.create({
    data: {
      name: 'Database Server 01',
      type: 'Server',
      model: 'HP ProLiant DL380',
      serialNumber: 'HP-DB01-2024',
      purchaseDate: new Date('2024-02-01'),
      warrantyExpiry: new Date('2027-02-01'),
      status: AssetStatus.ACTIVE,
      contractId: contract2.id,
      lifecycleBucket: LifecycleBucket.ACTIVE,
      riskScore: 8,
    },
  });

  console.log('✅ Created assets');

  // Create vulnerabilities
  const vulnerability1 = await prisma.vulnerability.create({
    data: {
      cveId: 'CVE-2024-0001',
      title: 'Critical RCE in Web Framework',
      description: 'Remote code execution vulnerability in popular web framework',
      severity: 'CRITICAL',
      cvssScore: 9.8,
      publishedDate: new Date('2024-03-01'),
    },
  });

  const vulnerability2 = await prisma.vulnerability.create({
    data: {
      cveId: 'CVE-2024-0002',
      title: 'SQL Injection in Database Driver',
      description: 'SQL injection vulnerability affecting database connections',
      severity: 'HIGH',
      cvssScore: 8.1,
      publishedDate: new Date('2024-03-15'),
    },
  });

  console.log('✅ Created vulnerabilities');

  // Create vulnerability findings
  await prisma.vulnerabilityFinding.create({
    data: {
      vulnerabilityId: vulnerability1.id,
      assetId: asset1.id,
      status: 'OPEN',
      discoveredAt: new Date('2024-03-02'),
    },
  });

  await prisma.vulnerabilityFinding.create({
    data: {
      vulnerabilityId: vulnerability2.id,
      assetId: asset2.id,
      status: 'IN_PROGRESS',
      discoveredAt: new Date('2024-03-16'),
    },
  });

  console.log('✅ Created vulnerability findings');

  // Create calendar events
  const events = [
    {
      title: 'Web Server Maintenance',
      description: 'Scheduled maintenance for web server infrastructure',
      startDate: new Date('2024-04-15T09:00:00'),
      endDate: new Date('2024-04-15T17:00:00'),
      eventType: EventType.MAINTENANCE,
      priority: Priority.HIGH,
      assetId: asset1.id,
      lifecycleBucket: LifecycleBucket.ACTIVE,
    },
    {
      title: 'Contract Renewal Review',
      description: 'Review TechCorp contract for renewal',
      startDate: new Date('2024-10-01T10:00:00'),
      endDate: new Date('2024-10-01T11:00:00'),
      eventType: EventType.CONTRACT_RENEWAL,
      priority: Priority.MEDIUM,
      contractId: contract1.id,
      lifecycleBucket: LifecycleBucket.ACTIVE,
    },
    {
      title: 'Security Vulnerability Patch',
      description: 'Apply critical security patches',
      startDate: new Date('2024-04-01T02:00:00'),
      endDate: new Date('2024-04-01T04:00:00'),
      eventType: EventType.VULNERABILITY,
      priority: Priority.CRITICAL,
      assetId: asset1.id,
      lifecycleBucket: LifecycleBucket.ACTIVE,
    },
  ];

  for (const event of events) {
    await prisma.calendarEvent.create({ data: event });
  }

  console.log('✅ Created calendar events');

  // Create settings
  const settings = [
    {
      key: 'smtp_host',
      value: 'smtp.company.com',
      description: 'SMTP server hostname for email notifications',
      category: 'NOTIFICATIONS',
      isSecret: false,
    },
    {
      key: 'contract_renewal_notice_days',
      value: '90',
      description: 'Days before contract expiry to send renewal notice',
      category: 'GENERAL',
      isSecret: false,
    },
    {
      key: 'vulnerability_scan_frequency',
      value: 'daily',
      description: 'Frequency of vulnerability scans',
      category: 'GENERAL',
      isSecret: false,
    },
  ];

  for (const setting of settings) {
    await prisma.setting.create({ data: setting });
  }

  console.log('✅ Created settings');

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });