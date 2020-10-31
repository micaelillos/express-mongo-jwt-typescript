"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var dotenv = __importStar(require("dotenv"));
dotenv.config();
// Create a new express application instance
var app = express();
// Routes
app.get('/', function (req, res) {
    res.send('Hello Yes!');
});
// Connect to DB
var url = (_a = process.env.DB_URL) !== null && _a !== void 0 ? _a : '';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function () {
    console.log('connected to db');
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
