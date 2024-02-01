const express = require("express");
const router = express.Router();
const authHandler = require("./../middleware/auth-handler");

const { 
    getContacts, 
    getContact, 
    patchContact, 
    postContact, 
    deleteContact 
} = require("../controllers/contact-controller");

router.use(authHandler);
router.route("/").get(getContacts).post(postContact);
router.route("/:id").get(getContact).patch(patchContact).delete(deleteContact) 

module.exports = router;