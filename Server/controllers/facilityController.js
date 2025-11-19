import Facility from "../models/Facility.js";

// @desc Get all facilities
// @route GET /api/facilities
// @access Public
export const getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find().sort({ name: 1 });
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch facilities" });
  }
};

// @desc Get a facility by ID
// @route GET /api/facilities/:id
// @access Public
export const getFacilityById = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) return res.status(404).json({ message: "Facility not found" });
    res.json(facility);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch facility" });
  }
};

// @desc Add a new facility
// @route POST /api/facilities
// @access Private/Admin
export const addFacility = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { name, address, phone, type, location } = req.body;
  try {
    const newFacility = await Facility.create({ name, address, phone, type, location });
    res.status(201).json(newFacility);
  } catch (error) {
    res.status(500).json({ message: "Failed to add facility" });
  }
};

// @desc Update a facility
// @route PUT /api/facilities/:id
// @access Private/Admin
export const updateFacility = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const updatedFacility = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFacility) return res.status(404).json({ message: "Facility not found" });
    res.json(updatedFacility);
  } catch (error) {
    res.status(500).json({ message: "Failed to update facility" });
  }
};

// @desc Delete a facility
// @route DELETE /api/facilities/:id
// @access Private/Admin
export const deleteFacility = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const deleted = await Facility.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Facility not found" });
    res.json({ message: "Facility deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete facility" });
  }
};
