import type { Request, Response } from "express";
import Lead from "../models/lead-model.js";

export const createLead = async (
  req: Request,
  res: Response
) => {
  const lead = await Lead.create(req.body);

  res.status(201).json({
    success: true,
    data: lead
  });
};

export const getLeads = async (
  req: Request,
  res: Response
) => {
  const {
    page = 1,
    limit = 10,
    status,
    source,
    search,
    sort = "latest"
  } = req.query;

  const query: any = {};

  if (status) {
    query.status = status;
  }

  if (source) {
    query.source = source;
  }

  if (search) {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i"
        }
      },
      {
        email: {
          $regex: search,
          $options: "i"
        }
      }
    ];
  }

  const sortOption =
    sort === "latest"
      ? { createdAt: -1 }
      : { createdAt: 1 };

  const leads = await Lead.find(query)
    .sort()
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  const total = await Lead.countDocuments(query);

  res.json({
    success: true,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
    total,
    data: leads
  });
};

export const getLead = async (
  req: Request,
  res: Response
) => {
  const lead = await Lead.findById(req.params.id);

  res.json({
    success: true,
    data: lead
  });
};

export const updateLead = async (
  req: Request,
  res: Response
) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true
    }
  );
  res.json({
    success: true,
    data: lead
  });
};

export const deleteLead = async (
  req: Request,
  res: Response
) => {
  await Lead.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Lead deleted"
  });
};