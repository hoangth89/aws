const express = require("express");

const { v4: uuid } = require("uuid");

const {
    S3Client,
    PutObjectCommand
} = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
    region: "ap-southeast-2"
});

const multer = require("multer");

const pool = require("./db");

const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM users ORDER BY id"
        );

        res.json(result.rows);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: err.message
        });
    }
});

app.post("/users", async (req, res) => {

    const { name } = req.body;

    try {

        const result = await pool.query(
            "INSERT INTO users(name) VALUES($1) RETURNING *",
            [name]
        );

        res.json(result.rows[0]);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: err.message
        });

    }

});

const upload = multer({
    storage: multer.memoryStorage(),

    fileFilter: (req, file, cb) => {

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed."));
        }

    },

    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

app.get("/", (req, res) => {
	res.send("Hello Aws EC2");
});

app.post("/upload", upload.single("image"), async (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            message: "No file uploaded"
        });
    }

    try {
	const bucket = "nodejs-demo-khanh-20260805";
	const extension = req.file.originalname.split(".").pop();
	const key = `images/${uuid()}.${extension}`;
        const command = new PutObjectCommand({

            Bucket: "nodejs-demo-khanh-20260805",

            Key: key,

            Body: req.file.buffer,

            ContentType: req.file.mimetype

        });

        await s3Client.send(command);

	const url = `https://${bucket}.s3.ap-southeast-2.amazonaws.com/${key}`;

	res.json({
    		key,
    		url
	});
    } catch (err) {

       	console.error(err);

        res.status(500).json(err);

    }

});

app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000")
});
