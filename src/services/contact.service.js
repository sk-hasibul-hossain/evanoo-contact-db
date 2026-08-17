import Contact from "../models/contact.model.js";
import { generateFileName } from "../helper/contact.helper.js";

export const getAllContactsService = async (query) => {
  const {
    search,
    page = 1,
    limit = 10,
    orderBy = "createdAt",
    order = "asc",
  } = query;

  const currentPage = Math.max(1, Number(page) || 1);
  const pageLimit = Math.min(100, Math.max(1, Number(limit) || 10));

  const allowedSortFields = [
    "createdAt",
    "updatedAt",
    "fullName",
    "email",
    "subject",
  ];

  const sortField = allowedSortFields.includes(orderBy) ? orderBy : "createdAt";

  const sortOrder = order === "desc" ? -1 : 1;

  const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const searchText = search?.trim() ? escapeRegex(search.trim()) : null;

  const matchQuery = searchText
    ? {
        $or: [
          { fullName: { $regex: searchText, $options: "i" } },
          { email: { $regex: searchText, $options: "i" } },
          { subject: { $regex: searchText, $options: "i" } },
          { message: { $regex: searchText, $options: "i" } },
          { phone: { $regex: searchText, $options: "i" } },
        ],
      }
    : {};

  const pipeline = [
    ...(searchText ? [{ $match: matchQuery }] : []),
    {
      $sort: {
        [sortField]: sortOrder,
      },
    },
    {
      $skip: (currentPage - 1) * pageLimit,
    },
    {
      $limit: pageLimit,
    },
  ];

  const [contacts, total] = await Promise.all([
    Contact.aggregate(pipeline),
    Contact.countDocuments(matchQuery),
  ]);

  return {
    data: contacts,
    pagination: {
      page: currentPage,
      limit: pageLimit,
      total,
      totalPages: Math.ceil(total / pageLimit),
    },
  };
};

export const deleteContactService = async (contactId) => {
  const contact = await Contact.findById(contactId);

  if (!contact) {
    const error = new Error("Contact not found");
    error.statusCode = 404;
    throw error;
  }

  await Contact.findByIdAndDelete(contactId);

  return {
    message: "Contact deleted successfully",
  };
};

export const getExportContactsService = async (query) => {
  const { fromDate, toDate, format } = query;

  if (!fromDate || !toDate || !format) {
    const error = new Error(
      "Query params required fromDate=2026-06-30T18:30:00.000Z&toDate=2026-08-16T18:30:00.000Z&format=csv",
    );
    error.statusCode = 404;
    throw error;
  }

  const filter = {};

  if (fromDate || toDate) {
    filter.createdAt = {};

    if (fromDate) {
      const startDate = new Date(fromDate);

      if (Number.isNaN(startDate.getTime())) {
        throw new Error("Invalid fromDate");
      }

      filter.createdAt.$gte = startDate;
    }

    if (toDate) {
      const endDate = new Date(toDate);

      if (Number.isNaN(endDate.getTime())) {
        throw new Error("Invalid toDate");
      }

      filter.createdAt.$lte = endDate;
    }
  }

  const fileName = generateFileName({
    fromDate,
    toDate,
    format,
  });

  const contacts = await Contact.find(filter).sort({ createdAt: -1 }).lean();

  return {
    contacts,
    export: {
      fileName,
      format,
    },
  };
};
