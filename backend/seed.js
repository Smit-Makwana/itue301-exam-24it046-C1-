require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Event = require('./models/Event');

const connectDB = require('./config/db');

const seedEvents = async () => {
  await connectDB();

  // Create or find organizer
  let organizer = await User.findOne({ email: 'organizer@eventhub.com' });
  if (!organizer) {
    organizer = await User.create({
      name: 'EventHub Organizer',
      email: 'organizer@eventhub.com',
      password: 'organizer123',
      role: 'organizer',
    });
    console.log('✅ Organizer created');
  } else {
    console.log('✅ Organizer already exists');
  }

  // Delete existing seeded events
  await Event.deleteMany({ organizer: organizer._id });
  console.log('🗑️  Cleared old seeded events');

  const events = [
    {
      title: 'CHARUSAT Tech Summit 2026',
      description:
        'Join the biggest tech conference at CHARUSAT! Industry leaders, live coding sessions, AI workshops, and networking opportunities. Featuring speakers from Google, Microsoft, and top Indian startups.',
      date: new Date('2026-11-15T10:00:00'),
      venue: 'CSPIT Auditorium, CHARUSAT Campus, Changa',
      totalSeats: 500,
      availableSeats: 500,
      price: 0,
      category: 'Tech',
      organizer: organizer._id,
    },
    {
      title: 'Groove Fusion — Music Night',
      description:
        'A spectacular evening of live music featuring indie bands, classical fusion, and electronic beats. Enjoy an unforgettable night under the stars with food stalls and art installations.',
      date: new Date('2026-11-22T18:00:00'),
      venue: 'Anand Open Stadium, Gujarat',
      totalSeats: 1200,
      availableSeats: 1200,
      price: 999,
      category: 'Music',
      organizer: organizer._id,
    },
    {
      title: 'Gujarat Startup Conclave 2026',
      description:
        'Connect with 200+ founders, investors, and mentors from across Gujarat. Pitch competitions, panel discussions, and exclusive 1:1 mentoring sessions. Best platform to launch your startup idea.',
      date: new Date('2026-12-05T09:00:00'),
      venue: 'Science City Convention Hall, Ahmedabad',
      totalSeats: 300,
      availableSeats: 300,
      price: 1499,
      category: 'Business',
      organizer: organizer._id,
    },
    {
      title: 'Abstract Art Exhibition',
      description:
        'Experience a stunning collection of contemporary and abstract art from 50+ artists across India. Interactive art installations, live painting sessions, and guided tours by the artists themselves.',
      date: new Date('2026-11-30T11:00:00'),
      venue: 'Amdavad Ni Gufa, Ahmedabad',
      totalSeats: 200,
      availableSeats: 200,
      price: 299,
      category: 'Art',
      organizer: organizer._id,
    },
    {
      title: 'IPL Watch Party — MI vs CSK',
      description:
        'Watch the epic MI vs CSK clash LIVE on a giant 40-foot screen! Unlimited snacks, drinks, themed merchandise, and exciting lucky draw prizes. Dress in your team colours!',
      date: new Date('2026-11-10T19:30:00'),
      venue: 'Sports Arena, Vadodara',
      totalSeats: 800,
      availableSeats: 800,
      price: 499,
      category: 'Sports',
      organizer: organizer._id,
    },
    {
      title: 'Food Fest — Flavours of India',
      description:
        'A gastronomic journey through India\'s diverse cuisines! 100+ food stalls, celebrity chef cook-offs, street food competitions, and cooking masterclasses. Bring your appetite!',
      date: new Date('2026-12-12T12:00:00'),
      venue: 'Riverfront Events Ground, Ahmedabad',
      totalSeats: 2000,
      availableSeats: 2000,
      price: 199,
      category: 'Food',
      organizer: organizer._id,
    },
    {
      title: 'React & Node.js Bootcamp',
      description:
        'Intensive 1-day hands-on bootcamp covering React 18, Node.js, Express, and MongoDB. Build a full-stack app from scratch with industry mentors. Certificate provided to all participants.',
      date: new Date('2026-11-08T09:00:00'),
      venue: 'DEPSTAR Lab, CHARUSAT Campus, Changa',
      totalSeats: 60,
      availableSeats: 12,
      price: 799,
      category: 'Tech',
      organizer: organizer._id,
    },
    {
      title: 'Dandiya Night 2026',
      description:
        'Celebrate the spirit of Navratri with a grand Dandiya night! Professional DJ, traditional garba, competitions with prizes, and traditional Gujarati food. Come in traditional attire!',
      date: new Date('2026-11-18T20:00:00'),
      venue: 'Town Hall Grounds, Anand',
      totalSeats: 1500,
      availableSeats: 1500,
      price: 350,
      category: 'Music',
      organizer: organizer._id,
    },
  ];

  const created = await Event.insertMany(events);
  console.log(`✅ Created ${created.length} events successfully!`);
  created.forEach((e) => console.log(`   📅 ${e.title} — ₹${e.price === 0 ? 'FREE' : e.price}`));

  await mongoose.connection.close();
  console.log('\n🎉 Seeding complete! Open http://localhost:5173/events to see them.');
  process.exit(0);
};

seedEvents().catch((err) => {
  console.error('Seed error:', err.message);
  process.exit(1);
});
