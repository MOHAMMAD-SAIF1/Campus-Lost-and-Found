const express = require("express");

const router = express.Router();

const adminController =
require("../controllers/adminController");

router.get(
    "/admin",
    adminController.dashboard
);

router.get(
    "/admin/users",
    adminController.showUsers
);

router.get(
    "/admin/delete-user/:id",
    adminController.deleteUser
);

router.get(
    "/admin/role/:id/:role",
    adminController.changeRole
);

module.exports = router;