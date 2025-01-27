import User from '../models/User.js'; 
import connectDB from '../config/database.js'; 


async function migrateUsers() {
  await connectDB();

  const users = await User.find();
  for (let user of users) {
    // Example: Set default values for new fields
    if (!user.githubId) user.githubId = null; 
    if (!user.googleId) user.googleId = null; 
    
    // Save updated user
    await user.save();
    console.log(`Migrated user: ${user._id}`);
  }

  console.log("Migration complete!");
}

migrateUsers();
