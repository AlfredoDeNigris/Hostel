export const notFoundHandler = (req, res) => {
    res.status(404).send('Resource not found.');
};

export const errorHandler = (err, req, res, next) => {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Internal Server Error" });
};