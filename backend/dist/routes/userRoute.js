"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/signup');
router.post('/verify/:signature');
router.post('/login');
router.get('/get-all-users');
router.get('/get-single-user/');
router.patch('/update-profile/');
exports.default = router;
