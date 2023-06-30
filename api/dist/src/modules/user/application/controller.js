"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.getMyProfile = async (req, res) => {
            try {
                const authenticatedUser = req.requester;
                const user = await this.userService.getUserById(authenticatedUser.id);
                if (!user) {
                    return res.status(404).json({
                        error: {
                            code: 404,
                            message: 'Not Found',
                            details: 'User not found',
                        },
                    });
                }
                res.status(200).json(user);
            }
            catch (err) {
                console.log('Unable to get profile:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to get profile',
                    },
                });
            }
        };
        this.createUser = async (req, res) => {
            try {
                const createdUser = await this.userService.createUser(req.body);
                res.status(201).json(createdUser);
            }
            catch (err) {
                console.log('Unable to create user:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to create user',
                    },
                });
            }
        };
        this.getUser = async (req, res) => {
            try {
                const { id } = req.params;
                const user = await this.userService.getUserById(id);
                res.status(200).json(user);
            }
            catch (err) {
                console.log('Unable to get user:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to get user',
                    },
                });
            }
        };
        this.updateUser = async (req, res) => {
            try {
                const { id } = req.params;
                const user = await this.userService.updateUser(id, req.body);
                res.status(200).json(user);
            }
            catch (err) {
                console.log('Unable to update user:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to update user',
                    },
                });
            }
        };
        this.deleteUser = async (req, res, next) => {
            try {
                const { id } = req.params;
                const user = await this.userService.deleteUser(id);
                res.status(200).json(user);
            }
            catch (err) {
                next(err);
            }
        };
        this.listUsers = async (req, res) => {
            try {
                const users = await this.userService.listUsers(req.query);
                res.status(200).json(users);
            }
            catch (err) {
                console.log('Unable to get users:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to get users',
                    },
                });
            }
        };
        this.createRole = async (req, res) => {
            try {
                const createdUser = await this.userService.createRole(req.body);
                res.status(201).json(createdUser);
            }
            catch (err) {
                console.log('Unable to create role:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to create role',
                    },
                });
            }
        };
        this.getRole = async (req, res) => {
            try {
                const { id } = req.params;
                const role = await this.userService.getRole(id);
                res.status(200).json(role);
            }
            catch (err) {
                console.log('Unable to get role:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to get role',
                    },
                });
            }
        };
        this.updateRole = async (req, res) => {
            try {
                const { id } = req.params;
                const role = await this.userService.updateRole(id, req.body);
                res.status(200).json(role);
            }
            catch (err) {
                console.log('Unable to update role:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to update role',
                    },
                });
            }
        };
        this.deleteRole = async (req, res, next) => {
            try {
                const { id } = req.params;
                const role = await this.userService.deleteRole(id);
                res.status(200).json(role);
            }
            catch (err) {
                next(err);
            }
        };
        this.listRoles = async (req, res) => {
            try {
                const roles = await this.userService.listRoles(req.query);
                res.status(200).json(roles);
            }
            catch (err) {
                console.log('Unable to get roles:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to get roles',
                    },
                });
            }
        };
        this.listPermissions = async (req, res) => {
            try {
                const permissions = await this.userService.listPermissions(req.query);
                res.status(200).json(permissions);
            }
            catch (err) {
                console.log('Unable to get permissions:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to get permissions',
                    },
                });
            }
        };
    }
}
exports.default = UserController;
