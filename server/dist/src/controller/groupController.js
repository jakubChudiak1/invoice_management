"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groupService_1 = __importDefault(require("@src/services/groupService"));
class GroupController {
    constructor() {
        this.getGroups = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const groups = yield this.groupService.getGroups();
                res.status(200).json(groups);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
        this.getGroupById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { group_id } = req.params;
                const group = yield this.groupService.getGroupById(+group_id);
                res.status(200).json({ group });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.getGroupByName = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                const group = yield this.groupService.getGroupByName(name);
                res.status(200).json(group);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.createGroup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                const newGroup = yield this.groupService.createGroup(name);
                res.status(200).json({ message: "Group was successfuly!" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.updateGroup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                const { group_id } = req.params;
                const updatedGroup = yield this.groupService.updateGroup(+group_id, name);
                res.status(200).json({ message: "Group was successfuly updated" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.deleteGroup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { group_id } = req.params;
                const deletedGroup = yield this.groupService.deleteGroup(+group_id);
                res.status(200).json({ message: "Group was successfuly deleted!" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.groupService = new groupService_1.default();
    }
}
exports.default = GroupController;
