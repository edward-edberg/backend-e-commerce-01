const express = require("express");
const router = express("router");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");

// router.route("/getAllProducts").get(getAllProducts);
// router.route("/getSingleProduct").get(getSingleProduct);
// router
//   .route("/createProduct")
//   .post(authenticateUser, authorizePermissions("admin"), createProduct);

// router
//   .route("/updateProduct")
//   .patch(authenticateUser, authorizePermissions("admin"), updateProduct);

// router
//   .route("/deleteProduct")
//   .delete(authenticateUser, authorizePermissions("admin"), deleteProduct);
router
  .route("/")
  .post([authenticateUser, authorizePermissions("admin")], createProduct)
  .get(getAllProducts);

router
  .route("/uploadImage")
  .post([authenticateUser, authorizePermissions("admin")], uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch([authenticateUser, authorizePermissions("admin")], updateProduct)
  .delete([authenticateUser, authorizePermissions("admin")], deleteProduct);

module.exports = router;
