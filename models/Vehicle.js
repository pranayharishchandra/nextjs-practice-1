import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema({
  name       : { type: String, required: true },
  type       : { type: String, required: true },
  price      : { type: Number, required: true },
  stock      : { type: Number, required: true },
  image      : { type: String, required: true },
  slug       : { type: String, required: true, unique: true },
  description: {
    engineCapacity: { type: Number },
    mileage       : { type: Number },
    fuelTank      : { type: Number },
  },
});

// Avoid redefining the model if it already exists
const Vehicle = mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);

export default Vehicle;
