import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateOneContact,
  updateStatus,
} from "../controllers/contactsControllers.js";
import {
  checkCreateContactData,
  checkUpdateContactData,
  checkUpdateStatus,
  checkContactId,
  checkOwner,
} from "../middlewares/contactMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";

const contactsRouter = express.Router();

contactsRouter.use(protect);

contactsRouter.use("/:id", checkContactId);

contactsRouter.use("/:id", checkOwner);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", checkCreateContactData, createContact);

contactsRouter.put("/:id", checkUpdateContactData, updateOneContact);

contactsRouter.patch("/:id/favorite", checkUpdateStatus, updateStatus);

export default contactsRouter;
