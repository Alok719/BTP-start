import express from "express";
// middlewares
import { isAuthenticated } from "./middlewares/auth-middlewares.js";
import { upload } from "./services/file-services.js";
// controllers
import * as miscCtrls from "./ctrls/misc-ctrls.js";
import * as fileCtrls from "./ctrls/file-ctrls.js";
import * as authCtrls from "./ctrls/auth-ctrls.js";
import * as userCtrls from "./ctrls/user-ctrls.js";
import * as orderCtrls from "./ctrls/order-ctrls.js";
import * as historyCtrls from "./ctrls/history-ctrls.js";

const Router = express.Router();

// misc routes
Router.get("/", miscCtrls.index);
// file routes
Router.post(
  "/file/upload",
  isAuthenticated,
  upload.array("files"),
  fileCtrls.uploadFiles
);
// Auth Routes
Router.post("/auth/token", isAuthenticated, authCtrls.token);
Router.post("/auth/otp-generate", authCtrls.otp_generate);
Router.post("/auth/otp-verify", authCtrls.otp_verify);
// User Routes
Router.get("/user/get", isAuthenticated, userCtrls.get_user);
Router.post("/user/new", isAuthenticated, userCtrls.new_user);
Router.patch("/user/edit", isAuthenticated, userCtrls.edit_user);
Router.delete("/user/delete", isAuthenticated, userCtrls.delete_user);
// History
Router.get("/history/get", isAuthenticated, historyCtrls.get_history);
Router.post("/history/new", isAuthenticated, historyCtrls.new_history);
Router.patch("/history/edit", isAuthenticated, historyCtrls.edit_history);
Router.delete("/history/delete", isAuthenticated, historyCtrls.delete_history);
// Order
Router.get("/order/get", isAuthenticated, orderCtrls.get_order);
Router.post("/order/new", isAuthenticated, orderCtrls.new_order);
Router.patch("/order/edit", isAuthenticated, orderCtrls.edit_order);
Router.delete("/order/delete", isAuthenticated, orderCtrls.delete_order);

export default Router;
