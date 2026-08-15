import Contact from "../models/contact.model.js";
import {
  getAllContactsService,
  deleteContactService,
} from "../services/contact.service.js";
export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      message: "Message submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getAllContactsController = async (req, res) => {
  try {
    const contacts = await getAllContactsService(req.query);

    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export const deleteContactController = async (req, res) => {
  try {
    const result = await deleteContactService(req.params.contactId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};
