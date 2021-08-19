import { NextFunction, Request, Response, Router } from "express";

const router = Router();
router.get("/", (_: Request, res: Response, ___: NextFunction) =>
  res.json({ category: "category" })
);
export default router;
