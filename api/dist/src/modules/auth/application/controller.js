"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.login = async (req, res) => {
            const { email, password } = req.body;
            try {
                const authenticatedUser = await this.authService.authenticateUser(email, password);
                if (!authenticatedUser) {
                    return res.status(400).json({
                        error: {
                            code: 400,
                            message: 'Bad Request',
                            details: 'email or password is incorrect',
                        },
                    });
                }
                res.status(200).json(authenticatedUser);
            }
            catch (err) {
                console.log('Unable to login user:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Internal Server Error',
                        details: 'Unable to login user',
                    },
                });
            }
        };
    }
}
exports.default = AuthController;
