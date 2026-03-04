import express from "express"
const router= express.Router();
import {
  login,
  logout,
  onbording,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"

router.post("/signup", signup) 
router.post("/login",login)
router.post("/logout",logout)

router.post("/onbording", protectRoute, onbording);
router.patch("/profile", protectRoute, updateProfile);

router.get("/me", protectRoute, (req,res)=>{
    res.status(200).json({
        success: true,
        user: req.user
    })
})

export default router
