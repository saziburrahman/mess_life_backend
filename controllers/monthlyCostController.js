const calculateMonthlyCost = async (req, res) => {
  const { year, month } = req.query;

  try {
    // 1. Get total expenses for the month
    const startDate = new Date(year, month - 1, 1); // Start of the month
    const endDate = new Date(year, month, 0); // End of the month

    const totalExpenses = await Expense.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const expenses = totalExpenses[0]?.totalAmount || 0;

    // 2. Get total meals consumed (including guest meals)
    const totalMeals = await Attendance.aggregate([
      {
        $match: {
          attendanceDate: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          totalMeals: { $sum: { $add: ["$quantity", "$guestMeals"] } },
        },
      },
    ]);

    const meals = totalMeals[0]?.totalMeals || 0;

    if (meals === 0) {
      return res
        .status(400)
        .json({ message: "No meals recorded for the month." });
    }

    // 3. Calculate meal rate
    const mealRate = expenses / meals;

    // 4. Calculate individual costs
    const users = await User.find();

    const individualCosts = await Promise.all(
      users.map(async (user) => {
        const userMeals = await Attendance.aggregate([
          {
            $match: {
              userId: user._id,
              attendanceDate: { $gte: startDate, $lte: endDate },
            },
          },
          {
            $group: {
              _id: null,
              totalMeals: { $sum: { $add: ["$quantity", "$guestMeals"] } },
            },
          },
        ]);

        const mealsConsumed = userMeals[0]?.totalMeals || 0;
        const cost = mealsConsumed * mealRate;

        return {
          user: user.name,
          email: user.email,
          mealsConsumed,
          cost,
        };
      })
    );

    // 5. Return the result
    res.json({
      month: `${year}-${month}`,
      totalExpenses: expenses,
      totalMeals: meals,
      mealRate,
      individualCosts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { calculateMonthlyCost };
