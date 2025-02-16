import mongoose from 'mongoose';

// Define the schema for User
const userSchema = new mongoose.Schema(
  {
    githubId: {
      type: String,
      unique: true, // Unique GitHub ID
      sparse: true, // Allow null for non-GitHub users
    },
    googleId: {
      type: String,
      unique: true, // Unique Google ID
      sparse: true, // Allow null for non-Google users
    },
    username: {
      type: String,
      unique: true, // GitHub username, unique across the platform
      sparse: true, // Allow null for non-GitHub users
      trim: true,
    },
    name: {
      type: String, // Full name of the user
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    profileImage: {
      type: String, // Profile image URL
      default: '',
    },
    bio: {
      type: String, // Bio
      default: '',
    },
    location: {
      type: String, // Location
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'seller'],
      default: 'user', // Default to 'user', can be changed to 'seller'
    },
    vehiclesForSale: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle', // Referencing the Vehicle model
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);


// Optionally, you can add methods to add/remove vehicles from the seller's list
userSchema.methods.addVehicleForSale = async function (vehicleId) {
  if (this.role !== 'seller') {
    throw new Error('Only sellers can add vehicles for sale');
  }
  if (this.vehiclesForSale.includes(vehicleId)) {
    return; // Vehicle is already listed for sale, do nothing
  }
  this.vehiclesForSale.push(vehicleId);
  await this.save();
};

userSchema.methods.removeVehicleForSale = async function (vehicleId) {
  if (this.role !== 'seller') {
    throw new Error('Only sellers can remove vehicles from sale');
  }
  this.vehiclesForSale = this.vehiclesForSale.filter(id => id.toString() !== vehicleId.toString());
  await this.save();
};

// Model creation
const User = mongoose.models.Vehicle || mongoose.model('User', userSchema);
export default User;

/* Example Usage:

Adding a Vehicle for Sale (Seller Only):

> //? Example: Adding a vehicle to the seller's list of vehicles for sale
const user = await User.findById(userId); // Find the seller user by their ID
if (user.role === 'seller') {
  await user.addVehicleForSale(vehicleId); // Add vehicle to the seller's list
}

Removing a Vehicle from Sale (Seller Only):

> //? Example: Removing a vehicle from the seller's list of vehicles for sale
const user = await User.findById(userId); // Find the seller user by their ID
if (user.role === 'seller') {
  await user.removeVehicleForSale(vehicleId); // Remove vehicle from the seller's list
}

Fetching Seller's Vehicles:
When fetching a seller's data, you can populate the vehiclesForSale field to get the full details of the vehicles they are selling:

> //? Fetch seller with full vehicle details
const seller = await User.findById(userId)
  .populate('vehiclesForSale') // Populate vehiclesForSale with full vehicle data
  .exec();

console.log(seller.vehiclesForSale); // Array of vehicles the seller is selling
 */
