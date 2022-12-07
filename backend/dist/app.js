"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//import routes
const indexRoute_1 = __importDefault(require("./routes/indexRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const authorRoute_1 = __importDefault(require("./routes/authorRoute"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
//configure database
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(process.env.MONGO_URI).then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log(err);
});
const PORT = process.env.PORT || 5000;
//use middleware
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
//use routes
app.use('/', indexRoute_1.default);
app.use('/users', userRoute_1.default);
app.use('/authors', authorRoute_1.default);
app.use('/admins', adminRoute_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
