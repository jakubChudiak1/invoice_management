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
const usersGroupService_1 = __importDefault(require("@src/services/usersGroupService"));
class UsersGroupController {
    constructor() {
        this.getUsersByGroupId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { group_id } = req.params;
                const usersGroup = yield this.usersGroupService.getUsersByGroupId(+group_id);
                res.status(200).json(usersGroup);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.addUserToGroup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req.body;
                const { group_id } = req.params;
                const newUserInGroup = yield this.usersGroupService.addUserToGroup(+user_id, +group_id);
                res.status(200).json({ message: "User was successfuly added to group" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.deleteUserFromGroup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { group_id } = req.params;
                const { user_id } = req.body;
                const deletedUser = yield this.usersGroupService.deleteUserFromGroup(user_id, +group_id);
                res.status(200).json({ message: "User was successfully deleted!" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.usersGroupService = new usersGroupService_1.default();
    }
}
exports.default = UsersGroupController;
