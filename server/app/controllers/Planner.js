import { Planner } from "../models/Planner.js";
import { Program } from "../models/Program.js";
import { generatePlannerItemsFromProgram } from "../utils/plannerUtils.js";


// ✅ Reschedule planner item (drag & drop support)
export const reschedulePlannerItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { newDate } = req.body;

    const planner = await Planner.findOneAndUpdate(
      { "plan._id": itemId },
      { $set: { "plan.$.date": new Date(newDate) } },
      { new: true }
    ).populate("plan.ref");

    if (!planner) return res.status(404).json({ success: false, message: "Planner item not found" });

    res.status(200).json({ success: true, message: "Rescheduled successfully", planner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPlanner = async (req, res) => {
  try {
    const plannerItems = await Planner.find({ user: req.userId })
      .populate({ path: "ref", strictPopulate: false })
      .sort({ date: 1 });

    const mapped = plannerItems.map((item) => ({
      ...item.toObject(),
      data: item.ref,
    }));

    res.status(200).json({ success: true, plan: mapped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const generatePlanner = async (req, res) => {
  try {
    const { programId } = req.params;
    const { startDate } = req.body;

    const program = await Program.findById(programId);
    if (!program) return res.status(404).json({ message: "Program not found" });

    await Planner.deleteMany({ user: req.userId, program: programId });

    const items = await generatePlannerItemsFromProgram(req.userId, program, new Date(startDate));

    res.status(200).json({ success: true, planner: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const markPlannerItemComplete = async (req, res) => {
  try {
    const { itemId } = req.params;
    const updated = await Planner.findByIdAndUpdate(itemId, { isCompleted: true }, { new: true });

    if (!updated) return res.status(404).json({ success: false, message: "Item not found" });

    res.status(200).json({ success: true, item: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updatePlannerItemDate = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { newDate } = req.body;

    const updated = await Planner.findByIdAndUpdate(itemId, { date: new Date(newDate) }, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Item not found" });

    res.status(200).json({ success: true, item: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
