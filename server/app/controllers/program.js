import { Program } from "../models/Program.js";
import { ProgramProgress } from "../models/ProgramProgress.js";
import { generatePlannerItemsFromProgram } from "../utils/plannerUtils.js";

// ✅ Create a program
export const createProgram = async (req, res) => {
  try {
    const { name, goal, days } = req.body;

    const program = await Program.create({
      name,
      goal,
      trainer: req.userId,
      days
    });

    res.status(201).json({ success: true, program });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get all programs
export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find()
      .populate("trainer", "name profilePicture specialization")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, programs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get program by ID
export const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id)
      .populate("trainer", "name bio profilePicture specialization")
      .populate("days.workout")
      .populate("days.meal")
      .populate("days.snack")
      .populate("days.meditation");

    if (!program) return res.status(404).json({ message: "Program not found" });

    res.status(200).json({ success: true, program });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const enrollInProgram = async (req, res) => {
  try {
    const userId = req.userId;
    const programId = req.params.programId;
    const { startDate } = req.body;

    const exists = await ProgramProgress.findOne({ user: userId, program: programId });
    if (exists) return res.status(400).json({ message: "Already enrolled" });

    const program = await Program.findById(programId).populate("days.workout days.meal days.snack days.meditation");
    if (!program) return res.status(404).json({ message: "Program not found" });

    const start = startDate ? new Date(startDate) : new Date();

    const progress = await ProgramProgress.create({
      user: userId,
      program: program._id,
      completed: [],
      startDate: start,
    });

    const plannerItems = await generatePlannerItemsFromProgram(userId, program, start);
    await Planner.insertMany(plannerItems);

    res.status(201).json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ Get progress and auto-suggest next program
export const getUserProgramProgress = async (req, res) => {
  try {
    const { programId } = req.params;

    const progress = await ProgramProgress.findOne({
      user: req.userId,
      program: programId
    });

    if (!progress) return res.status(404).json({ success: false, message: "Progress not found" });

    const currentProgram = await Program.findById(programId);

    let recommendation = null;
    if (progress.completed.length >= currentProgram.days?.length * 4) {
      recommendation = await Program.findOne({
        _id: { $ne: programId },
        goal: currentProgram.goal
      }).sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      progress,
      recommendation
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Mark program item complete + auto-enroll if needed
export const markProgramItemComplete = async (req, res) => {
  try {
    const userId = req.userId;
    const { programId } = req.params;
    const { day, type } = req.body;

    const progress = await ProgramProgress.findOne({ user: userId, program: programId });
    if (!progress) return res.status(404).json({ message: "Progress not found" });

    const alreadyDone = progress.completed.find(c => c.day === day && c.type === type);
    if (alreadyDone) return res.status(400).json({ message: "Already marked complete" });

    progress.completed.push({ day, type, completedAt: new Date() });
    await progress.save();

    const program = await Program.findById(programId);
    const totalItems = program.days.length * 4;
    const completedItems = progress.completed.length;

    let autoEnrolled = null;
    let plannerItems = [];

    if (completedItems === totalItems) {
      const completedPrograms = await ProgramProgress.find({ user: userId }).distinct("program");
      const next = await Program.findOne({ _id: { $nin: completedPrograms } }).sort({ createdAt: -1 });

      if (next) {
        const newProgress = await ProgramProgress.create({
          user: userId,
          program: next._id,
          completed: [],
          startDate: new Date()
        });

        plannerItems = await generatePlannerItemsFromProgram(userId, next, new Date());
        autoEnrolled = next;
      }
    }

    res.status(200).json({ success: true, progress, autoEnrolled, plannerItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update program
export const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Program.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Program not found" });

    res.status(200).json({ success: true, program: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete program
export const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Program.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Program not found" });

    res.status(200).json({ success: true, message: "Program deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Manual next program recommendation endpoint
export const recommendNextProgram = async (req, res) => {
  try {
    const userId = req.userId;

    const completedProgress = await ProgramProgress.find({ user: userId })
      .populate("program")
      .sort({ updatedAt: -1 });

    const completedIds = completedProgress.map(p => p.program?._id.toString());

    const recommendation = await Program.findOne({
      _id: { $nin: completedIds }
    })
      .sort({ createdAt: -1 })
      .populate("trainer", "name profilePicture specialization");

    if (!recommendation) {
      return res.status(404).json({ success: false, message: "No new programs found." });
    }

    res.status(200).json({ success: true, recommendation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEnrolledClients = async (req, res) => {
  try {
    const { id: programId } = req.params;

    const enrolled = await ProgramProgress.find({ program: programId })
      .populate("user", "firstName lastName email profilePicture");

    const users = enrolled.map(entry => entry.user);

    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};