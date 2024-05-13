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
const bcrypt_1 = __importDefault(require("bcrypt"));
const userService_1 = __importDefault(require("@src/services/userService"));
class AuthController {
    constructor() {
        this.getUsersData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.session.user_id !== undefined) {
                    const user = yield this.userService.getUserById(req.session.user_id);
                    res.status(200).json(user);
                }
                else {
                    res.status(401).json({ message: "Unathorized" });
                }
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, first_name, surname, password } = req.body;
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newUser = yield this.userService.createUser({
                    email: email,
                    first_name: first_name,
                    surname: surname,
                    password: hashedPassword,
                });
                res.status(200).json({ message: "User was signed up successfuly" });
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
        this.signIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const existingUser = yield this.userService.getUserByEmail(email);
                if (!existingUser) {
                    res.status(400).json({ message: "Incorrect credentials" });
                }
                else {
                    const isMatching = yield bcrypt_1.default.compare(password, existingUser.password);
                    if (isMatching) {
                        req.session.regenerate(() => {
                            req.session.user_id = existingUser === null || existingUser === void 0 ? void 0 : existingUser.user_id;
                            req.session.save();
                            res.status(200).json({ message: "User logged in successfuly" });
                        });
                    }
                    else {
                        res.status(400).json({ message: "Incorrect credentials" });
                    }
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.signOut = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                req.session.user_id = null;
                req.session.save((err) => {
                    if (err) {
                        res.status(500).json({ error: "Internal Server Error" });
                    }
                    req.session.regenerate(function (err) {
                        if (err) {
                            res.status(500).json({ error: "Internal Server Error" });
                        }
                        res.status(200).json({ message: "Sign-out successful" });
                    });
                });
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
        this.verifyUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req.body;
                const verifiedUser = yield this.userService.verifyUser(user_id, true);
                res.status(200).json({ message: "User is verified" });
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
        this.userService = new userService_1.default();
    }
}
exports.default = AuthController;
