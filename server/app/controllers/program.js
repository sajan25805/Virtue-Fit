import { Program } from "../models/Program.js";
import { ProgramProgress } from "../models/ProgramProgress.js";

// ✅ Create a program (Trainer only)
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
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all programs
export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find()
      .populate("trainer", "name profilePicture specialization")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, programs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get program by ID
export const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id)
      .populate("trainer", "name bio specialization profilePicture")
      .populate("days.workout days.meal days.snack days.meditation");

    if (!program) return res.status(404).json({ message: "Program not found" });

    res.status(200).json({ success: true, program });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Enroll in a program
export const enrollInProgram = async (req, res) => {
  try {
    const userId = req.userId;
    const programId = req.params.programId;

    const exists = await ProgramProgress.findOne({ user: userId, program: programId });
    if (exists) return res.status(400).json({ message: "Already enrolled" });

    const progress = await ProgramProgress.create({
      user: userId,
      program: programId,
      completed: []
    });

    res.status(201).json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Mark item as completed
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

    res.status(200).json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get progress of a user for a program
export const getUserProgramProgress = async (req, res) => {
  try {
    const { programId } = req.params;
    const progress = await ProgramProgress.findOne({
      user: req.userId,
      program: programId
    });

    if (!progress) return res.status(404).json({ success: false, message: "Progress not found" });

    res.status(200).json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update a program (Trainer only)
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

// ✅ Delete a program (Trainer only)
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
