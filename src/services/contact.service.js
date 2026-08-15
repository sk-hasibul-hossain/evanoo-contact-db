import Contact from "../models/contact.model.js";

export const getAllContactsService = async (query) => {
  const {
    search,
    page = 1,
    limit = 10,
    orderBy = "createdAt",
    order = "asc",
  } = query;

  const allowedSortFields = [
    "createdAt",
    "updatedAt",
    "fullName",
    "email",
    "subject",
  ];

  const sortField = allowedSortFields.includes(orderBy) ? orderBy : "createdAt";

  const pipeline = [];

  // Search
  if (search?.trim()) {
    const searchRegex = {
      $regex: search.trim(),
      $options: "i",
    };

    pipeline.push({
      $match: {
        $or: [
          { fullName: searchRegex },
          { email: searchRegex },
          { subject: searchRegex },
          { message: searchRegex },
          { phone: searchRegex },
        ],
      },
    });
  }

  pipeline.push(
    {
      $sort: {
        [sortField]: order === "asc" ? 1 : -1,
      },
    },
    {
      $skip: (Number(page) - 1) * Number(limit),
    },
    {
      $limit: Number(limit),
    },
  );

  const contacts = await Contact.aggregate(pipeline);

  // Total contacts
  const totalQuery = search?.trim()
    ? {
        $or: [
          { fullName: { $regex: search.trim(), $options: "i" } },
          { email: { $regex: search.trim(), $options: "i" } },
          { subject: { $regex: search.trim(), $options: "i" } },
          { message: { $regex: search.trim(), $options: "i" } },
          { phone: { $regex: search.trim(), $options: "i" } },
        ],
      }
    : {};

  const total = await Contact.countDocuments(totalQuery);

  return {
    data: contacts,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
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
