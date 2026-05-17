import type { Request, Response } from "express";
import Lead from "../models/lead-model.js";
import type { AuthRequest } from "../middlewares/auth-middleware.js";

export const createLead = async (
  req: AuthRequest,
  res: Response
) => {
  const user = req.user;
  const { name, email, status, source } = req.body;
  const lead = await Lead.create({
    name,
    email,
    status,
    source,
    assignedUser: user.id
  });

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
    page = "1",
    limit = "10",
    status,
    source,
    search,
    sort = "latest",
    startDate,
    endDate
  } = req.query;

  const query: any = {};

  if (status) query.status = status;
  if (source) query.source = source;

  if (search) {
    query.$text = { $search: String(search) };
  }

  if (startDate || endDate) {
    query.createdAt = {} as any;
    if (startDate) query.createdAt.$gte = new Date(String(startDate));
    if (endDate) query.createdAt.$lte = new Date(String(endDate));
  }

  const sortOption: any = sort === "latest" ? { createdAt: -1 } : { createdAt: 1 };

  const pageNum = Math.max(1, Number(page));
  const lim = Math.max(1, Math.min(100, Number(limit)));

  const total = await Lead.countDocuments(query);

  const leads = await Lead.find(query)
    .sort(sortOption as any)
    .skip((pageNum - 1) * lim)
    .limit(lim)
    .populate("assignedUser", "name email role");

  const pages = Math.ceil(total / lim);

  res.json({
    success: true,
    total,
    page: pageNum,
    pages,
    limit: lim,
    hasNextPage: pageNum < pages,
    hasPrevPage: pageNum > 1,
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
  req: AuthRequest,
  res: Response
) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    return res.status(404).json({ success: false, message: "Lead not found" });
  }

  // Sales users can only update assigned leads
  if (req.user.role !== "admin") {
    if (!lead.assignedUser || String(lead.assignedUser) !== String(req.user.id)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
  }

  Object.assign(lead, req.body);

  const updated = await lead.save();

  res.json({ success: true, data: updated });
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