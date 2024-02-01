const asyncHandler = require("express-async-handler");
const contactModel = require("./../models/contact-model");

/** 
 * @desc get all contacts
 * @route GET  /api/contacts/
 * @access Private
 */
const getContacts = asyncHandler(async (req, res) => {
    const user_id = req.user.id;
    const data = await contactModel.find({user_id});
    res.json(data);
});


/** 
 * @desc get contacts by contactId
 * @route GET  /api/contacts/:id
 * @access Private
 */
const getContact = asyncHandler(async (req, res) => {
    const user_id = req.user.id;
    const contactResponse = await contactModel.findById(req.params.id);

    if(!contactResponse) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contactResponse.user_id.toString() !== user_id) {
        res.status(403);
        throw new Error("User dont have permission to read other user data");
    }
    
    res.json(contactResponse);
});

/** 
 * @desc update contacts by Id
 * @route PATCH  /api/contacts/:id
 * @access Private
 */
const patchContact = asyncHandler(async (req, res) => {
    const user_id = req.user.id;
    const {name, email, phone} = req.body;

    if(!name || !email || !phone) {
        res.status(401);
        throw new Error("All fields are mandatory");
    }

    const contact = await contactModel.findById(req.params.id);

    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== user_id) {
        res.status(403);
        throw new Error("User dont have permission to update other user data");
    }

    const contactResponse = await contactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )

    res.json(contactResponse);
});

/** 
 * @desc create new contact
 * @route POST  /api/contacts/
 * @access Private
 */
const postContact = asyncHandler(async (req, res) => {
    const user_id = req.user.id;
    const {name, email, phone} = req.body;

    if(!name || !email || !phone) {
        res.status(401);
        throw new Error("All fields are mandatory");
    }

    const contactResponse = await contactModel.create({user_id, name, email, phone});
    res.status(201).json(contactResponse);
});


/** 
 * @desc delete contacts by Id
 * @route DELETE  /api/contacts/:id
 * @access Private
 */
const deleteContact = asyncHandler(async (req, res) => {
    const user_id = req.user.id;
    const contact = await contactModel.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== user_id) {
        res.status(403);
        throw new Error("User dont have permission to delete other user data");
    }

    const contactResponse = await contactModel.deleteOne({_id: req.params.id});
    res.json(contact);
});

module.exports = { 
    getContacts, 
    getContact, 
    patchContact, 
    postContact, 
    deleteContact
};