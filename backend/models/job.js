import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ['FullTime', 'PartTime', 'Internship', 'Contract', 'Remote'],
      default: 'FullTime',
    },
    salary: {
      from: {
        type: Number,
        required: true,
      },
      to: {
        type: Number,
        required: true,
      },
    },
    experience: {
      type: String,
      required: true,
      default: '0-1',
    },
    applicationDeadline: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const Job = mongoose.model('Job', jobSchema);

export default Job;
