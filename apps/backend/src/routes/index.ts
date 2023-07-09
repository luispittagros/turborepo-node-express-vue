import { Router } from "express";

import books from "./books";
import jobs from "./jobs";
import NotFound from "./not-found";

const router = Router();

router.use("/jobs", jobs);
router.use("/books", books);

router.use(NotFound);

export default router;
