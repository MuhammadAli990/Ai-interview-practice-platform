import mongoose from 'mongoose';

const InterviewSchema = new mongoose.Schema(
  {
    jsonMockResp: {
      type: String,
      required: true
    },
    jobPosition: {
      type: String,
      required: true
    },
    jobDescription: {
      type: String,
      required: true
    },
    jobExperience: {
      type: String,
      required: true
    },
    createdBy: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.models.Interview || mongoose.model('Interview', InterviewSchema);

export default Interview;
