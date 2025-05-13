"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { Request as RequestType } from '../types';
const router = express_1.default.Router();
router.get('/', (_req, _res) => {
});
router.get('/generate_name', (_req, _res) => {
});
router.post('/:name', (_req, _res) => {
});
router.delete('/:name', (_req, _res) => {
});
router.get('/:name/requests', (_req, _res) => {
});
router.delete('/:name/requests', (_req, _res) => {
});
exports.default = router;
