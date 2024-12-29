const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Cart = require("../models/cartModel");
const Product = require("../models/cartModel");

const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, mobile, password } = req.body;

    // Validate required fields
    if (!firstname || !lastname || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if email or phone already exists
    const emailExists = await User.findOne({ email });
    const mobileExists = await User.findOne({ mobile });
    if (emailExists || mobileExists) {
      return res
        .status(400)
        .json({ message: "Email or mobile number already exists." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user data to MongoDB
    const newUser = new User({
      firstname,
      lastname,
      email,
      mobile,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const updateData = {
      ...req.body,
      ...(req.body.password && {
        password: await bcrypt.hash(req.body.password, 10),
      }),
    };

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user to be deleted
    const userToDelete = await User.findById(id);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found." });
    }

    // Delete the user from the database
    await User.findByIdAndDelete(id);

    res.json({ message: "User and associated files deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};
const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
    res.json(users); // respond with users data
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error. Unable to fetch users." });
  }
};
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Find admin by email
    const admin = await User.findOne({ email });
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as an admin." });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = JWT.sign(
      { userId: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token valid for 1 day
    );

    // Set HTTP-only cookie
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure cookie in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Respond with success message
    res.status(200).json({
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Error during admin login:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email or password is incorrect",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Email or password is incorrect",
      });
    }

    const token = JWT.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email not found" });
    }

    const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${user._id}/${token}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #555;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #007bff; padding: 20px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 24px;">Reset Your Password</h1>
            </div>
            <div style="padding: 20px;">
              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                Hello,
              </p>
              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                You recently requested to reset your password. Click the button below to proceed:
              </p>
              <div style="text-align: center; margin: 20px 0;">
                <a href="${resetLink}" style="background-color: #007bff; color: white; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-size: 16px; font-weight: bold;">
                  Reset Password
                </a>
              </div>
              <p style="font-size: 14px; line-height: 1.6; color: #777;">
                If you did not request this, please ignore this email or contact support if you have questions.
              </p>
            </div>
            <div style="background-color: #f1f1f1; padding: 10px 20px; text-align: center; font-size: 12px; color: #999;">
              &copy; 2024 Your Company. All rights reserved.
            </div>
          </div>
        </div>
      `,
    });

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const resetPassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const { id, token } = req.params;

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({
      message: "New Password and Confirm Password are required",
    });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    if (decoded.userId !== id) {
      return res.status(400).json({ message: "Invalid token or ID mismatch" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const blockUser = async (req, res) => {
  const { id } = req.params;
  try {
    const blockedUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    if (!blockedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      message: "User blocked successfully",
      user: blockedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error blocking user" });
  }
};
// Middleware to unblock user
const unblockUser = async (req, res) => {
  const { id } = req.params;

  try {
    const unblockedUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    if (!unblockedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      message: "User unblocked successfully",
      user: unblockedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error unblocking user" });
  }
};
const saveAddress = async (req, res, next) => {
  const { id } = req.user; // Get user ID from the request
  const { address } = req.body; // Get address from the request body

  try {
    // Ensure address is provided
    if (!address) {
      return res.status(400).json({ message: "Address is required." });
    }

    // Update the user's address
    const updatedUser = await User.findByIdAndUpdate(
      id, // Filter by user ID
      { $set: { address } }, // Update the address field
      { new: true } // Return the updated document
    );

    // If the user was not found
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Respond with the updated user data
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error saving address:", error.message);
    res.status(500).json({
      message: "Failed to save address.",
      error: error.message,
    });
  }
};

const getWishlist = async (req, res) => {
  const { id } = req.user;
  try {
    const findUser = await User.findById(id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
};
// user cart functionality 7:50 start here
const userCart = async (req, res) => {
  const { cart } = req.body;
  const { id } = req.user;
  try {
    let products = [];
    const user = await User.findById(id);
    // check if user already have product in cart
    const alreadyExistCart = await Cart.findOne({ orderby: user.id });
    if (alreadyExistCart) {
      alreadyExistCart.remove();
    }
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      let getPrice = await Product.findById(cart[i]._id).select("price").exec();
      object.price = getPrice.price;
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      orderby: user?._id,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
};
const getUserCart = async (req, res) => {
  const { id } = req.user;

  try {
    // check later how to handle the error when there is no such
    const cart = await Cart.findOne({ orderby: id }).populate(
      "products.product"
    );
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
};
const emptyCart = async (req, res) => {
  const { _id } = req.user;
  ValidateDatabaseId(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndRemove({ orderby: user._id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
};
const applyCoupon = async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateDatabaseId(_id);
  const validCoupon = await Coupon.findOne({ name: coupon });
  if (validCoupon === null) {
    throw new Error("Invalid Coupon");
  }
  const user = await User.findOne({ _id });
  let { cartTotal } = await Cart.findOne({
    orderby: user._id,
  }).populate("products.product");
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await Cart.findOneAndUpdate(
    { orderby: user._id },
    { totalAfterDiscount },
    { new: true }
  );
  res.json(totalAfterDiscount);
};
const createOrder = async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;
  validateDatabaseId(_id);
  try {
    if (!COD) throw new Error("Create cash order failed");
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderby: user._id });
    let finalAmout = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmout = userCart.totalAfterDiscount;
    } else {
      finalAmout = userCart.cartTotal;
    }

    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmout,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "usd",
      },
      orderby: user._id,
      orderStatus: "Cash on Delivery",
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {
    throw new Error(error);
  }
};
const getOrders = async (req, res) => {
  const { _id } = req.user;
  validateDatabaseId(_id);
  try {
    const userorders = await Order.findOne({ orderby: _id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
};
const getAllOrders = async (req, res) => {
  try {
    const alluserorders = await Order.find()
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(alluserorders);
  } catch (error) {
    throw new Error(error);
  }
};
const getOrderByUserId = async (req, res) => {
  const { id } = req.params;
  validateDatabaseId(id);
  try {
    const userorders = await Order.findOne({ orderby: id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
};
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateDatabaseId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
};










module.exports = {
  createUser,
  getAllUser,
  deleteUser,
  updateUser,
  getUserById,
  loginUser,
  forgotPassword,
  resetPassword,
  loginAdmin,
};
