import mongoose from "mongoose";

export enum LeadStatus {
  NEW = "New",
  CONTACTED = "Contacted",
  QUALIFIED = "Qualified",
  LOST = "Lost"
}

export enum LeadSource {
  WEBSITE = "Website",
  INSTAGRAM = "Instagram",
  REFERRAL = "Referral"
}

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: Object.values(LeadStatus),
      default: LeadStatus.NEW
    },
    source: {
      type: String,
      enum: Object.values(LeadSource),
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Lead", leadSchema);